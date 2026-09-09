import {
  compareGroups,
  searchComparisons,
  type CompareResult,
} from "@/data/comparisons";
import {
  collectLivePricePatches,
  mergeLivePatches,
  type LivePriceMeta,
} from "@/lib/live-prices";

export async function getLiveComparisons(
  query = "",
): Promise<{ results: CompareResult[]; meta: LivePriceMeta }> {
  const { patches, meta } = await collectLivePricePatches(compareGroups);
  const liveGroups = mergeLivePatches(compareGroups, patches);
  return {
    results: searchComparisons(query, liveGroups),
    meta,
  };
}

export async function getLiveCompareById(id: string) {
  const { results, meta } = await getLiveComparisons("");
  return {
    result: results.find((item) => item.id === id),
    meta,
  };
}
