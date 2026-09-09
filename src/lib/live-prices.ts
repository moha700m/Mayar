import { createHash } from "node:crypto";
import { createHmac } from "node:crypto";
import type { CompareGroup, MarketOffer } from "@/data/comparisons";
import { getUsdToSarRate, usdToSar, type FxQuote } from "@/lib/fx";

export type LivePriceSource =
  | "aliexpress"
  | "amazon"
  | "feed"
  | "fx"
  | "curated";

export type LiveOfferPatch = {
  compareId: string;
  marketplace: MarketOffer["marketplace"];
  price: number;
  originalPrice?: number;
  productUrl?: string;
  source: LivePriceSource;
  fetchedAt: string;
};

export type LivePriceMeta = {
  fetchedAt: string;
  fx: FxQuote;
  providers: {
    aliexpress: boolean;
    amazon: boolean;
    feed: boolean;
  };
  updatedOffers: number;
};

type AffiliateProduct = {
  product_id?: string | number;
  product_title?: string;
  product_main_image_url?: string;
  target_sale_price?: string | number;
  target_original_price?: string | number;
  promotion_link?: string;
  product_detail_url?: string;
};

function aeSign(params: Record<string, string>, appSecret: string): string {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join("");
  return createHash("md5")
    .update(`${appSecret}${sorted}${appSecret}`)
    .digest("hex")
    .toUpperCase();
}

function aeTimestamp(): string {
  return new Date()
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, "")
    .slice(0, 19);
}

async function fetchAliExpressByKeyword(
  keywords: string,
  fx: FxQuote,
): Promise<{ price: number; originalPrice: number; productUrl?: string } | null> {
  const appKey = process.env.ALIEXPRESS_APP_KEY?.trim();
  const appSecret = process.env.ALIEXPRESS_APP_SECRET?.trim();
  const trackingId = process.env.ALIEXPRESS_TRACKING_ID?.trim();
  if (!appKey || !appSecret || !trackingId) return null;

  const params: Record<string, string> = {
    method: "aliexpress.affiliate.product.query",
    app_key: appKey,
    timestamp: aeTimestamp(),
    format: "json",
    v: "2.0",
    sign_method: "md5",
    tracking_id: trackingId,
    keywords,
    page_no: "1",
    page_size: "5",
    target_currency: "USD",
    target_language: "EN",
    sort: "LAST_VOLUME_DESC",
  };
  params.sign = aeSign(params, appSecret);

  const response = await fetch("https://api-sg.aliexpress.com/sync", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
    next: { revalidate: 1800 },
  });
  if (!response.ok) return null;

  const json = (await response.json()) as {
    aliexpress_affiliate_product_query_response?: {
      resp_result?: {
        result?: {
          products?: { product?: AffiliateProduct[] | AffiliateProduct };
        };
      };
    };
  };

  const raw =
    json.aliexpress_affiliate_product_query_response?.resp_result?.result
      ?.products?.product;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const first = list[0];
  if (!first) return null;

  const priceUsd = Number(first.target_sale_price);
  if (!Number.isFinite(priceUsd) || priceUsd <= 0) return null;
  const originalUsd = Number(first.target_original_price);
  const productUrl =
    first.promotion_link?.trim() ||
    first.product_detail_url?.trim() ||
    undefined;

  return {
    price: usdToSar(priceUsd, fx.usdToSar),
    originalPrice:
      Number.isFinite(originalUsd) && originalUsd > priceUsd
        ? usdToSar(originalUsd, fx.usdToSar)
        : usdToSar(priceUsd, fx.usdToSar),
    productUrl,
  };
}

function amzSign(
  secretKey: string,
  dateStamp: string,
  region: string,
  service: string,
  stringToSign: string,
): string {
  const kDate = createHmac("sha256", `AWS4${secretKey}`)
    .update(dateStamp)
    .digest();
  const kRegion = createHmac("sha256", kDate).update(region).digest();
  const kService = createHmac("sha256", kRegion).update(service).digest();
  const kSigning = createHmac("sha256", kService)
    .update("aws4_request")
    .digest();
  return createHmac("sha256", kSigning).update(stringToSign).digest("hex");
}

