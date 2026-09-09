"use client";

import { useMemo, useState, useTransition } from "react";
import type { CategoryId, MarketplaceId, Product } from "@/data/products";
import { CategoryFilter } from "@/components/CategoryFilter";
import { MarketplaceFilter } from "@/components/MarketplaceFilter";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  initialProducts: Product[];
  source: "live" | "curated";
};

export function ProductExplorer({ initialProducts, source }: Props) {
  const [category, setCategory] = useState<CategoryId>("all");
  const [marketplace, setMarketplace] = useState<MarketplaceId>("all");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
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
        product.marketplace.includes(normalized)
      );
    });
  }, [category, initialProducts, marketplace, query]);

  return (
    <section id="products" className="scroll-mt-8 px-5 pb-16 pt-6 sm:px-8 sm:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 max-w-3xl">
          <p className="mb-2 text-sm font-semibold tracking-wide text-[var(--ember-soft)]">
            علي بابا · علي إكسبريس · أمازون · عروض فنون
          </p>
          <h1
            className="text-3xl font-extrabold text-[var(--text)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ادخل على المنتج مباشرة
          </h1>
          <p className="mt-3 text-[var(--muted)]">
            أسعار بالريال السعودي. اختر المنصة ثم افتح صفحة المنتج واشترِ فورًا.
            {source === "curated"
              ? " (عرض تجريبي جاهز)"
              : " (يشمل بيانات حية من علي إكسبريس)"}
          </p>
        </div>

        <div className="mb-4 space-y-3">
          <MarketplaceFilter
            active={marketplace}
            onChange={(id) => {
              startTransition(() => setMarketplace(id));
            }}
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CategoryFilter
              active={category}
              onChange={(id) => {
                startTransition(() => setCategory(id));
              }}
            />
            <label className="relative block w-full sm:max-w-xs">
              <span className="sr-only">بحث عن منتج</span>
              <input
                value={query}
                onChange={(event) => {
                  const value = event.target.value;
                  startTransition(() => setQuery(value));
                }}
                placeholder="ابحث عن منتج..."
                className="w-full rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[rgba(255,90,60,0.55)]"
              />
            </label>
          </div>
        </div>

        <p className="mb-5 text-sm text-[var(--muted)]">
          {isPending ? "جاري التصفية..." : `${filtered.length} منتج`}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center text-[var(--muted)]">
            لا توجد منتجات مطابقة. جرّب منصة أو فئة أخرى.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
