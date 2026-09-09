"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type {
  CategoryId,
  MarketplaceId,
  Product,
  TrendingSearch,
} from "@/data/products";
import type { CompareResult, RankedOffer } from "@/data/comparisons";
import { searchComparisons } from "@/data/comparisons";
import { CategoryFilter } from "@/components/CategoryFilter";
import { CompareCard } from "@/components/CompareCard";
import { MarketplaceFilter } from "@/components/MarketplaceFilter";
import { ProductCard } from "@/components/ProductCard";
import { TrendingSearches } from "@/components/TrendingSearches";

type LiveMeta = {
  fetchedAt: string;
  fx: { usdToSar: number; source: "live" | "fallback" };
  providers: { aliexpress: boolean; amazon: boolean; feed: boolean };
  updatedOffers: number;
};

type ApiOffer = {
  marketplace: RankedOffer["marketplace"];
  label: string;
  price: number;
  originalPrice: number;
  isCheapest: boolean;
  live: boolean;
  priceSource: RankedOffer["priceSource"];
  fetchedAt?: string;
  productUrl: string;
};

type ApiResult = {
  id: string;
  titleAr: string;
  title: string;
  image: string;
  imageAlt: string;
  matchNote: string;
  category: CompareResult["category"];
  liveCount: number;
  savingsVsHighest: number;
  offers: ApiOffer[];
};

type Props = {
  initialProducts: Product[];
  source: "live" | "curated";
};

function toCompareResult(item: ApiResult): CompareResult {
  const rankedOffers: RankedOffer[] = item.offers.map((offer) => ({
    marketplace: offer.marketplace,
    price: offer.price,
    originalPrice: offer.originalPrice,
    productUrl: offer.productUrl,
    seller: offer.label,
    inStock: true,
    live: offer.live,
    priceSource: offer.priceSource,
    fetchedAt: offer.fetchedAt,
    isCheapest: offer.isCheapest,
    label: offer.label,
  }));

  return {
    id: item.id,
    titleAr: item.titleAr,
    title: item.title,
    category: item.category,
    image: item.image,
    imageAlt: item.imageAlt,
    keywords: [],
    matchNote: item.matchNote,
    offers: rankedOffers,
    rankedOffers,
    cheapest: rankedOffers.find((offer) => offer.isCheapest) ?? rankedOffers[0],
    savingsVsHighest: item.savingsVsHighest,
    liveCount: item.liveCount,
  };
}

