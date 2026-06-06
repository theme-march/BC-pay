"use client";

import { PropsWithChildren } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";

export function Providers({ children }: PropsWithChildren) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
