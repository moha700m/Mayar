import { NextResponse } from "next/server";
import { getLiveComparisons } from "@/lib/compare-live";

export const revalidate = 1800;

/** Live price snapshot for monitoring / cron warm-up. */
export async function GET() {
  const { results, meta } = await getLiveComparisons("");
  return NextResponse.json({
    ok: true,
    currency: "SAR",
    meta,
    products: results.length,
    cheapestSamples: results.slice(0, 5).map((result) => ({
      id: result.id,
      titleAr: result.titleAr,
      cheapest: {
        label: result.cheapest.label,
        price: result.cheapest.price,
        source: result.cheapest.priceSource ?? "curated",
        live: Boolean(result.cheapest.live),
      },
      liveCount: result.liveCount,
    })),
  });
}
