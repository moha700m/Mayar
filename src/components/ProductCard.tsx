import Image from "next/image";
import {
  discountPercent,
  formatOrders,
  productUrl,
  type Product,
} from "@/data/products";

type Props = {
  product: Product;
  index: number;
};

export function ProductCard({ product, index }: Props) {
  const discount = discountPercent(product);
  const href = productUrl(product);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="product-enter group block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(255,90,60,0.45)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge ? (
          <span className="absolute end-3 top-3 rounded-full bg-[var(--ember)] px-2.5 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        ) : null}
        {discount > 0 ? (
          <span className="absolute start-3 top-3 rounded-full bg-[var(--lime)] px-2.5 py-1 text-xs font-bold text-[#132016]">
            خصم {discount}%
          </span>
        ) : null}
      </div>

      <div className="space-y-3 p-4">
        <h3
          className="line-clamp-2 min-h-[3.2rem] text-base font-bold leading-7 text-[var(--text)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.titleAr}
        </h3>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-extrabold text-[var(--lime)]">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice > product.price ? (
              <p className="text-sm text-[var(--muted)] line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            ) : null}
          </div>
          <div className="text-end text-xs text-[var(--muted)]">
            <p>★ {product.rating.toFixed(1)}</p>
            <p>{formatOrders(product.orders)} طلب</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ember-soft)] transition group-hover:gap-2">
          افتح على علي إكسبريس
          <span aria-hidden>←</span>
        </span>
      </div>
    </a>
  );
}
