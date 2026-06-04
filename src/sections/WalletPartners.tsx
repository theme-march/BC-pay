"use client";

import { Box, Card, Container, Stack, Typography } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  en: { title: "Top up electronic wallets", countries: ["Bangladesh", "India", "Sri Lanka"] },
  bg: { title: "ইলেকট্রনিক ওয়ালেট টপ আপ", countries: ["বাংলাদেশ", "ভারত", "শ্রীলঙ্কা"] },
  in: { title: "इलेक्ट्रॉनिक वॉलेट टॉप अप", countries: ["बांग्लादेश", "भारत", "श्रीलंका"] },
  sl: { title: "ඉලෙක්ට්‍රොනික වොලට් පුරවන්න", countries: ["බංග්ලාදේශය", "ඉන්දියාව", "ශ්‍රී ලංකාව"] }
};

export function WalletPartners() {
  const { language } = useLanguage();
  const text = content[language];
  const wallets = [["bKash", text.countries[0], "BK"], ["UPI", text.countries[1], "UPI"], ["LankaPay", text.countries[2], "LP"]];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ borderRadius: 9, p: { xs: 3, md: 5 }, background: "linear-gradient(105deg,#37A7F2,#176BD8)" }}>
        <Typography variant="h2" align="center" fontSize={{ xs: 28, md: 36 }} textTransform="uppercase" mb={4}>{text.title}</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2, bgcolor: "rgba(0,0,0,.18)", p: 2, borderRadius: 6 }}>
          {wallets.map(([title, country, icon]) => (
            <Card key={title} sx={{ bgcolor: "rgba(255,255,255,.2)", borderRadius: 5, p: 2 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 88, height: 88, borderRadius: 5, bgcolor: "rgba(255,255,255,.8)", color: "#0B55B8", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 28 }}>{icon}</Box><Box><Typography fontWeight={900} fontSize={24}>{title}</Typography><Typography>{country}</Typography></Box></Stack>
                <Box sx={{ width: 52, height: 52, borderRadius: "50%", bgcolor: "white", color: "#111", display: "grid", placeItems: "center", fontSize: 28 }}>›</Box>
              </Stack>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
