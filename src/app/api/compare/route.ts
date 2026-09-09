import { NextResponse } from "next/server";
import { getLiveComparisons } from "@/lib/compare-live";

export const revalidate = 1800;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const { results, meta } = await getLiveComparisons(q);

  return NextResponse.json({
    query: q,
    currency: "SAR",
    live: true,
    meta,
    count: results.length,
    results: results.map((result) => ({
      id: result.id,
      titleAr: result.titleAr,
      title: result.title,
      image: result.image,
      imageAlt: result.imageAlt,
      matchNote: result.matchNote,
      category: result.category,
      liveCount: result.liveCount,
      cheapest: {
        marketplace: result.cheapest.marketplace,
        label: result.cheapest.label,
        price: result.cheapest.price,
        live: Boolean(result.cheapest.live),
        priceSource: result.cheapest.priceSource ?? "curated",
        productUrl: `/go/${result.id}/${result.cheapest.marketplace}`,
      },
      offers: result.rankedOffers.map((offer) => ({
        marketplace: offer.marketplace,
        label: offer.label,
        price: offer.price,
        originalPrice: offer.originalPrice,
        isCheapest: offer.isCheapest,
        live: Boolean(offer.live),
        priceSource: offer.priceSource ?? "curated",
        fetchedAt: offer.fetchedAt,
        productUrl: `/go/${result.id}/${offer.marketplace}`,
      })),
      savingsVsHighest: result.savingsVsHighest,
    })),
  });
}
