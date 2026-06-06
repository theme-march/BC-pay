"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { TransferCalculator } from "@/components/calculator/TransferCalculator";
import { useLanguage } from "@/i18n/LanguageContext";
import { countries } from "@/mock/data";
import { Country } from "@/types";

const HOME_TRANSFER_STATE_KEY = "homeTransferState";

function getInitialHeroCountry() {
  return countries.find((c) => c.id !== "russia") || countries[0];
}

export function HeroSection() {
  const { t } = useLanguage();
  const [titleA, titleB] = t("heroTitle").split("\\n");
  const [heroCountry, setHeroCountry] = useState<Country>(getInitialHeroCountry);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(HOME_TRANSFER_STATE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      const restoredCountry = countries.find((item) => item.id === parsed?.countryId);

      if (restoredCountry) {
        setHeroCountry(restoredCountry);
      }
    } catch {
      // Ignore malformed session data and keep the default hero.
    }
  }, []);

  const heroImageLayer =
    heroCountry.heroImage.match(/url\(([^)]+)\)/)?.[0] ?? heroCountry.heroImage;

  const heroStyle = {
    "--hero-country-image": heroImageLayer,
    "--hero-country-position": heroCountry.backgroundPosition || "center center",
    "--hero-country-size": heroCountry.backgroundSize || "cover",
  } as CSSProperties;

  return (
    <section className="hero-section" style={heroStyle}>
      <Header />

      <div className="container hero-inner">
        <div className="hero-layout">
          <div className="hero-title-col">
            <div className="hero-copy-wrap">
              <h1 className="hero-title">
                {titleA}
                <br />
                {titleB}
              </h1>
              <p className="hero-subtitle">{t("heroSubtitle")}</p>
            </div>
          </div>
          <div className="hero-calculator">
            <TransferCalculator onCountryChange={setHeroCountry} />
          </div>
        </div>
      </div>
    </section>
  );
}
