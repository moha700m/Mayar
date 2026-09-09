import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLiveCompareById } from "@/lib/compare-live";
import { formatSar } from "@/data/products";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { result } = await getLiveCompareById(id);
  if (!result) return { title: "مقارنة غير موجودة | ترندكس" };
  return {
    title: `قارن ${result.titleAr} | ترندكس`,
    description: `${result.matchNote}. الأرخص: ${result.cheapest.label} ${formatSar(result.cheapest.price)}`,
  };
}

export default async function ComparePage({ params }: Props) {
  const { id } = await params;
  const { result, meta } = await getLiveCompareById(id);
  if (!result) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <Link
        href="/#products"
        className="mb-6 inline-flex text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--text)]"
      >
        → رجوع للبحث
      </Link>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)]">
          <Image
            src={result.image}
            alt={result.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="280px"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-[var(--ember-soft)]">
            مقارنة نفس المنتج · أسعار حية
          </p>
          <h1
            className="text-3xl font-extrabold text-[var(--text)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {result.titleAr}
          </h1>
          <p className="mt-2 text-[var(--muted)]">{result.matchNote}</p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            تحديث: {new Date(meta.fetchedAt).toLocaleString("ar-SA")} · دولار/
            ريال: {meta.fx.usdToSar.toFixed(3)} ({meta.fx.source === "live" ? "حي" : "احتياطي"})
          </p>

          <div className="mt-5 rounded-2xl border border-[rgba(198,242,85,0.4)] bg-[rgba(198,242,85,0.1)] px-4 py-3 font-bold text-[var(--lime)]">
            الأرخص: {result.cheapest.label} بـ {formatSar(result.cheapest.price)}
            {result.savingsVsHighest > 0
              ? ` — توفير ${formatSar(result.savingsVsHighest)} عن أعلى سعر`
              : ""}
          </div>

          <div className="mt-6 space-y-3">
            {result.rankedOffers.map((offer, index) => (
              <a
                key={offer.marketplace}
                href={`/go/${result.id}/${offer.marketplace}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-4 transition hover:-translate-y-0.5 ${
                  offer.isCheapest
                    ? "border-[rgba(198,242,85,0.55)] bg-[rgba(198,242,85,0.1)]"
                    : "border-[var(--line)] bg-[var(--surface)]"
                }`}
              >
                <div>
                  <p className="text-lg font-extrabold text-[var(--text)]">
                    #{index + 1} {offer.label}
                    {offer.isCheapest ? (
                      <span className="ms-2 rounded-full bg-[var(--lime)] px-2 py-0.5 text-xs text-[#132016]">
                        الأرخص
                      </span>
                    ) : null}
                    {offer.live ? (
                      <span className="ms-2 rounded-full bg-[var(--ember)] px-2 py-0.5 text-xs text-white">
                        حي
                      </span>
                    ) : null}
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    ادخل على نفس المنتج في {offer.label}
                    {offer.priceSource ? ` · مصدر: ${offer.priceSource}` : ""}
                  </p>
                </div>
                <div className="text-end">
                  <p className="text-2xl font-extrabold text-[var(--lime)]">
                    {formatSar(offer.price)}
                  </p>
                  <p className="text-sm font-semibold text-[var(--ember-soft)]">
                    فتح المنتج ←
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
