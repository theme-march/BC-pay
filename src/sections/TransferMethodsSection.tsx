"use client";

import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  en: {
    title: "Transfer methods",
    cta: "Transfer now",
    cards: [
      ["CARD", "To card", "Send to Visa, Mastercard, or local cards"],
      ["BANK", "To bank account", "Transfer using account or bank details"],
      ["PHONE", "By phone", "Send money with a mobile number"],
      ["CASH", "Cash pickup", "Recipient collects cash from an agent location"],
      ["WAL", "To wallet", "Send to mobile wallets and digital accounts"]
    ]
  },
  bg: {
    title: "ট্রান্সফারের পদ্ধতি",
    cta: "ট্রান্সফার করুন",
    cards: [
      ["CARD", "কার্ডে", "Visa, Mastercard বা স্থানীয় কার্ডে টাকা পাঠান"],
      ["BANK", "ব্যাংক অ্যাকাউন্টে", "অ্যাকাউন্ট বা ব্যাংক তথ্য দিয়ে ট্রান্সফার করুন"],
      ["PHONE", "ফোনে", "মোবাইল নম্বর দিয়ে টাকা পাঠান"],
      ["CASH", "ক্যাশ পিকআপ", "এজেন্ট লোকেশন থেকে নগদ গ্রহণ"],
      ["WAL", "ওয়ালেটে", "মোবাইল ওয়ালেট এবং ডিজিটাল অ্যাকাউন্টে টাকা পাঠান"]
    ]
  },
  in: {
    title: "ट्रांसफर के तरीके",
    cta: "ट्रांसफर करें",
    cards: [
      ["CARD", "कार्ड पर", "Visa, Mastercard या लोकल कार्ड पर पैसे भेजें"],
      ["BANK", "बैंक खाते में", "खाता या बैंक जानकारी से ट्रांसफर करें"],
      ["PHONE", "फोन पर", "मोबाइल नंबर से पैसे भेजें"],
      ["CASH", "कैश पिकअप", "एजेंट लोकेशन से नकद प्राप्त करें"],
      ["WAL", "वॉलेट में", "मोबाइल वॉलेट और डिजिटल खाते में पैसे भेजें"]
    ]
  },
  sl: {
    title: "යැවීමේ ක්‍රම",
    cta: "මුදල් යවන්න",
    cards: [
      ["CARD", "කාඩ්පතට", "Visa, Mastercard හෝ දේශීය කාඩ්පතකට යවන්න"],
      ["BANK", "බැංකු ගිණුමට", "ගිණුම් හෝ බැංකු තොරතුරු මගින් යවන්න"],
      ["PHONE", "දුරකථනයට", "ජංගම අංකයෙන් මුදල් යවන්න"],
      ["CASH", "මුදල් ලබාගැනීම", "ඒජන්ට් ස්ථානයකින් මුදල් ලබාගන්න"],
      ["WAL", "වොලට්ටුවට", "මොබයිල් වොලට් සහ ඩිජිටල් ගිණුම් වෙත යවන්න"]
    ]
  }
};

export function TransferMethodsSection() {
  const { language } = useLanguage();
  const text = content[language];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <SectionTitle>{text.title}</SectionTitle>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.35fr 1fr" }, gap: 2, alignItems: "stretch" }}>
        <Stack spacing={2}>{text.cards.slice(0, 2).map((card) => <MethodCard key={card[1]} card={card} />)}</Stack>
        <Card sx={{ bgcolor: "#222328", borderRadius: 7, p: 4, textAlign: "center", minHeight: 530 }}>
          <Typography fontSize={96} fontWeight={900} color="primary.main">BANK</Typography>
          <Button fullWidth variant="contained" sx={{ minHeight: 104, borderRadius: 7, fontSize: 30, fontStyle: "italic" }}>{text.cta}</Button>
        </Card>
        <Stack spacing={2}>{text.cards.slice(2).map((card) => <MethodCard key={card[1]} card={card} />)}</Stack>
      </Box>
    </Container>
  );
}

function MethodCard({ card }: { card: string[] }) {
  return (
    <Card sx={{ bgcolor: "#222328", borderRadius: 7, p: 4, textAlign: "center", minHeight: 250, overflow: "hidden" }}>
      <Typography fontSize={56} fontWeight={900} color="primary.main">{card[0]}</Typography>
      <Typography fontWeight={900} fontSize={24}>{card[1]}</Typography>
      <Typography color="text.secondary" mt={2} fontSize={18}>{card[2]}</Typography>
    </Card>
  );
}
