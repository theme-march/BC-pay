"use client";

import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  en: {
    cta: "Choose location",
    promos: [
      { title: "Send cash abroad", subtitle: "0% commission, great rate, Bangladesh India Sri Lanka", icon: "CASH" },
      { title: "Top up mobile wallets", subtitle: "Send to wallets quickly and transparently", icon: "WAL" },
      { title: "Easy transfers for family", subtitle: "Safe international payments at a lower cost", icon: "FAM" }
    ]
  },
  bg: {
    cta: "লোকেশন বাছুন",
    promos: [
      { title: "বিদেশে ক্যাশ পাঠান", subtitle: "০% কমিশন, ভালো রেট, বাংলাদেশ ভারত শ্রীলঙ্কা", icon: "CASH" },
      { title: "মোবাইল ওয়ালেট টপ আপ", subtitle: "দ্রুত এবং পরিষ্কারভাবে ওয়ালেটে টাকা পাঠান", icon: "WAL" },
      { title: "পরিবারের জন্য সহজ ট্রান্সফার", subtitle: "কম খরচে নিরাপদ আন্তর্জাতিক পেমেন্ট", icon: "FAM" }
    ]
  },
  in: {
    cta: "स्थान चुनें",
    promos: [
      { title: "विदेश में कैश भेजें", subtitle: "0% कमीशन, बेहतर रेट, बांग्लादेश भारत श्रीलंका", icon: "CASH" },
      { title: "मोबाइल वॉलेट टॉप अप", subtitle: "वॉलेट में तेज और पारदर्शी पैसे भेजें", icon: "WAL" },
      { title: "परिवार के लिए आसान ट्रांसफर", subtitle: "कम खर्च में सुरक्षित अंतरराष्ट्रीय भुगतान", icon: "FAM" }
    ]
  },
  sl: {
    cta: "ස්ථානය තෝරන්න",
    promos: [
      { title: "විදේශයට මුදල් යවන්න", subtitle: "0% කොමිස්, හොඳ අනුපාත, බංග්ලාදේශය ඉන්දියාව ශ්‍රී ලංකාව", icon: "CASH" },
      { title: "මොබයිල් වොලට් පුරවන්න", subtitle: "ඉක්මනින් සහ පැහැදිලිව වොලට් වෙත මුදල් යවන්න", icon: "WAL" },
      { title: "පවුලට පහසු යැවීම්", subtitle: "අඩු වියදමින් ආරක්ෂිත ජාත්‍යන්තර ගෙවීම්", icon: "FAM" }
    ]
  }
};

export function PromoSlider() {
  const { language } = useLanguage();
  const text = content[language];
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ position: "relative" }}>
        <Swiper
          modules={[Autoplay, Navigation]}
          onSwiper={setSwiperInstance}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          autoplay={{ delay: 3500 }}
          loop
        >
          {text.promos.map((item) => (
            <SwiperSlide key={item.title}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ minHeight: 290, borderRadius: 9, px: { xs: 3, md: 6 }, background: "linear-gradient(105deg, #8B86CE, #C8D3FF)" }}>
                <Box>
                  <Typography variant="h2" fontSize={{ xs: 28, md: 44 }} maxWidth={720} textTransform="uppercase">{item.title}</Typography>
                  <Typography fontWeight={800} fontSize={20} mt={2}>{item.subtitle}</Typography>
                  <Button sx={{ mt: 4, bgcolor: "white", color: "#111", px: 4 }}>{text.cta}</Button>
                </Box>
                <Typography fontSize={{ xs: 44, md: 72 }} fontWeight={900} display={{ xs: "none", sm: "block" }}>{item.icon}</Typography>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton ref={prevRef} sx={{ position: "absolute", left: -28, top: "45%", zIndex: 3, bgcolor: "#24252A" }}><ArrowBackIosNew /></IconButton>
        <IconButton ref={nextRef} sx={{ position: "absolute", right: -28, top: "45%", zIndex: 3, bgcolor: "#24252A" }}><ArrowForwardIos /></IconButton>
      </Box>
    </Container>
  );
}
