"use client";

import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  en: {
    title: "Questions and answers",
    items: [
      ["Why can a transfer fail?", "It can fail because of incorrect recipient details, limits, or a temporary bank issue."],
      ["Which countries are supported?", "The current routes are Bangladesh, India, and Sri Lanka."],
      ["Can I see the fee before sending?", "Yes. After choosing a method, you can see the fee, rate, and total amount."],
      ["What are Step 1 and Step 2?", "Step 1 shows payment and summary. Step 2 collects recipient and sender details."]
    ]
  },
  bg: {
    title: "প্রশ্ন ও উত্তর",
    items: [
      ["ট্রান্সফার কেন ব্যর্থ হতে পারে?", "ভুল প্রাপকের তথ্য, সীমা অতিক্রম বা ব্যাংকের সাময়িক সমস্যার কারণে ব্যর্থ হতে পারে।"],
      ["কোন দেশে টাকা পাঠানো যাবে?", "এখন বাংলাদেশ, ভারত এবং শ্রীলঙ্কা রুট নিয়ে কাজ করা হচ্ছে।"],
      ["ফি আগে দেখা যাবে?", "হ্যাঁ, পদ্ধতি নির্বাচন করলে ফি, রেট এবং মোট পরিমাণ দেখা যায়।"],
      ["Step 1 এবং Step 2 কী?", "Step 1-এ পেমেন্ট ও সারাংশ, Step 2-এ প্রাপক ও প্রেরকের তথ্য পূরণ করতে হয়।"]
    ]
  },
  in: {
    title: "सवाल और जवाब",
    items: [
      ["ट्रांसफर क्यों फेल हो सकता है?", "गलत प्राप्तकर्ता जानकारी, लिमिट या बैंक की अस्थायी समस्या के कारण फेल हो सकता है।"],
      ["किन देशों में पैसे भेज सकते हैं?", "अभी बांग्लादेश, भारत और श्रीलंका रूट पर काम हो रहा है।"],
      ["क्या फीस पहले दिखेगी?", "हां, विधि चुनने पर फीस, रेट और कुल राशि दिखती है।"],
      ["Step 1 और Step 2 क्या हैं?", "Step 1 में भुगतान और सारांश, Step 2 में प्राप्तकर्ता और भेजने वाले की जानकारी भरनी होती है।"]
    ]
  },
  sl: {
    title: "ප්‍රශ්න සහ පිළිතුරු",
    items: [
      ["යැවීම අසාර්ථක වන්නේ ඇයි?", "වැරදි ලබන්නාගේ තොරතුරු, සීමා හෝ බැංකු ගැටලුවක් නිසා අසාර්ථක විය හැක."],
      ["කොන රටවලට මුදල් යවන්න පුළුවන්ද?", "දැනට බංග්ලාදේශය, ඉන්දියාව සහ ශ්‍රී ලංකාව මාර්ග සඳහා වැඩ කරයි."],
      ["ගාස්තුව කලින් පෙන්වයිද?", "ඔව්, ක්‍රමය තෝරාගත් පසු ගාස්තුව, අනුපාතය සහ එකතුව පෙන්වයි."],
      ["Step 1 සහ Step 2 මොනවාද?", "Step 1 හි ගෙවීම සහ සාරාංශය, Step 2 හි ලබන්නා සහ යවන්නාගේ තොරතුරු පුරවයි."]
    ]
  }
};

export function FaqSection() {
  const { language } = useLanguage();
  const text = content[language];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <SectionTitle>{text.title}</SectionTitle>
      {text.items.map(([question, answer]) => (
        <Accordion key={question} disableGutters sx={{ bgcolor: "#232428", borderRadius: "56px !important", mb: 1.5, px: { xs: 1, md: 3 }, py: 2, "&:before": { display: "none" } }}>
          <AccordionSummary expandIcon={<Add sx={{ color: "white" }} />}>
            <Typography fontWeight={900} fontSize={{ xs: 18, md: 24 }}>{question}</Typography>
          </AccordionSummary>
          <AccordionDetails><Typography color="text.secondary" fontSize={18}>{answer}</Typography></AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
