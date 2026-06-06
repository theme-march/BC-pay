import { notFound } from "next/navigation";
import { HeroSection } from "@/sections/HeroSection";

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
    </main>
  );
}
