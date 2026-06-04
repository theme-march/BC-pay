"use client";

import { Button, Card, Container, Typography } from "@mui/material";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  en: {
    title: "Services",
    items: [
      ["STATUS", "Transfer status", "Track every step of your transfer.", "Check status", false, "/en/status"],
      ["OFFICE", "Cash pickup offices", "Find pickup locations in the destination country.", "Find office", false, "/en/pickup"],
      ["CHAT", "Support", "Get fast help through chat.", "Message", false, "https://t.me/multitransferbd_support"]
    ]
  },
  bg: {
    title: "সেবা",
    items: [
      ["STATUS", "ট্রান্সফার স্ট্যাটাস", "আপনার ট্রান্সফারের প্রতিটি ধাপ ট্র্যাক করুন।", "স্ট্যাটাস দেখুন", false, "/bg/status"],
      ["OFFICE", "ক্যাশ পিকআপ অফিস", "গন্তব্য দেশে ক্যাশ পিকআপ লোকেশন খুঁজুন।", "অফিস খুঁজুন", false, "/bg/pickup"],
      ["CHAT", "সাপোর্ট", "চ্যাটের মাধ্যমে দ্রুত সহায়তা পান।", "মেসেজ করুন", false, "https://t.me/multitransferbd_support"]
    ]
  },
  in: {
    title: "सेवाएं",
    items: [
      ["STATUS", "ट्रांसफर स्टेटस", "अपने ट्रांसफर के हर चरण को ट्रैक करें।", "स्टेटस देखें", false, "/in/status"],
      ["OFFICE", "कैश पिकअप ऑफिस", "गंतव्य देश में कैश पिकअप लोकेशन खोजें।", "ऑफिस खोजें", false, "/in/pickup"],
      ["CHAT", "सपोर्ट", "चैट से तेज मदद पाएं।", "मैसेज करें", false, "https://t.me/multitransferbd_support"]
    ]
  },
  sl: {
    title: "සේවා",
    items: [
      ["STATUS", "යැවීමේ තත්ත්වය", "ඔබගේ යැවීමේ සෑම පියවරක්ම පරීක්ෂා කරන්න.", "තත්ත්වය බලන්න", false, "/sl/status"],
      ["OFFICE", "මුදල් ලබාගැනීමේ කාර්යාල", "ගමනාන්ත රටේ මුදල් ලබාගැනීමේ ස්ථාන සොයන්න.", "කාර්යාලය සොයන්න", false, "/sl/pickup"],
      ["CHAT", "සහාය", "චැට් මගින් ඉක්මන් සහාය ලබාගන්න.", "පණිවිඩයක් යවන්න", false, "https://t.me/multitransferbd_support"]
    ]
  }
};

export function ServicesSection() {
  const { language } = useLanguage();
  const text = content[language];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <SectionTitle>{text.title}</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {text.items.map(([icon, title, description, cta, disabled, href]) => (
          <Card key={title as string} sx={{ bgcolor: "#222328", borderRadius: 7, p: 4, textAlign: "center", minHeight: 420 }}>
            <Typography fontSize={54} fontWeight={900} color="primary.main">{icon}</Typography>
            <Typography fontWeight={900} fontSize={24}>{title}</Typography>
            <Typography color="text.secondary" fontSize={18} mt={2} minHeight={86}>{description}</Typography>
            <Button
              fullWidth
              variant="contained"
              disabled={Boolean(disabled)}
              href={href as string}
              sx={{ mt: 4 }}
            >
              {cta}
            </Button>
          </Card>
        ))}
      </div>
    </Container>
  );
}
