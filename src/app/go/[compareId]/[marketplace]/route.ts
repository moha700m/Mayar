import { NextResponse } from "next/server";
import { getLiveCompareById } from "@/lib/compare-live";

type Params = {
  params: Promise<{ compareId: string; marketplace: string }>;
};

export async function GET(request: Request, { params }: Params) {
  const { compareId, marketplace } = await params;
  const { result } = await getLiveCompareById(compareId);
  if (!result) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const offer = result.rankedOffers.find(
    (item) => item.marketplace === marketplace,
  );
  if (!offer) {
    return NextResponse.redirect(new URL(`/compare/${compareId}`, request.url));
  }

  return NextResponse.redirect(offer.productUrl, 307);
}
