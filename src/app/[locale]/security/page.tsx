import { Box, Container, Stack, Typography } from "@mui/material";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";

const sections = [
  {
    title: "Licensed payment service",
    body: "MultitransferBD operates as a licensed payment service provider. All transactions are processed under applicable financial regulations for international money transfers in Bangladesh, India, and Sri Lanka.",
    icon: "🏦",
  },
  {
    title: "Data encryption",
    body: "All personal and financial data is encrypted using TLS 1.3 and AES-256 standards. Your card details are never stored on our servers — they are tokenized and processed by certified payment processors.",
    icon: "🔐",
  },
  {
    title: "Identity verification",
    body: "To comply with AML/KYC regulations, we verify the identity of senders and recipients. This protects you and ensures transfers are legitimate and safe.",
    icon: "🪪",
  },
  {
    title: "Transfer limits",
    body: "We enforce transfer limits to protect users: per transaction up to 400,000 BDT, per day up to 800,000 BDT, and per month up to 1,000,000 BDT. These limits help prevent fraud.",
    icon: "📊",
  },
  {
    title: "24/7 monitoring",
    body: "Our fraud detection system monitors all transactions in real time. Suspicious activity is flagged immediately and our support team is available around the clock.",
    icon: "👁️",
  },
  {
    title: "Complaint handling",
    body: "If you have a complaint or dispute, contact us via Telegram @assist_multitransfer_bot or email support@multitransferbd.com. All complaints are addressed within 1 business day.",
    icon: "📩",
  },
];

export default function SecurityPage() {
  return (
    <main>
      <Box sx={{ background: "radial-gradient(circle at 30% 10%, #0a2040 0%, #05080f 60%)", minHeight: "60vh" }}>
        <Header />
        <Container maxWidth="lg" sx={{ pt: { xs: 16, md: 20 }, pb: 10 }}>
          <Typography variant="h1" fontWeight={900} fontSize={{ xs: 36, md: 56 }} textTransform="uppercase" mb={3}>
            Security
          </Typography>
          <Typography color="text.secondary" fontSize={{ xs: 17, md: 20 }} maxWidth={640} mb={8}>
            Your money and personal data are protected at every step. Here is how we keep transfers safe.
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
            {sections.map((section) => (
              <Box
                key={section.title}
                sx={{
                  bgcolor: "#0F1117",
                  borderRadius: 5,
                  p: { xs: 3, md: 4 },
                  border: "1px solid rgba(255,255,255,.07)",
                  transition: "border-color .2s",
                  "&:hover": { borderColor: "rgba(22,119,255,.4)" },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Typography fontSize={36}>{section.icon}</Typography>
                  <Box>
                    <Typography fontWeight={900} fontSize={20} mb={1.5}>{section.title}</Typography>
                    <Typography color="text.secondary" fontSize={16} lineHeight={1.75}>{section.body}</Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Box>

          {/* Compliance badges */}
          <Box sx={{ mt: 8, p: { xs: 3, md: 5 }, borderRadius: 6, bgcolor: "#0F1117", border: "1px solid rgba(255,255,255,.07)" }}>
            <Typography fontWeight={900} fontSize={22} mb={3}>Compliance & certifications</Typography>
            <Stack direction="row" flexWrap="wrap" gap={3}>
              {["AML/KYC compliant", "TLS 1.3 encrypted", "PCI DSS data handling", "GDPR aligned", "Bangladesh Bank guidelines"].map((badge) => (
                <Box key={badge} sx={{ bgcolor: "#1A2A4A", color: "#7EC8E3", borderRadius: 3, px: 3, py: 1.5, fontWeight: 800, fontSize: 14 }}>
                  {badge}
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
      <Footer />
    </main>
  );
}
