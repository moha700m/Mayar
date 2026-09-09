"use client";

import type { TrendingSearch } from "@/data/products";
import { trendingSearches } from "@/data/products";

type Props = {
  activeQuery: string;
  onSelect: (search: TrendingSearch) => void;
};

export function TrendingSearches({ activeQuery, onSelect }: Props) {
  return (
    <section
      id="trending-searches"
      className="mb-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5"
    >
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-[var(--ember-soft)]">
            السوق السعودي الآن
          </p>
          <h2
            className="text-xl font-extrabold text-[var(--text)] sm:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            إيش يبحثون الآن؟
          </h2>
        </div>
        <p className="text-xs text-[var(--muted)]">اضغط للبحث فورًا</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {trendingSearches.map((search) => {
          const isActive = activeQuery.trim() === search.query;
          return (
            <button
              key={search.id}
              type="button"
              onClick={() => onSelect(search)}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-[var(--ember)] text-white shadow-[0_8px_24px_var(--glow)]"
                  : "border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)] hover:border-[rgba(255,90,60,0.45)]"
              }`}
            >
              <span>{search.label}</span>
              <span
                className={`text-[10px] font-bold ${
                  isActive ? "text-white/80" : "text-[var(--lime)]"
                }`}
              >
                {search.heat}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
