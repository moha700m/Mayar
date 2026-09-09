import { NextResponse } from "next/server";
import { searchComparisons } from "@/data/comparisons";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const results = searchComparisons(q);

  return NextResponse.json({
    query: q,
    currency: "SAR",
    count: results.length,
    results: results.map((result) => ({
      id: result.id,
      titleAr: result.titleAr,
      matchNote: result.matchNote,
      cheapest: {
        marketplace: result.cheapest.marketplace,
        label: result.cheapest.label,
        price: result.cheapest.price,
        productUrl: `/go/${result.id}/${result.cheapest.marketplace}`,
      },
      offers: result.rankedOffers.map((offer) => ({
        marketplace: offer.marketplace,
        label: offer.label,
        price: offer.price,
        originalPrice: offer.originalPrice,
        isCheapest: offer.isCheapest,
        productUrl: `/go/${result.id}/${offer.marketplace}`,
      })),
    })),
  });
}
