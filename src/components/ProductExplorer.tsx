"use client";

import { useMemo, useState, useTransition } from "react";
import type { CategoryId, Product } from "@/data/products";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  initialProducts: Product[];
  source: "live" | "curated";
};

export function ProductExplorer({ initialProducts, source }: Props) {
  const [category, setCategory] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return initialProducts.filter((product) => {
      const categoryOk =
        category === "all" ? true : product.category === category;
      if (!categoryOk) return false;
      if (!normalized) return true;
      return (
        product.titleAr.includes(query.trim()) ||
        product.title.toLowerCase().includes(normalized)
      );
    });
  }, [category, initialProducts, query]);

  return (
    <section id="products" className="scroll-mt-8 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-sm font-semibold tracking-wide text-[var(--ember-soft)]">
            الترند اليوم
          </p>
          <h2
            className="text-3xl font-extrabold text-[var(--text)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            منتجات تتصدر المبيعات
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            مجموعة محدّثة من المنتجات الرائجة على علي إكسبريس، مرتبة حسب حجم
            الطلبات.
            {source === "curated"
              ? " (عرض تجريبي جاهز — اربط مفاتيح Affiliate API للبيانات الحية)"
              : " (بيانات مباشرة من واجهة علي إكسبريس)"}
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

        <p className="mb-5 text-sm text-[var(--muted)]">
          {isPending ? "جاري التصفية..." : `${filtered.length} منتج`}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center text-[var(--muted)]">
            لا توجد منتجات مطابقة. جرّب فئة أخرى أو امسح البحث.
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
