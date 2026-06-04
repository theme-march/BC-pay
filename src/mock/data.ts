import { Country, FaqItem, Rate, ServiceItem, TransferMethod } from "@/types";

export const countries: Country[] = [
  {
    id: "bangladesh",
    name: "Bangladesh",
    nativeName: "Bangladesh",
    flag: "BD",
    currency: "BDT",
    rateFromRub: 1.22,
    rateFromUsd: 110.0,
    rateFromBdt: 1.0,
    heroImage: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%), url('/img/bangladesh.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  {
    id: "india",
    name: "India",
    nativeName: "India",
    flag: "IN",
    currency: "INR",
    rateFromRub: 0.93,
    rateFromUsd: 83.5,
    rateFromBdt: 0.759,
    heroImage: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%), url('/img/india.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    nativeName: "Sri Lanka",
    flag: "LK",
    currency: "LKR",
    rateFromRub: 3.56,
    rateFromUsd: 320.0,
    rateFromBdt: 2.909,
    heroImage: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%), url('/img/srilanka.png')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
  ,
  {
    id: "pakistan",
    name: "Pakistan",
    nativeName: "Pakistan",
    flag: "PK",
    currency: "PKR",
    rateFromRub: 2.1,
    rateFromUsd: 280.0,
    rateFromBdt: 2.0,
    heroImage: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%), url('/img/pask.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
  ,
  {
    id: "russia",
    name: "Russia",
    nativeName: "Россия",
    flag: "RU",
    currency: "RUB",
    // When sending RUB to Russia the rate is 1:1 (receive RUB)
    rateFromRub: 1,
    // fallback values for other conversions if ever needed
    rateFromUsd: 75.0,
    rateFromBdt: 0.43,
    heroImage: "linear-gradient(135deg, #d32f2f 0%, #8b0000 60%, #2b2b2b 100%)"
  }
];

export const methods: TransferMethod[] = [
  { id: "bank", title: "Bank Transfer", subtitle: "Bank account / SWIFT", tag: "Best rate", min: 200, max: 180000, fee: 150, feePercent: 0 },
  { id: "wallet", title: "Mobile Wallet", subtitle: "bKash / UPI / LankaPay", tag: "Fast", min: 100, max: 120000, fee: 90, feePercent: 0 },
  { id: "cash", title: "Cash Pickup", subtitle: "Agent location", tag: "Fast", min: 200, max: 180000, fee: 150, feePercent: 0 },
  { id: "card", title: "To Card", subtitle: "Visa / Mastercard", tag: "Instant", min: 500, max: 100000, fee: 200, feePercent: 1.5 },
  { id: "phone", title: "By Phone Number", subtitle: "Mobile number transfer", tag: "Fast", min: 100, max: 50000, fee: 70, feePercent: 0 }
];

export const rates: Rate[] = [
  { from: "RUB", to: "BDT", value: 1.22 },
  { from: "RUB", to: "INR", value: 0.93 },
  { from: "RUB", to: "LKR", value: 3.56 },
  { from: "RUB", to: "PKR", value: 2.1 },
  { from: "USD", to: "BDT", value: 110.0 },
  { from: "USD", to: "INR", value: 83.5 },
  { from: "USD", to: "LKR", value: 320.0 },
  { from: "USD", to: "PKR", value: 280.0 },
  { from: "BDT", to: "INR", value: 0.759 },
  { from: "BDT", to: "LKR", value: 2.909 },
  { from: "EUR", to: "BDT", value: 119.5 },
  { from: "EUR", to: "INR", value: 90.8 },
];

export const faq: FaqItem[] = [
  { id: "fail", question: "Why can a transfer fail?", answer: "A transfer can fail because of incorrect recipient details, transfer limits, or temporary bank restrictions." },
  { id: "impossible", question: "When can a transfer be unavailable?", answer: "A transfer can be unavailable if the route, currency, or selected method is temporarily disabled." },
  { id: "tech", question: "What should I do if a technical error happens?", answer: "Check the transfer status and contact support. We will help verify the payment and retry the operation." },
  { id: "limits", question: "Are there transfer-method limits?", answer: "Yes. Each method has a minimum and maximum amount shown in the calculator." },
  { id: "client", question: "What are the client limits?", answer: "Per operation: 400,000 BDT. Per day: 800,000 BDT. Per month: 1,000,000 BDT." }
];

export const serviceItems: ServiceItem[] = [
  { id: "status", title: "Transfer status", description: "Track every step of your transfer and quickly see when the money is received.", icon: "OK", cta: "Check status" },
  { id: "offices", title: "Cash pickup offices", description: "Find accurate pickup office addresses in the destination country.", icon: "OFF", cta: "Find office", disabled: false },
  { id: "support", title: "Support", description: "Get fast help through chat whenever you need confidence in a transfer.", icon: "SUP", cta: "Message" }
];