async function fetchAmazonByKeyword(
  keywords: string,
): Promise<{ price: number; originalPrice: number; productUrl?: string } | null> {
  const accessKey = process.env.AMAZON_ACCESS_KEY?.trim();
  const secretKey = process.env.AMAZON_SECRET_KEY?.trim();
  const partnerTag = process.env.AMAZON_PARTNER_TAG?.trim();
  const host = process.env.AMAZON_HOST?.trim() || "webservices.amazon.sa";
  const region = process.env.AMAZON_REGION?.trim() || "eu-west-1";
  if (!accessKey || !secretKey || !partnerTag) return null;

  const service = "ProductAdvertisingAPI";
  const path = "/paapi5/searchitems";
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const payloadObj = {
    PartnerTag: partnerTag,
    PartnerType: "Associates",
    Keywords: keywords,
    SearchIndex: "All",
    ItemCount: 3,
    Resources: [
      "Images.Primary.Large",
      "ItemInfo.Title",
      "Offers.Listings.Price",
      "Offers.Listings.SavingBasis",
    ],
  };
  const payload = JSON.stringify(payloadObj);
  const payloadHash = createHash("sha256").update(payload).digest("hex");
  const canonicalHeaders = `content-encoding:amz-1.0\ncontent-type:application/json; charset=utf-8\nhost:${host}\nx-amz-date:${amzDate}\nx-amz-target:com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems\n`;
  const signedHeaders =
    "content-encoding;content-type;host;x-amz-date;x-amz-target";
  const canonicalRequest = [
    "POST",
    path,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    createHash("sha256").update(canonicalRequest).digest("hex"),
  ].join("\n");
  const signature = amzSign(secretKey, dateStamp, region, service, stringToSign);
  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(`https://${host}${path}`, {
    method: "POST",
    headers: {
      "content-encoding": "amz-1.0",
      "content-type": "application/json; charset=utf-8",
      host,
      "x-amz-date": amzDate,
      "x-amz-target":
        "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems",
      authorization,
    },
    body: payload,
    next: { revalidate: 1800 },
  });
  if (!response.ok) return null;

  const json = (await response.json()) as {
    SearchResult?: {
      Items?: Array<{
        DetailPageURL?: string;
        Offers?: {
          Listings?: Array<{
            Price?: { Amount?: number; Currency?: string };
            SavingBasis?: { Amount?: number };
          }>;
        };
      }>;
    };
  };

  const item = json.SearchResult?.Items?.[0];
  const listing = item?.Offers?.Listings?.[0];
  const amount = Number(listing?.Price?.Amount);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  const currency = listing?.Price?.Currency ?? "SAR";
  const price =
    currency === "SAR" ? Math.round(amount) : Math.round(amount * 3.75);
  const basis = Number(listing?.SavingBasis?.Amount);
  const originalPrice =
    Number.isFinite(basis) && basis > amount
      ? currency === "SAR"
        ? Math.round(basis)
        : Math.round(basis * 3.75)
      : price;

  return {
    price,
    originalPrice,
    productUrl: item?.DetailPageURL,
  };
}

type FeedPayload = {
  offers?: Array<{
    compareId: string;
    marketplace: MarketOffer["marketplace"];
    price: number;
    originalPrice?: number;
    productUrl?: string;
  }>;
};

async function fetchExternalFeed(): Promise<LiveOfferPatch[]> {
  const feedUrl = process.env.LIVE_PRICE_FEED_URL?.trim();
  if (!feedUrl) return [];
  const fetchedAt = new Date().toISOString();

  try {
    const response = await fetch(feedUrl, { next: { revalidate: 900 } });
    if (!response.ok) return [];
    const json = (await response.json()) as FeedPayload;
    return (json.offers ?? [])
      .filter(
        (offer) =>
          offer.compareId &&
          offer.marketplace &&
          Number.isFinite(offer.price) &&
          offer.price > 0,
      )
      .map((offer) => ({
        compareId: offer.compareId,
        marketplace: offer.marketplace,
        price: Math.round(offer.price),
        originalPrice: offer.originalPrice
          ? Math.round(offer.originalPrice)
          : Math.round(offer.price),
        productUrl: offer.productUrl,
        source: "feed" as const,
        fetchedAt,
      }));
  } catch {
    return [];
  }
}

function applyFxToOffer(
  compareId: string,
  offer: MarketOffer,
  fx: FxQuote,
  fetchedAt: string,
): LiveOfferPatch | null {
  if (!offer.basePriceUsd || offer.basePriceUsd <= 0) return null;
  return {
    compareId,
    marketplace: offer.marketplace,
    price: usdToSar(offer.basePriceUsd, fx.usdToSar),
    originalPrice: usdToSar(
      offer.baseOriginalUsd && offer.baseOriginalUsd > offer.basePriceUsd
        ? offer.baseOriginalUsd
        : offer.basePriceUsd,
      fx.usdToSar,
    ),
    source: fx.source === "live" ? "fx" : "curated",
    fetchedAt,
  };
}

