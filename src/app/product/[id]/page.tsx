import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  const buyUrl = externalBuyUrl(product);

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
            اشترِ الآن من {marketplaceLabels[product.marketplace]}
          </a>
        </div>
      </div>
    </main>
  );
}
