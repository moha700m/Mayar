import { NextResponse } from "next/server";
import type { CategoryId, MarketplaceId } from "@/data/products";
import { categories, marketplaces } from "@/data/products";
import { fetchTrendingProducts } from "@/lib/aliexpress";

export const revalidate = 3600;

function isCategory(value: string | null): value is CategoryId {
  return Boolean(value && categories.some((category) => category.id === value));
}

function isMarketplace(value: string | null): value is MarketplaceId {
  return Boolean(
    value && marketplaces.some((marketplace) => marketplace.id === value),
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");
  const marketplaceParam = searchParams.get("marketplace");
  const category: CategoryId = isCategory(categoryParam)
    ? categoryParam
    : "all";
  const marketplace: MarketplaceId = isMarketplace(marketplaceParam)
    ? marketplaceParam
    : "all";

  const { products, source } = await fetchTrendingProducts({
    category,
    marketplace,
  });

  return NextResponse.json({
    category,
    marketplace,
    source,
    currency: "SAR",
    updatedAt: new Date().toISOString(),
    count: products.length,
    products,
  });
}