export async function collectLivePricePatches(
  groups: CompareGroup[],
): Promise<{ patches: LiveOfferPatch[]; meta: LivePriceMeta }> {
  const fx = await getUsdToSarRate();
  const fetchedAt = new Date().toISOString();
  const patches: LiveOfferPatch[] = [];

  const providers = {
    aliexpress: Boolean(
      process.env.ALIEXPRESS_APP_KEY &&
        process.env.ALIEXPRESS_APP_SECRET &&
        process.env.ALIEXPRESS_TRACKING_ID,
    ),
    amazon: Boolean(
      process.env.AMAZON_ACCESS_KEY &&
        process.env.AMAZON_SECRET_KEY &&
        process.env.AMAZON_PARTNER_TAG,
    ),
    feed: Boolean(process.env.LIVE_PRICE_FEED_URL),
  };

  // 1) Always apply FX to offers that declare USD baselines
  //    (or infer USD from SAR for Alibaba/AliExpress).
  for (const group of groups) {
    for (const offer of group.offers) {
      const normalized =
        offer.basePriceUsd && offer.basePriceUsd > 0
          ? offer
          : offer.marketplace === "aliexpress" ||
              offer.marketplace === "alibaba"
            ? {
                ...offer,
                basePriceUsd: Number((offer.price / 3.75).toFixed(2)),
                baseOriginalUsd: Number(
                  (offer.originalPrice / 3.75).toFixed(2),
                ),
              }
            : offer;
      const fxPatch = applyFxToOffer(group.id, normalized, fx, fetchedAt);
      if (fxPatch) patches.push(fxPatch);
    }
  }

  // 2) External feed overrides (Noon / custom scrapers).
  const feedPatches = await fetchExternalFeed();
  patches.push(...feedPatches);

  // 3) AliExpress + Amazon keyword lookups (best-effort).
  await Promise.all(
    groups.map(async (group) => {
      const keyword = group.title;

      if (providers.aliexpress) {
        try {
          const live = await fetchAliExpressByKeyword(keyword, fx);
          if (live) {
            patches.push({
              compareId: group.id,
              marketplace: "aliexpress",
              price: live.price,
              originalPrice: live.originalPrice,
              productUrl: live.productUrl,
              source: "aliexpress",
              fetchedAt,
            });
          }
        } catch {
          // keep previous patch/curated
        }
      }

      if (providers.amazon) {
        try {
          const live = await fetchAmazonByKeyword(keyword);
          if (live) {
            patches.push({
              compareId: group.id,
              marketplace: "amazon",
              price: live.price,
              originalPrice: live.originalPrice,
              productUrl: live.productUrl,
              source: "amazon",
              fetchedAt,
            });
          }
        } catch {
          // keep previous patch/curated
        }
      }
    }),
  );

  // Later patches win for same compareId+marketplace.
  const dedup = new Map<string, LiveOfferPatch>();
  for (const patch of patches) {
    dedup.set(`${patch.compareId}:${patch.marketplace}`, patch);
  }
  const unique = [...dedup.values()];

  return {
    patches: unique,
    meta: {
      fetchedAt,
      fx,
      providers,
      updatedOffers: unique.length,
    },
  };
}

export function mergeLivePatches(
  groups: CompareGroup[],
  patches: LiveOfferPatch[],
): CompareGroup[] {
  const map = new Map(
    patches.map((patch) => [`${patch.compareId}:${patch.marketplace}`, patch]),
  );

  return groups.map((group) => ({
    ...group,
    offers: group.offers.map((offer) => {
      const patch = map.get(`${group.id}:${offer.marketplace}`);
      if (!patch) {
        return {
          ...offer,
          live: false,
          priceSource: "curated" as const,
        };
      }
      return {
        ...offer,
        price: patch.price,
        originalPrice: patch.originalPrice ?? offer.originalPrice,
        productUrl: patch.productUrl ?? offer.productUrl,
        live: patch.source !== "curated",
        priceSource: patch.source,
        fetchedAt: patch.fetchedAt,
      };
    }),
  }));
}
