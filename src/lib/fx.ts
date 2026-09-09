const FALLBACK_USD_TO_SAR = 3.75;

export type FxQuote = {
  usdToSar: number;
  source: "live" | "fallback";
  fetchedAt: string;
};

async function fetchFromOpenErApi(): Promise<number | null> {
  const response = await fetch("https://open.er-api.com/v6/latest/USD", {
    next: { revalidate: 3600 },
  });
  if (!response.ok) return null;
  const json = (await response.json()) as {
    result?: string;
    rates?: { SAR?: number };
  };
  const rate = Number(json.rates?.SAR);
  return Number.isFinite(rate) && rate > 0 ? rate : null;
}

async function fetchFromCurrencyApi(): Promise<number | null> {
  const response = await fetch(
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
    { next: { revalidate: 3600 } },
  );
  if (!response.ok) return null;
  const json = (await response.json()) as { usd?: { sar?: number } };
  const rate = Number(json.usd?.sar);
  return Number.isFinite(rate) && rate > 0 ? rate : null;
}

export async function getUsdToSarRate(): Promise<FxQuote> {
  const fetchedAt = new Date().toISOString();

  try {
    const rate =
      (await fetchFromOpenErApi()) ?? (await fetchFromCurrencyApi());
    if (!rate) throw new Error("No FX provider returned SAR");
    return { usdToSar: rate, source: "live", fetchedAt };
  } catch {
    return {
      usdToSar: FALLBACK_USD_TO_SAR,
      source: "fallback",
      fetchedAt,
    };
  }
}

export function usdToSar(amountUsd: number, rate: number): number {
  return Math.max(1, Math.round(amountUsd * rate));
}
