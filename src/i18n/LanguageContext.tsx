"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type LanguageCode = "en" | "bg" | "in" | "sl";

export const languageOptions = [
  { code: "en" as const, country: "English", label: "English", short: "EN", flag: "uk" },
  { code: "bg" as const, country: "Bangladesh", label: "বাংলা", short: "BG", flag: "bangladesh" },
  { code: "in" as const, country: "India", label: "हिन्दी", short: "IN", flag: "india" },
  { code: "sl" as const, country: "Sri Lanka", label: "සිංහල", short: "SL", flag: "sri-lanka" }
];

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    heroTitle: "International\nTransfers",
    heroSubtitle: "Send money for zero fee at favorable exchange rate",
    transferCountry: "Destination country",
    sendAmount: "Amount sent",
    receiveAmount: "Amount receivable",
    transferMethod: "Mode of transfer",
    exchangeRate: "Exchange rate",
    fee: "Fee",
    total: "Total",
    sendCurrency: "Send currency",
    swapCurrencies: "Swap currencies",
    startTransfer: "Start transfer",
    license: "MultitransferBD — licensed payment service",
    countryModalTitle: "Destination country",
    methodModalTitle: "Mode of transfer",
    chooseDestination: "Choose where to send",
    countrySubtitle: "Please choose the destination country",
    methodSubtitle: "Please choose suitable mode of transfer",
    search: "Search",
    all: "All",
    bestRate: "Best rate",
    cashPickup: "Cash pickup",
    select: "Select",
    countryNotFound: "Country not found",
    methodNotFound: "Transfer method not found",
    limitMessage: "Allowed amount",
    stepOneTitle: "Step 1: Transfer details",
    stepTwoTitle: "Step 2: Recipient and sender",
    transferCreated: "Transfer created",
    checkBeforeNext: "Check the details before continuing",
    direction: "Direction",
    sending: "Sending",
    receiving: "Receiving",
    paymentMethod: "Payment method",
    card: "Card",
    next: "Next",
    back: "Back",
    confirmTransfer: "Confirm transfer",
    readyTitle: "Transfer request is ready",
    readyText: "The demo transfer has been created. In a real service, the user would continue to payment and SMS confirmation.",
    done: "Done",
    recipientCard: "Recipient card / account",
    senderPhone: "Sender phone",
    recipientLastName: "Recipient last name",
    recipientFirstName: "Recipient first name",
    senderLastName: "Sender last name",
    senderFirstName: "Sender first name",
    confirmData: "I confirm the recipient and sender details are correct",
    formError: "Fill all required fields on step 2 and confirm the data.",
    helperInfo: "Check the recipient bank. It helps choose the correct transfer method."
  },
  bg: {
    heroTitle: "আন্তর্জাতিক\nট্রান্সফার",
    heroSubtitle: "কমিশন ছাড়া সুবিধাজনক রেটে টাকা পাঠান",
    transferCountry: "ট্রান্সফারের দেশ",
    sendAmount: "পাঠানোর পরিমাণ",
    receiveAmount: "পাওয়ার পরিমাণ",
    transferMethod: "ট্রান্সফার পদ্ধতি",
    exchangeRate: "রূপান্তর হার",
    fee: "ফি",
    total: "মোট",
    sendCurrency: "পাঠানোর মুদ্রা",
    swapCurrencies: "মুদ্রা বদলান",
    startTransfer: "ট্রান্সফার শুরু করুন",
    license: "MultitransferBD — লাইসেন্সপ্রাপ্ত পেমেন্ট সেবা",
    countryModalTitle: "ট্রান্সফারের দেশ",
    methodModalTitle: "ট্রান্সফার পদ্ধতি",
    chooseDestination: "কোথায় পাঠাবেন নির্বাচন করুন",
    countrySubtitle: "গন্তব্য দেশ নির্বাচন করুন",
    methodSubtitle: "উপযুক্ত ট্রান্সফার পদ্ধতি নির্বাচন করুন",
    search: "সার্চ",
    all: "সব",
    bestRate: "সেরা রেট",
    cashPickup: "ক্যাশ পিকআপ",
    select: "নির্বাচন",
    countryNotFound: "দেশ পাওয়া যায়নি",
    methodNotFound: "পদ্ধতি পাওয়া যায়নি",
    limitMessage: "অনুমোদিত পরিমাণ",
    stepOneTitle: "ধাপ ১: ট্রান্সফার তথ্য",
    stepTwoTitle: "ধাপ ২: প্রাপক ও প্রেরক",
    transferCreated: "ট্রান্সফার তৈরি হয়েছে",
    checkBeforeNext: "চালিয়ে যাওয়ার আগে তথ্য যাচাই করুন",
    direction: "দিক",
    sending: "পাঠানো",
    receiving: "পাওয়া",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    card: "কার্ড",
    next: "পরবর্তী",
    back: "পেছনে",
    confirmTransfer: "ট্রান্সফার নিশ্চিত করুন",
    readyTitle: "ট্রান্সফার আবেদন প্রস্তুত",
    readyText: "ডেমো ট্রান্সফার তৈরি হয়েছে। বাস্তব সেবায় এখানে পেমেন্ট এবং এসএমএস নিশ্চিতকরণ হবে।",
    done: "সম্পন্ন",
    recipientCard: "প্রাপকের কার্ড / অ্যাকাউন্ট",
    senderPhone: "প্রেরকের ফোন",
    recipientLastName: "প্রাপকের পদবি",
    recipientFirstName: "প্রাপকের নাম",
    senderLastName: "প্রেরকের পদবি",
    senderFirstName: "প্রেরকের নাম",
    confirmData: "আমি প্রাপক ও প্রেরকের তথ্য সঠিক নিশ্চিত করছি",
    formError: "ধাপ ২-এর সব বাধ্যতামূলক ঘর পূরণ করুন এবং তথ্য নিশ্চিত করুন।",
    helperInfo: "প্রাপকের ব্যাংক যাচাই করুন, এতে সঠিক ট্রান্সফার পদ্ধতি বেছে নিতে সুবিধা হবে।"
  },
  in: {
    heroTitle: "अंतरराष्ट्रीय\nट्रांसफर",
    heroSubtitle: "बिना कमीशन बेहतर रेट पर पैसे भेजें",
    transferCountry: "ट्रांसफर देश",
    sendAmount: "भेजी जाने वाली राशि",
    receiveAmount: "प्राप्त राशि",
    transferMethod: "ट्रांसफर विधि",
    exchangeRate: "एक्सचेंज रेट",
    fee: "फीस",
    total: "कुल",
    sendCurrency: "भेजने की मुद्रा",
    swapCurrencies: "मुद्रा बदलें",
    startTransfer: "ट्रांसफर शुरू करें",
    license: "MultitransferBD — लाइसेंस प्राप्त भुगतान सेवा",
    countryModalTitle: "ट्रांसफर देश",
    methodModalTitle: "ट्रांसफर विधि",
    chooseDestination: "कहां भेजना है चुनें",
    countrySubtitle: "गंतव्य देश चुनें",
    methodSubtitle: "उपयुक्त ट्रांसफर विधि चुनें",
    search: "खोजें",
    all: "सभी",
    bestRate: "बेस्ट रेट",
    cashPickup: "कैश पिकअप",
    select: "चुनें",
    countryNotFound: "देश नहीं मिला",
    methodNotFound: "विधि नहीं मिली",
    limitMessage: "अनुमत राशि",
    stepOneTitle: "स्टेप 1: ट्रांसफर विवरण",
    stepTwoTitle: "स्टेप 2: प्राप्तकर्ता और भेजने वाला",
    transferCreated: "ट्रांसफर बनाया गया",
    checkBeforeNext: "आगे बढ़ने से पहले जानकारी जांचें",
    direction: "दिशा",
    sending: "भेजना",
    receiving: "प्राप्ति",
    paymentMethod: "भुगतान विधि",
    card: "कार्ड",
    next: "आगे",
    back: "वापस",
    confirmTransfer: "ट्रांसफर पुष्टि करें",
    readyTitle: "ट्रांसफर अनुरोध तैयार है",
    readyText: "डेमो ट्रांसफर बन गया है। वास्तविक सेवा में यहां भुगतान और SMS पुष्टि होगी।",
    done: "पूरा",
    recipientCard: "प्राप्तकर्ता कार्ड / खाता",
    senderPhone: "भेजने वाले का फोन",
    recipientLastName: "प्राप्तकर्ता उपनाम",
    recipientFirstName: "प्राप्तकर्ता नाम",
    senderLastName: "भेजने वाले का उपनाम",
    senderFirstName: "भेजने वाले का नाम",
    confirmData: "मैं प्राप्तकर्ता और भेजने वाले की जानकारी सही होने की पुष्टि करता हूं",
    formError: "स्टेप 2 के सभी जरूरी फ़ील्ड भरें और जानकारी पुष्टि करें।",
    helperInfo: "प्राप्तकर्ता बैंक जांचें, इससे सही ट्रांसफर विधि चुनने में मदद मिलेगी।"
  },
  sl: {
    heroTitle: "ජාත්‍යන්තර\nමුදල් යැවීම",
    heroSubtitle: "කොමිස් නැතිව හොඳ විනිමය අනුපාතයකින් මුදල් යවන්න",
    transferCountry: "යවන රට",
    sendAmount: "යවන මුදල",
    receiveAmount: "ලැබෙන මුදල",
    transferMethod: "යැවීමේ ක්‍රමය",
    exchangeRate: "විනිමය අනුපාතය",
    fee: "ගාස්තුව",
    total: "එකතුව",
    sendCurrency: "යවන මුදල් ඒකකය",
    swapCurrencies: "මුදල් ඒකක මාරු කරන්න",
    startTransfer: "යැවීම ආරම්භ කරන්න",
    license: "MultitransferBD — බලපත්‍රලාභී ගෙවීම් සේවාව",
    countryModalTitle: "යවන රට",
    methodModalTitle: "යැවීමේ ක්‍රමය",
    chooseDestination: "යැවිය යුතු ස්ථානය තෝරන්න",
    countrySubtitle: "ගමනාන්ත රට තෝරන්න",
    methodSubtitle: "සුදුසු යැවීමේ ක්‍රමය තෝරන්න",
    search: "සොයන්න",
    all: "සියල්ල",
    bestRate: "හොඳම අනුපාතය",
    cashPickup: "මුදල් ලබාගැනීම",
    select: "තෝරන්න",
    countryNotFound: "රට හමු නොවීය",
    methodNotFound: "ක්‍රමය හමු නොවීය",
    limitMessage: "අවසර ඇති මුදල",
    stepOneTitle: "පියවර 1: යැවීමේ විස්තර",
    stepTwoTitle: "පියවර 2: ලබන්නා සහ යවන්නා",
    transferCreated: "යැවීම සකස් විය",
    checkBeforeNext: "ඉදිරියට යාමට පෙර තොරතුරු පරීක්ෂා කරන්න",
    direction: "ගමනාන්තය",
    sending: "යවන මුදල",
    receiving: "ලැබෙන මුදල",
    paymentMethod: "ගෙවීම් ක්‍රමය",
    card: "කාඩ්පත",
    next: "ඊළඟ",
    back: "ආපසු",
    confirmTransfer: "යැවීම තහවුරු කරන්න",
    readyTitle: "යැවීමේ ඉල්ලීම සූදානම්",
    readyText: "ඩෙමෝ යැවීම සකස් කර ඇත. සැබෑ සේවාවේ මෙහිදී ගෙවීම සහ SMS තහවුරු කිරීම සිදු වේ.",
    done: "හරි",
    recipientCard: "ලබන්නාගේ කාඩ් / ගිණුම",
    senderPhone: "යවන්නාගේ දුරකථනය",
    recipientLastName: "ලබන්නාගේ වාසගම",
    recipientFirstName: "ලබන්නාගේ නම",
    senderLastName: "යවන්නාගේ වාසගම",
    senderFirstName: "යවන්නාගේ නම",
    confirmData: "ලබන්නා සහ යවන්නාගේ තොරතුරු නිවැරදි බව තහවුරු කරමි",
    formError: "පියවර 2 හි සියලුම අවශ්‍ය ක්ෂේත්‍ර පුරවා තොරතුරු තහවුරු කරන්න.",
    helperInfo: "ලබන්නාගේ බැංකුව පරීක්ෂා කරන්න, එය නිවැරදි ක්‍රමය තෝරාගැනීමට උපකාරී වේ."
  }
};

type LanguageContextValue = {
  language: LanguageCode;
  option: (typeof languageOptions)[number];
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
};

const validLanguages = languageOptions.map((item) => item.code);
const LanguageContext = createContext<LanguageContextValue | null>(null);

function languageFromPath(pathname: string): LanguageCode {
  const segment = pathname.split("/").filter(Boolean)[0] as LanguageCode | undefined;
  return segment && validLanguages.includes(segment) ? segment : "en";
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguageState] = useState<LanguageCode>(() => languageFromPath(pathname));

  useEffect(() => {
    setLanguageState(languageFromPath(pathname));
  }, [pathname]);

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    router.push(`/${nextLanguage}`);
  };

  const value = useMemo(
    () => ({
      language,
      option: languageOptions.find((item) => item.code === language) ?? languageOptions[0],
      setLanguage,
      t: (key: string) => translations[language][key] ?? translations.en[key] ?? key
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
