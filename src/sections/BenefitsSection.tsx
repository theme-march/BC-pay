"use client";

import { Box, Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  en: {
    title: "Service benefits",
    items: [
      ["FAM", "Support family and friends", "Send money to loved ones in any supported country."],
      ["BUY", "Shopping and bills", "Pay for overseas services, goods, and online purchases."],
      ["JOB", "Freelance work", "Manage project and service payments without friction."],
      ["CLR", "Transparent calculation", "See the rate, fee, and receive amount before sending."]
    ]
  },
  bg: {
    title: "সেবার সুবিধা",
    items: [
      ["FAM", "পরিবার ও বন্ধুদের সহায়তা", "যে কোনো দেশে কাছের মানুষকে সহজে টাকা পাঠান।"],
      ["BUY", "কেনাকাটা ও বিল", "বিদেশি সেবা, পণ্য এবং অনলাইন পেমেন্ট দ্রুত করুন।"],
      ["JOB", "ফ্রিল্যান্স কাজ", "প্রজেক্ট ও সার্ভিস পেমেন্ট সীমাহীনভাবে ম্যানেজ করুন।"],
      ["CLR", "স্বচ্ছ হিসাব", "রেট, ফি এবং পাওয়ার পরিমাণ আগে থেকেই দেখুন।"]
    ]
  },
  in: {
    title: "सेवा के फायदे",
    items: [
      ["FAM", "परिवार और दोस्तों की मदद", "किसी भी देश में अपनों को आसानी से पैसे भेजें।"],
      ["BUY", "खरीदारी और बिल", "विदेशी सेवाओं, सामान और ऑनलाइन भुगतान जल्दी करें।"],
      ["JOB", "फ्रीलांस काम", "प्रोजेक्ट और सर्विस भुगतान आसानी से मैनेज करें।"],
      ["CLR", "पारदर्शी हिसाब", "रेट, फीस और प्राप्त राशि पहले से देखें।"]
    ]
  },
  sl: {
    title: "සේවාවේ වාසි",
    items: [
      ["FAM", "පවුල සහ මිතුරන්ට සහය", "ඕනෑම රටකට ආදරණීයයන්ට පහසුවෙන් මුදල් යවන්න."],
      ["BUY", "මිලදී ගැනීම් සහ බිල්", "විදේශීය සේවා, භාණ්ඩ සහ මාර්ගගත ගෙවීම් ඉක්මනින් කරන්න."],
      ["JOB", "ෆ්‍රීලාන්ස් වැඩ", "ව්‍යාපෘති සහ සේවා ගෙවීම් පහසුවෙන් කළමනාකරණය කරන්න."],
      ["CLR", "පැහැදිලි ගණනය", "අනුපාතය, ගාස්තුව සහ ලැබෙන මුදල කලින් බලන්න."]
    ]
  }
};

export function BenefitsSection() {
  const { language } = useLanguage();
  const text = content[language];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <Stack direction="row" justifyContent="space-between">
        <SectionTitle>{text.title}</SectionTitle>
        <Stack direction="row" spacing={2} display={{ xs: "none", md: "flex" }}>
          <IconButton sx={{ bgcolor: "#222328" }}><ArrowBackIosNew /></IconButton>
          <IconButton sx={{ bgcolor: "#222328" }}><ArrowForwardIos /></IconButton>
        </Stack>
      </Stack>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 2 }}>
        {text.items.map(([icon, title, body]) => (
          <Card key={title} sx={{ bgcolor: "#202126", borderRadius: 6, p: 4, minHeight: 320, textAlign: "center" }}>
            <Typography fontSize={64} fontWeight={900} color="primary.main">{icon}</Typography>
            <Typography fontWeight={900} fontSize={24}>{title}</Typography>
            <Typography color="text.secondary" mt={2} fontSize={18}>{body}</Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