export function ProductExplorer({ initialProducts, source }: Props) {
  const [category, setCategory] = useState<CategoryId>("all");
  const [marketplace, setMarketplace] = useState<MarketplaceId>("all");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"compare" | "browse">("compare");
  const [isPending, startTransition] = useTransition();
  const [liveResults, setLiveResults] = useState<CompareResult[] | null>(null);
  const [liveMeta, setLiveMeta] = useState<LiveMeta | null>(null);
  const [liveError, setLiveError] = useState(false);
  const [loadingLive, setLoadingLive] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function loadLive() {
      setLoadingLive(true);
      setLiveError(false);
      try {
        const response = await fetch(
          `/api/compare?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("compare api failed");
        const json = (await response.json()) as {
          meta: LiveMeta;
          results: ApiResult[];
        };
        if (cancelled) return;
        setLiveResults(json.results.map(toCompareResult));
        setLiveMeta(json.meta);
      } catch {
        if (!cancelled) {
          setLiveError(true);
          setLiveResults(null);
        }
      } finally {
        if (!cancelled) setLoadingLive(false);
      }
    }

    void loadLive();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [query]);

  const fallbackComparisons = useMemo(() => {
    const results = searchComparisons(query);
    if (category === "all") return results;
    return results.filter((item) => item.category === category);
  }, [category, query]);

  const comparisons = useMemo(() => {
    const sourceResults = liveResults ?? fallbackComparisons;
    if (category === "all") return sourceResults;
    return sourceResults.filter((item) => item.category === category);
  }, [category, fallbackComparisons, liveResults]);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return initialProducts.filter((product) => {
      const categoryOk =
        category === "all" ? true : product.category === category;
      const marketOk =
        marketplace === "all" ? true : product.marketplace === marketplace;
      if (!categoryOk || !marketOk) return false;
      if (!normalized) return true;
      return (
        product.titleAr.includes(query.trim()) ||
        product.title.toLowerCase().includes(normalized) ||
        product.searchQuery.toLowerCase().includes(normalized)
      );
    });
  }, [category, initialProducts, marketplace, query]);

  function applySearch(search: TrendingSearch) {
    startTransition(() => {
      setQuery(search.query);
      setCategory("all");
      setMarketplace("all");
      setMode("compare");
    });
  }

  return (
    <section id="products" className="scroll-mt-8 px-5 pb-16 pt-6 sm:px-8 sm:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 max-w-3xl">
          <p className="mb-2 text-sm font-semibold tracking-wide text-[var(--ember-soft)]">
            أسعار حية · قارن في كل المواقع · نفس المنتج
          </p>
          <h1
            className="text-3xl font-extrabold text-[var(--text)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ابحث وقارن: وين الأرخص؟
          </h1>
          <p className="mt-3 text-[var(--muted)]">
            نحدّث الأسعار حسب الصرف الحي ومصادر المنصات عند توفر المفاتيح. الرابط
            يفتح نفس المنتج على المنصة.
            {source === "curated" ? "" : " (كتالوج علي إكسبريس متصل)"}
          </p>
          {liveMeta ? (
            <p className="mt-2 text-xs text-[var(--muted)]">
              آخر تحديث: {new Date(liveMeta.fetchedAt).toLocaleString("ar-SA")} ·
              USD/SAR {liveMeta.fx.usdToSar.toFixed(3)} (
              {liveMeta.fx.source === "live" ? "حي" : "احتياطي"}) · عروض محدّثة:{" "}
              {liveMeta.updatedOffers}
              {liveMeta.providers.aliexpress ? " · AliExpress API" : ""}
              {liveMeta.providers.amazon ? " · Amazon API" : ""}
              {liveMeta.providers.feed ? " · Feed" : ""}
            </p>
          ) : null}
          {liveError ? (
            <p className="mt-2 text-xs text-[var(--ember-soft)]">
              تعذر جلب الأسعار الحية مؤقتًا — عرض النسخة المحلية.
            </p>
          ) : null}
        </div>

        <TrendingSearches activeQuery={query} onSelect={applySearch} />

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => startTransition(() => setMode("compare"))}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "compare"
                ? "bg-[var(--ember)] text-white"
                : "border border-[var(--line)] text-[var(--muted)]"
            }`}
          >
            مقارنة الأسعار
          </button>
          <button
            type="button"
            onClick={() => startTransition(() => setMode("browse"))}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "browse"
                ? "bg-[var(--ember)] text-white"
                : "border border-[var(--line)] text-[var(--muted)]"
            }`}
          >
            تصفح المنتجات
          </button>
        </div>

        <div className="mb-4 space-y-3">
          {mode === "browse" ? (
            <MarketplaceFilter
              active={marketplace}
              onChange={(id) => {
                startTransition(() => setMarketplace(id));
              }}
            />
          ) : null}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CategoryFilter
              active={category}
              onChange={(id) => {
                startTransition(() => setCategory(id));
              }}
            />
            <label className="relative block w-full sm:max-w-xs">
              <span className="sr-only">بحث ومقارنة</span>
              <input
                value={query}
                onChange={(event) => {
                  const value = event.target.value;
                  startTransition(() => {
                    setQuery(value);
                    setMode("compare");
                  });
                }}
                placeholder="ابحث وقارن بأسعار حية..."
                className="w-full rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[rgba(255,90,60,0.55)]"
              />
            </label>
          </div>
        </div>

        <p className="mb-5 text-sm text-[var(--muted)]">
          {isPending || loadingLive
            ? "جاري تحديث الأسعار الحية..."
            : mode === "compare"
              ? `${comparisons.length} منتج للمقارنة`
              : `${filteredProducts.length} منتج`}
          {query.trim() ? ` · بحث: ${query.trim()}` : ""}
        </p>

        {mode === "compare" ? (
          comparisons.length === 0 ? (
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center text-[var(--muted)]">
              لا توجد مقارنة لهذا البحث. جرّب: سماعات، ساعة، مكنسة، عطر، تلفاز.
            </div>
          ) : (
            <div className="space-y-5">
              {comparisons.map((result, index) => (
                <CompareCard key={result.id} result={result} index={index} />
              ))}
            </div>
          )
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center text-[var(--muted)]">
            لا توجد منتجات مطابقة.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
