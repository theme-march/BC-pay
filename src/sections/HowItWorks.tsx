"use client";

import { Box, Card, Container, Stack, Typography } from "@mui/material";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  en: {
    title: "How to transfer",
    phoneFields: ["Recipient", "Card number", "Last name", "First name", "Phone", "Sender"],
    steps: [
      ["1", "Start transfer", "Choose country, currency, and amount."],
      ["2", "Recipient and sender", "Fill recipient card and sender details."],
      ["3", "Payment", "Pay by card, SBP, or Pay."],
      ["OK", "Transfer sent", "You will see confirmation after success."]
    ]
  },
  bg: {
    title: "কিভাবে পাঠাবেন",
    phoneFields: ["প্রাপক", "কার্ড নম্বর", "পদবি", "নাম", "ফোন", "প্রেরক"],
    steps: [
      ["1", "ট্রান্সফার শুরু", "দেশ, মুদ্রা এবং পরিমাণ নির্বাচন করুন।"],
      ["2", "প্রাপক ও প্রেরক", "প্রাপকের কার্ড এবং প্রেরকের তথ্য পূরণ করুন।"],
      ["3", "পেমেন্ট", "কার্ড, SBP বা Pay দিয়ে পেমেন্ট করুন।"],
      ["OK", "ট্রান্সফার পাঠানো", "সফল হলে নিশ্চিতকরণ দেখবেন।"]
    ]
  },
  in: {
    title: "कैसे ट्रांसफर करें",
    phoneFields: ["प्राप्तकर्ता", "कार्ड नंबर", "उपनाम", "नाम", "फोन", "भेजने वाला"],
    steps: [
      ["1", "ट्रांसफर शुरू", "देश, मुद्रा और राशि चुनें।"],
      ["2", "प्राप्तकर्ता और भेजने वाला", "प्राप्तकर्ता कार्ड और भेजने वाले की जानकारी भरें।"],
      ["3", "भुगतान", "कार्ड, SBP या Pay से भुगतान करें।"],
      ["OK", "ट्रांसफर भेजा गया", "सफल होने पर पुष्टि दिखाई देगी।"]
    ]
  },
  sl: {
    title: "මුදල් යවන්නේ කෙසේද",
    phoneFields: ["ලබන්නා", "කාඩ් අංකය", "වාසගම", "නම", "දුරකථනය", "යවන්නා"],
    steps: [
      ["1", "යැවීම ආරම්භ කරන්න", "රට, මුදල් ඒකකය සහ මුදල තෝරන්න."],
      ["2", "ලබන්නා සහ යවන්නා", "ලබන්නාගේ කාඩ්පත සහ යවන්නාගේ තොරතුරු පුරවන්න."],
      ["3", "ගෙවීම", "කාඩ්, SBP හෝ Pay මගින් ගෙවන්න."],
      ["OK", "මුදල් යැවිය", "සාර්ථක නම් තහවුරු කිරීමක් පෙන්වයි."]
    ]
  }
};

export function HowItWorks() {
  const { language } = useLanguage();
  const text = content[language];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <SectionTitle>{text.title}</SectionTitle>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Stack spacing={2} flex={1.15}>
          {text.steps.map((step, index) => (
            <Card key={step[1]} sx={{ bgcolor: "#222328", borderRadius: 7, p: 3, border: index === 1 ? "2px solid #1677FF" : "0", boxShadow: index === 1 ? "0 12px 0 #1677FF" : "none" }}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Box sx={{ width: 82, height: 82, borderRadius: "50%", border: "8px solid #34363C", display: "grid", placeItems: "center", fontSize: 24, fontWeight: 900 }}>{step[0]}</Box>
                <Box>
                  <Typography fontWeight={900} fontSize={24}>{step[1]}</Typography>
                  <Typography color="text.secondary" fontSize={18}>{step[2]}</Typography>
                </Box>
              </Stack>
            </Card>
          ))}
        </Stack>
        <Card sx={{ flex: 1, bgcolor: "#222328", borderRadius: 7, display: "grid", placeItems: "center", minHeight: 560 }}>
          <Box sx={{ width: 260, height: 520, border: "8px solid #050505", borderRadius: 9, bgcolor: "#111", p: 2, boxShadow: "0 24px 60px rgba(22,119,255,.25)" }}>
            <Box sx={{ height: 120, borderRadius: 4, background: "linear-gradient(135deg,#a23a14,#ffe2a6)" }} />
            {text.phoneFields.map((item, index) => <Box key={item} sx={{ mt: 1.2, p: 1.4, borderRadius: 3, bgcolor: index === 0 || index === 5 ? "#222" : "#333", fontWeight: 800 }}>{item}</Box>)}
          </Box>
        </Card>
      </Stack>
    </Container>
  );
}
