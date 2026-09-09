import { NextResponse } from "next/server";
import type { CategoryId } from "@/data/products";
import { categories } from "@/data/products";
import { fetchTrendingProducts } from "@/lib/aliexpress";

export const revalidate = 3600;

function isCategory(value: string | null): value is CategoryId {
  return Boolean(value && categories.some((category) => category.id === value));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");
  const category: CategoryId = isCategory(categoryParam)
    ? categoryParam
    : "all";

  const { products, source } = await fetchTrendingProducts(category);

  return NextResponse.json({
    category,
    source,
    updatedAt: new Date().toISOString(),
    count: products.length,
    products,
  });
}
