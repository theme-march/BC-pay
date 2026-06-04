"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { Header } from "@/components/layout/Header";
import { TransferCalculator } from "@/components/calculator/TransferCalculator";
import { useLanguage } from "@/i18n/LanguageContext";
import { useThemeMode } from "@/theme/ThemeModeContext";
import { countries } from "@/mock/data";
import { Country } from "@/types";
import { useState } from "react";

export function HeroSection() {
  const { t } = useLanguage();
  const { mode } = useThemeMode();
  const [titleA, titleB] = t("heroTitle").split("\n");
  const isLight = mode === "light";
  const [heroCountry, setHeroCountry] = useState<Country>(
    countries.find((c) => c.id !== "russia") || countries[0],
  );
  const heroBackground =
    heroCountry?.heroImage ??
    (isLight
      ? "linear-gradient(180deg, rgba(64,165,235,.55), rgba(255,255,255,.08) 42%, rgba(12,13,17,.18)), linear-gradient(120deg, #50B8F4 0%, #E6F3FF 42%, #C58F52 70%, #2D241D 100%)"
      : "radial-gradient(circle at 75% 22%, #2c83ff 0%, #0f4ead 23%, #071425 52%, #05070c 100%)");

  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        position: "relative",
        overflow: "hidden",
        color: isLight ? "#FFFFFF" : "inherit",

        background: heroBackground,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <Box
        sx={{
          position: "absolute",
          right: { xs: "-45%", md: isLight ? "52%" : "14%" },
          top: { xs: 170, md: isLight ? 110 : 95 },
          width: { xs: 520, md: isLight ? 760 : 610 },
          height: { xs: 520, md: isLight ? 520 : 610 },
          borderRadius: isLight ? "0 0 48px 48px" : "50%",
          opacity: isLight ? 0.38 : 1,
        }}
      />
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          pt: { xs: 15, md: 30 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={6}
        >
          <Box sx={{ maxWidth: { xs: "100%", md: 680 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 44, sm: 62, lg: 72 },
                textTransform: "uppercase",
              }}
            >
              {titleA}
              <br />
              {titleB}
            </Typography>
            <Typography mt={4} fontSize={{ xs: 20, md: 24 }} fontWeight={800}>
              {t("heroSubtitle")}
            </Typography>
          </Box>
          <TransferCalculator onCountryChange={setHeroCountry} />
        </Stack>
      </Container>
    </Box>
  );
}
