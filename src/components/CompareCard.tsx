import Image from "next/image";
import Link from "next/link";
import type { CompareResult } from "@/data/comparisons";
import { formatSar } from "@/data/products";

type Props = {
  result: CompareResult;
  index?: number;
};

export function CompareCard({ result, index = 0 }: Props) {
  return (
    <article
      className="product-enter overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]"
      style={{ animationDelay: `${Math.min(index, 6) * 45}ms` }}
    >
      <div className="grid gap-0 md:grid-cols-[220px_1fr]">
        <Link
          href={`/compare/${result.id}`}
          className="relative aspect-[4/3] md:aspect-auto md:min-h-[220px]"
        >
          <Image
            src={result.image}
            alt={result.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 220px"
            className="object-cover"
          />
        </Link>

        <div className="space-y-4 p-4 sm:p-5">
          <div>
            <p className="mb-1 text-xs font-semibold text-[var(--ember-soft)]">
              نفس المنتج · مقارنة حية عبر المواقع
              {result.liveCount > 0 ? ` · ${result.liveCount} أسعار مباشرة` : ""}
            </p>
            <Link href={`/compare/${result.id}`}>
              <h3
                className="text-lg font-extrabold text-[var(--text)] sm:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {result.titleAr}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-[var(--muted)]">{result.matchNote}</p>
          </div>

          <div className="rounded-xl border border-[rgba(198,242,85,0.35)] bg-[rgba(198,242,85,0.08)] px-3 py-2 text-sm font-bold text-[var(--lime)]">
            الأرخص الآن: {result.cheapest.label} —{" "}
            {formatSar(result.cheapest.price)}
            {result.cheapest.live ? " · حي" : ""}
            {result.savingsVsHighest > 0
              ? ` · توفير حتى ${formatSar(result.savingsVsHighest)}`
              : ""}
          </div>

          <ul className="space-y-2">
            {result.rankedOffers.map((offer) => (
              <li key={`${result.id}-${offer.marketplace}`}>
                <a
                  href={`/go/${result.id}/${offer.marketplace}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition hover:-translate-y-0.5 ${
                    offer.isCheapest
                      ? "border-[rgba(198,242,85,0.55)] bg-[rgba(198,242,85,0.1)]"
                      : "border-[var(--line)] bg-[var(--surface-2)] hover:border-[rgba(255,90,60,0.4)]"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[var(--text)]">
                      {offer.label}
                      {offer.isCheapest ? (
                        <span className="ms-2 rounded-full bg-[var(--lime)] px-2 py-0.5 text-[10px] font-extrabold text-[#132016]">
                          الأرخص
                        </span>
                      ) : null}
                      {offer.live ? (
                        <span className="ms-2 rounded-full bg-[var(--ember)] px-2 py-0.5 text-[10px] font-extrabold text-white">
                          حي
                        </span>
                      ) : null}
                    </p>
                    <p className="truncate text-xs text-[var(--muted)]">
                      {offer.seller ?? offer.label} · نفس المنتج
                      {offer.priceSource && offer.priceSource !== "curated"
                        ? ` · ${offer.priceSource}`
                        : ""}
                    </p>
                  </div>
                  <div className="shrink-0 text-end">
                    <p className="text-base font-extrabold text-[var(--lime)]">
                      {formatSar(offer.price)}
                    </p>
                    {offer.originalPrice > offer.price ? (
                      <p className="text-xs text-[var(--muted)] line-through">
                        {formatSar(offer.originalPrice)}
                      </p>
                    ) : null}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
