"use client";

import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { Logo } from "@/components/common/Logo";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  en: {
    license: [
      "MultitransferBD payment system",
      "Licensed international money transfer service",
      "Serving Bangladesh, India, and Sri Lanka routes"
    ],
    nav: ["Popular countries", "How to transfer", "Services", "Questions and answers", "Security", "Cash pickup"],
    navLinks: ["/", "/", "/", "/", "/en/security", "/en/pickup"],
    contacts: "Contacts",
    chat: "Support chat",
    rules: "MultitransferBD terms   Privacy policy"
  },
  bg: {
    license: [
      "MultitransferBD পেমেন্ট সিস্টেম",
      "লাইসেন্সপ্রাপ্ত আন্তর্জাতিক মানি ট্রান্সফার সেবা",
      "বাংলাদেশ, ভারত এবং শ্রীলঙ্কা রুটে সেবা প্রদান"
    ],
    nav: ["জনপ্রিয় দেশ", "কিভাবে পাঠাবেন", "সেবা", "প্রশ্ন ও উত্তর", "নিরাপত্তা", "ক্যাশ পিকআপ"],
    navLinks: ["/", "/", "/", "/", "/bg/security", "/bg/pickup"],
    contacts: "যোগাযোগ",
    chat: "সাপোর্ট চ্যাট",
    rules: "MultitransferBD নিয়মাবলী   গোপনীয়তা নীতি"
  },
  in: {
    license: [
      "MultitransferBD भुगतान प्रणाली",
      "लाइसेंस प्राप्त अंतरराष्ट्रीय मनी ट्रांसफर सेवा",
      "बांग्लादेश, भारत और श्रीलंका रूट पर सेवा"
    ],
    nav: ["लोकप्रिय देश", "कैसे ट्रांसफर करें", "सेवाएं", "सवाल और जवाब", "सुरक्षा", "कैश पिकअप"],
    navLinks: ["/", "/", "/", "/", "/in/security", "/in/pickup"],
    contacts: "संपर्क",
    chat: "सपोर्ट चैट",
    rules: "MultitransferBD नियम   गोपनीयता नीति"
  },
  sl: {
    license: [
      "MultitransferBD ගෙවීම් පද්ධතිය",
      "බලපත්‍රලාභී ජාත්‍යන්තර මුදල් හුවමාරු සේවාව",
      "බංග්ලාදේශය, ඉන්දියාව සහ ශ්‍රී ලංකාව සේවා"
    ],
    nav: ["ජනප්‍රිය රටවල්", "මුදල් යවන්නේ කෙසේද", "සේවා", "ප්‍රශ්න සහ පිළිතුරු", "ආරක්ෂාව", "මුදල් ලබාගැනීම"],
    navLinks: ["/", "/", "/", "/", "/sl/security", "/sl/pickup"],
    contacts: "සම්බන්ධතා",
    chat: "සහාය චැට්",
    rules: "MultitransferBD නීති   රහස්‍යතා ප්‍රතිපත්තිය"
  }
};

export function Footer() {
  const { language } = useLanguage();
  const text = content[language];

  return (
    <Box component="footer" sx={{ bgcolor: "#232428", borderRadius: "64px 64px 0 0", mt: 8, py: 7 }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={5}>
          <Box>
            <Logo />
            <Typography color="text.secondary" mt={4} fontSize={13}>
              {text.license.map((line) => (
                <span key={line}>{line}<br /></span>
              ))}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={3} mt={7} color="text.secondary" fontWeight={900}>
              {text.nav.map((item, i) => (
                <Box
                  key={item}
                  component="a"
                  href={text.navLinks[i]}
                  sx={{ color: "text.secondary", textDecoration: "none", cursor: "pointer", "&:hover": { color: "white" }, transition: "color .15s" }}
                >
                  {item}
                </Box>
              ))}
            </Stack>
          </Box>

          <Box minWidth={280}>
            <Typography variant="h2" fontSize={24} mb={2}>{text.contacts}</Typography>
            {[
              text.chat,
              "@multitransferbd_support",
              "support@multitransferbd.com",
              "+880 1800 000 000  24/7"
            ].map((item) => (
              <Box key={item} sx={{ bgcolor: "#141518", borderRadius: 4, p: 2, mb: 1, fontWeight: 900 }}>
                {item}
              </Box>
            ))}
          </Box>
        </Stack>

        <Divider sx={{ my: 6 }} />

        {/* Payment method logos (text-based) */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Typography color="text.secondary" fontWeight={900} fontSize={13}>{text.rules}</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {["VISA", "Mastercard", "bKash", "UPI", "LankaPay", "SWIFT"].map((brand) => (
              <Box
                key={brand}
                sx={{
                  bgcolor: "#141518",
                  borderRadius: 2,
                  px: 2,
                  py: 0.8,
                  fontSize: 13,
                  fontWeight: 900,
                  color: "text.secondary",
                  border: "1px solid rgba(255,255,255,.06)"
                }}
              >
                {brand}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
