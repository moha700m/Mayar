import { NextResponse } from "next/server";
import { getCompareGroup } from "@/data/comparisons";

type Params = {
  params: Promise<{ compareId: string; marketplace: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { compareId, marketplace } = await params;
  const group = getCompareGroup(compareId);
  if (!group) {
    return NextResponse.redirect(new URL("/", _request.url));
  }

  const offer = group.rankedOffers.find(
    (item) => item.marketplace === marketplace,
  );
  if (!offer) {
    return NextResponse.redirect(new URL(`/compare/${compareId}`, _request.url));
  }

  // Redirect to the matched product listing on that marketplace.
  return NextResponse.redirect(offer.productUrl, 307);
}
