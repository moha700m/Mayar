"use client";

import type { CategoryId } from "@/data/products";
import { categories } from "@/data/products";

type Props = {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
};

export function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const isActive = category.id === active;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-[var(--ember)] text-white shadow-[0_8px_24px_var(--glow)]"
                : "border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
