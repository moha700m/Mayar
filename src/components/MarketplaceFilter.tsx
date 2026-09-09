"use client";

import type { MarketplaceId } from "@/data/products";
import { marketplaces } from "@/data/products";

type Props = {
  active: MarketplaceId;
  onChange: (id: MarketplaceId) => void;
};

export function MarketplaceFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {marketplaces.map((marketplace) => {
        const isActive = marketplace.id === active;
        return (
          <button
            key={marketplace.id}
            type="button"
            onClick={() => onChange(marketplace.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-[var(--lime)] text-[#102018]"
                : "border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {marketplace.label}
          </button>
        );
      })}
    </div>
  );
}
