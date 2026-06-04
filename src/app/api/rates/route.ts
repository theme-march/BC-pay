import { NextResponse } from "next/server";

const BASE_CURRENCY = "USD";
const PAIRS = ["BDT", "INR", "LKR", "RUB", "EUR", "GBP"];

// Cache rates for 30 minutes
let cachedRates: Record<string, number> | null = null;
let cacheTime = 0;
const CACHE_TTL = 30 * 60 * 1000;

async function fetchLiveRates(): Promise<Record<string, number>> {
  const now = Date.now();
  if (cachedRates && now - cacheTime < CACHE_TTL) return cachedRates;

  try {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${BASE_CURRENCY}`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) throw new Error("rate fetch failed");
    const data = await res.json();
    const rates: Record<string, number> = {};
    // Build all pairs relative to USD
    for (const to of PAIRS) {
      rates[`USD_${to}`] = parseFloat((data.rates[to] ?? 1).toFixed(4));
    }
    // RUB-based cross rates (for backward compat)
    const rubRate: number = data.rates["RUB"] ?? 90;
    for (const to of ["BDT", "INR", "LKR", "EUR", "USD"]) {
      const toRate: number = data.rates[to] ?? 1;
      rates[`RUB_${to}`] = parseFloat((toRate / rubRate).toFixed(4));
    }
    // BDT-based cross rates
    const bdtRate: number = data.rates["BDT"] ?? 110;
    for (const to of ["INR", "LKR", "USD", "EUR", "RUB"]) {
      const toRate: number = data.rates[to] ?? 1;
      rates[`BDT_${to}`] = parseFloat((toRate / bdtRate).toFixed(6));
    }
    cachedRates = rates;
    cacheTime = now;
    return rates;
  } catch {
    // Fallback to hardcoded rates if API fails
    return {
      USD_BDT: 110.0, USD_INR: 83.5, USD_LKR: 320.0, USD_RUB: 90.0, USD_EUR: 0.92, USD_GBP: 0.79,
      RUB_BDT: 1.22, RUB_INR: 0.93, RUB_LKR: 3.56, RUB_EUR: 0.010, RUB_USD: 0.011,
      BDT_INR: 0.759, BDT_LKR: 2.909, BDT_USD: 0.0091, BDT_EUR: 0.0084, BDT_RUB: 0.818,
    };
  }
}

export async function GET() {
  const rates = await fetchLiveRates();
  return NextResponse.json(rates, {
    headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" }
  });
}
