import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findComparisonForProduct } from "@/data/comparisons";
import {
  discountPercent,
  externalBuyUrl,
  formatOrders,
  formatSar,
  getProductById,
  marketplaceLabels,
} from "@/data/products";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "منتج غير موجود | ترندكس" };
  return {
    title: `${product.titleAr} | ترندكس`,
    description: `${product.titleAr} — ${formatSar(product.price)} من ${marketplaceLabels[product.marketplace]}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const discount = discountPercent(product);
  const comparison = findComparisonForProduct(product);
  const matchedOffer = comparison?.rankedOffers.find(
    (offer) => offer.marketplace === product.marketplace,
  );
  const buyUrl =
    comparison && matchedOffer
      ? `/go/${comparison.id}/${matchedOffer.marketplace}`
      : externalBuyUrl(product);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <Link
        href="/#products"
        className="mb-6 inline-flex text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--text)]"
      >
        → رجوع للمنتجات
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold text-[var(--ember-soft)]">
            {marketplaceLabels[product.marketplace]}
            {product.badge ? ` · ${product.badge}` : ""}
          </p>
          <h1
            className="text-3xl font-extrabold leading-snug text-[var(--text)] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {product.titleAr}
          </h1>
          <p className="mt-3 text-[var(--muted)]">{product.title}</p>

          <div className="mt-8 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-3xl font-extrabold text-[var(--lime)]">
                {formatSar(product.price)}
              </p>
              {product.originalPrice > product.price ? (
                <p className="text-base text-[var(--muted)] line-through">
                  {formatSar(product.originalPrice)}
                </p>
              ) : null}
            </div>
            {discount > 0 ? (
              <span className="rounded-full bg-[var(--lime)] px-3 py-1 text-sm font-bold text-[#132016]">
                خصم {discount}%
              </span>
            ) : null}
          </div>

          <div className="mt-4 flex gap-6 text-sm text-[var(--muted)]">
            <span>★ {product.rating.toFixed(1)}</span>
            <span>{formatOrders(product.orders)} طلب</span>
          </div>

          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[var(--ember)] px-6 py-4 text-base font-bold text-white shadow-[0_10px_40px_var(--glow)] transition hover:bg-[var(--ember-soft)] sm:w-auto"
          >
            اشترِ نفس المنتج من {marketplaceLabels[product.marketplace]}
          </a>

          {comparison ? (
            <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-bold text-[var(--text)]">
                  قارن نفس المنتج في كل المواقع
                </p>
                <Link
                  href={`/compare/${comparison.id}`}
                  className="text-sm font-semibold text-[var(--ember-soft)]"
                >
                  التفاصيل
                </Link>
              </div>
              <p className="mb-3 text-sm text-[var(--lime)]">
                الأرخص: {comparison.cheapest.label} —{" "}
                {formatSar(comparison.cheapest.price)}
              </p>
              <ul className="space-y-2">
                {comparison.rankedOffers.slice(0, 4).map((offer) => (
                  <li key={offer.marketplace}>
                    <a
                      href={`/go/${comparison.id}/${offer.marketplace}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-[var(--line)] px-3 py-2 text-sm transition hover:border-[rgba(255,90,60,0.45)]"
                    >
                      <span className="font-semibold text-[var(--text)]">
                        {offer.label}
                        {offer.isCheapest ? " · الأرخص" : ""}
                      </span>
                      <span className="font-bold text-[var(--lime)]">
                        {formatSar(offer.price)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
