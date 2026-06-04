export type CurrencyCode = "BDT" | "INR" | "LKR" | "PKR" | "USD" | "EUR" | "GBP" | "RUB";

export interface Country {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  currency: CurrencyCode;
  rateFromRub: number;
  rateFromUsd: number;
  rateFromBdt: number;
  heroImage: string;
  backgroundSize?: string;
  backgroundPosition?: string;
}

export interface TransferMethod {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  min: number;
  max: number;
  fee: number;
  feePercent?: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  cta?: string;
  disabled?: boolean;
}

export interface Rate {
  from: CurrencyCode;
  to: CurrencyCode;
  value: number;
}

export type SendCurrency = "RUB" | "USD" | "BDT" | "EUR";

export interface LiveRates {
  [pair: string]: number;
}
