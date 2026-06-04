import { notFound } from "next/navigation";
import { BenefitsSection } from "@/sections/BenefitsSection";
import { FaqSection } from "@/sections/FaqSection";
import { HeroSection } from "@/sections/HeroSection";
import { HowItWorks } from "@/sections/HowItWorks";
import { PopularCountries } from "@/sections/PopularCountries";
import { PromoSlider } from "@/sections/PromoSlider";
import { ServicesSection } from "@/sections/ServicesSection";
import { TransferMethodsSection } from "@/sections/TransferMethodsSection";
import { WalletPartners } from "@/sections/WalletPartners";
import { Footer } from "@/components/footer/Footer";

const locales = ["en", "bg", "sl", "in"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  return (
    <main>
      <HeroSection />
      {/* <PopularCountries />
      <PromoSlider />
      <BenefitsSection />
      <TransferMethodsSection />
      <HowItWorks />
      <WalletPartners />
      <ServicesSection />
      <FaqSection />
      <Footer /> */}
    </main>
  );
}
