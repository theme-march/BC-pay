"use client";

import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { countries } from "@/mock/data";
import { SectionTitle } from "@/components/common/SectionTitle";
import { FlagBadge } from "@/components/common/FlagBadge";
import { useLanguage } from "@/i18n/LanguageContext";

const labels = {
  en: { title: "Popular countries", all: "All countries" },
  bg: { title: "জনপ্রিয় দেশ", all: "সব দেশ" },
  in: { title: "लोकप्रिय देश", all: "सभी देश" },
  sl: { title: "ජනප්‍රිය රටවල්", all: "සියලු රටවල්" }
};

export function PopularCountries() {
  const { language } = useLanguage();
  const text = labels[language];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <SectionTitle>{text.title}</SectionTitle>
        <Button sx={{ bgcolor: "#232428", color: "white", px: 3, display: { xs: "none", md: "inline-flex" } }}>{text.all}</Button>
      </Stack>
      <Swiper modules={[Navigation]} slidesPerView={1.4} spaceBetween={16} breakpoints={{ 600: { slidesPerView: 2.2 }, 900: { slidesPerView: 3 } }}>
        {countries.map((country) => (
          <SwiperSlide key={country.id}>
            <Card component={motion.div} whileHover={{ y: -8 }} sx={{ bgcolor: "#222328", borderRadius: 7, p: 1.5, height: 320, cursor: "pointer" }}
              onClick={() => window.location.href = `/${language}/transfer/${country.id}`}
            >
              <Box sx={{ height: 210, borderRadius: 6, display: "grid", placeItems: "center", background: country.heroImage }}>
                <FlagBadge id={country.id} size={130} rounded={30} />
              </Box>
              <Typography align="center" mt={2} fontWeight={900} fontSize={24}>{country.nativeName}</Typography>
              <Typography align="center" color="text.secondary">{country.name}</Typography>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
