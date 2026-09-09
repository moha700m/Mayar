import { createHash } from "node:crypto";
import {
  buildProductUrl,
  getProducts,
  type CategoryId,
  type MarketplaceId,
  type Product,
  trendingProducts,
} from "@/data/products";

const USD_TO_SAR = 3.75;

type AffiliateProduct = {
  product_id?: string | number;
  product_title?: string;
  product_main_image_url?: string;
  target_sale_price?: string | number;
  target_original_price?: string | number;
  evaluate_rate?: string | number;
  volume?: string | number;
  promotion_link?: string;
  first_level_category_name?: string;
};

function signParams(
  params: Record<string, string>,
  appSecret: string,
): string {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join("");
  return createHash("md5")
    .update(`${appSecret}${sorted}${appSecret}`)
    .digest("hex")
    .toUpperCase();
}

function mapCategory(name?: string): Exclude<CategoryId, "all"> {
  const value = (name ?? "").toLowerCase();
  if (/(beauty|health|makeup)/.test(value)) return "beauty";
  if (/(apparel|fashion|shoe|bag|cloth)/.test(value)) return "fashion";
  if (/(sport|outdoor|fitness)/.test(value)) return "sports";
  if (/(auto|car|vehicle|motor)/.test(value)) return "auto";
  if (/(art|craft|decor)/.test(value)) return "arts";
  if (/(home|garden|kitchen|house)/.test(value)) return "home";
  return "gadgets";
}

function toSar(usd: number): number {
  return Math.round(usd * USD_TO_SAR);
}

function toProduct(item: AffiliateProduct, index: number): Product | null {
  const title = item.product_title?.trim();
  const image = item.product_main_image_url?.trim();
  const priceUsd = Number(item.target_sale_price);
  if (!title || !image || !Number.isFinite(priceUsd)) return null;

  const originalUsd = Number(item.target_original_price);
  const ratingRaw = Number(item.evaluate_rate);
  const orders = Number(item.volume);
  const price = toSar(priceUsd);
  const originalPrice =
    Number.isFinite(originalUsd) && originalUsd > priceUsd
      ? toSar(originalUsd)
      : price;

  return {
    id: String(item.product_id ?? `ae-${index}`),
    title,
    titleAr: title,
    category: mapCategory(item.first_level_category_name),
    marketplace: "aliexpress",
    price,
    originalPrice,
    currency: "SAR",
    rating: Number.isFinite(ratingRaw)
      ? ratingRaw > 5
        ? ratingRaw / 20
        : ratingRaw
      : 4.5,
    orders: Number.isFinite(orders) ? orders : 0,
    image,
    imageAlt: title,
    badge: index < 4 ? "ساخن" : undefined,
    searchQuery: title,
    productUrl:
      item.promotion_link?.trim() ||
      buildProductUrl("aliexpress", title),
  };
}

export async function fetchTrendingProducts(options?: {
  category?: CategoryId;
  marketplace?: MarketplaceId;
}): Promise<{ products: Product[]; source: "live" | "curated" }> {
  const category = options?.category ?? "all";
  const marketplace = options?.marketplace ?? "all";

  const appKey = process.env.ALIEXPRESS_APP_KEY?.trim();
  const appSecret = process.env.ALIEXPRESS_APP_SECRET?.trim();
  const trackingId = process.env.ALIEXPRESS_TRACKING_ID?.trim();

  if (
    !appKey ||
    !appSecret ||
    !trackingId ||
    (marketplace !== "all" && marketplace !== "aliexpress")
  ) {
    return {
      products: getProducts({ category, marketplace }),
      source: "curated",
    };
  }

  try {
    const timestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d{3}Z$/, "")
      .slice(0, 19);

    const params: Record<string, string> = {
      method: "aliexpress.affiliate.hotproduct.query",
      app_key: appKey,
      timestamp,
      format: "json",
      v: "2.0",
      sign_method: "md5",
      tracking_id: trackingId,
      page_no: "1",
      page_size: "50",
      target_currency: "USD",
      target_language: "EN",
      sort: "LAST_VOLUME_DESC",
    };
    params.sign = signParams(params, appSecret);

    const body = new URLSearchParams(params);
    const response = await fetch("https://api-sg.aliexpress.com/sync", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`AliExpress API HTTP ${response.status}`);
    }

    const json = (await response.json()) as {
      aliexpress_affiliate_hotproduct_query_response?: {
        resp_result?: {
          result?: {
            products?: { product?: AffiliateProduct[] | AffiliateProduct };
          };
        };
      };
    };

    const raw =
      json.aliexpress_affiliate_hotproduct_query_response?.resp_result?.result
        ?.products?.product;
    const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const mapped = list
      .map((item, index) => toProduct(item, index))
      .filter((item): item is Product => Boolean(item));

    if (mapped.length === 0) {
      return {
        products: getProducts({ category, marketplace }),
        source: "curated",
      };
    }

    const filtered =
      category === "all"
        ? mapped
        : mapped.filter((product) => product.category === category);

    const merged =
      marketplace === "aliexpress" || marketplace === "all"
        ? [
            ...filtered,
            ...getProducts({ category, marketplace }).filter(
              (item) => item.marketplace !== "aliexpress",
            ),
          ]
        : getProducts({ category, marketplace });

    return {
      products: merged.length > 0 ? merged : mapped,
      source: "live",
    };
  } catch {
    return {
      products: getProducts({ category, marketplace }),
      source: "curated",
    };
  }
}

export function curatedFallback(): Product[] {
  return trendingProducts;
}
