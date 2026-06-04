import { notFound } from "next/navigation";
import { Box, Container, Stack, Typography, Button, Chip } from "@mui/material";
import { countries, methods } from "@/mock/data";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/layout/Header";
import { TransferCalculator } from "@/components/calculator/TransferCalculator";

const locales = ["en", "bg", "sl", "in"];

export function generateStaticParams() {
  const countryIds = countries.map((c) => c.id);
  return locales.flatMap((locale) =>
    countryIds.map((country) => ({ locale, country })),
  );
}

export default async function CountryTransferPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: countrySlug } = await params;
  if (!locales.includes(locale)) notFound();

  const country = countries.find((c) => c.id === countrySlug);
  if (!country) notFound();

  const countryMethods = methods;

  return (
    <main>
      {/* Hero */}
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: "auto", md: 680 },
          position: "relative",
          overflow: "hidden",
          background: country.heroImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          color: "#fff",
        }}
      >
        <Header />
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 2,
            pt: { xs: 15, md: 18 },
            pb: { xs: 8, md: 12 },
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={6}
          >
            <Box sx={{ maxWidth: { xs: "100%", md: 600 } }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 38, sm: 56, lg: 64 },
                  textTransform: "uppercase",
                  fontWeight: 900,
                }}
              >
                Send money to
                <br />
                {country.nativeName}
              </Typography>
              <Typography
                mt={3}
                fontSize={{ xs: 18, md: 22 }}
                fontWeight={800}
                sx={{ opacity: 0.9 }}
              >
                Fast transfers to {country.currency} — 0% commission
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                mt={4}
                flexWrap="wrap"
                useFlexGap
              >
                <Chip
                  label={`Rate: 1 USD = ${country.rateFromUsd} ${country.currency}`}
                  sx={{
                    bgcolor: "rgba(255,255,255,.18)",
                    color: "white",
                    fontWeight: 800,
                    fontSize: 15,
                  }}
                />
                <Chip
                  label="0% fee on first transfer"
                  sx={{
                    bgcolor: "rgba(255,255,255,.18)",
                    color: "white",
                    fontWeight: 800,
                    fontSize: 15,
                  }}
                />
              </Stack>
            </Box>
            <TransferCalculator />
          </Stack>
        </Container>
      </Box>

      {/* Transfer methods for this country */}
      <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
        <Typography
          variant="h2"
          fontWeight={900}
          fontSize={{ xs: 28, md: 36 }}
          mb={4}
          textTransform="uppercase"
        >
          Transfer methods to {country.name}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {countryMethods.map((m) => (
            <Box
              key={m.id}
              sx={{
                bgcolor: "#1A1B1F",
                borderRadius: 5,
                p: 4,
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              <Typography fontWeight={900} fontSize={22} mb={1}>
                {m.title}
              </Typography>
              <Typography color="text.secondary" mb={2}>
                {m.subtitle}
              </Typography>
              <Chip label={m.tag} color="primary" size="small" sx={{ mb: 2 }} />
              <Box
                sx={{
                  bgcolor: "#111",
                  borderRadius: 3,
                  p: 2,
                  fontSize: 14,
                  color: "text.secondary",
                }}
              >
                Limit: {m.min.toLocaleString()} – {m.max.toLocaleString()} BDT
              </Box>
              <Typography mt={2} fontSize={14} color="text.secondary">
                Fee: {m.fee} + {m.feePercent ?? 0}%
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Country info */}
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            borderRadius: 7,
            p: { xs: 4, md: 6 },
            background: "linear-gradient(105deg,#1a2a4a,#0d1a2e)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <Typography
            variant="h2"
            fontWeight={900}
            fontSize={{ xs: 24, md: 32 }}
            mb={4}
          >
            About transfers to {country.name}
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box flex={1}>
              <Typography color="text.secondary" fontSize={18} lineHeight={1.8}>
                We support multiple transfer methods to {country.name} including
                bank account transfers, mobile wallet top-ups (
                {country.id === "bangladesh"
                  ? "bKash, Nagad, Rocket"
                  : country.id === "india"
                    ? "UPI, Paytm, PhonePe"
                    : "LankaPay, Dialog"}
                ), cash pickup, and card transfers. All transfers are processed
                securely.
              </Typography>
            </Box>
            <Box flex={1}>
              <Stack spacing={2}>
                {[
                  ["Currency", country.currency],
                  [
                    "Exchange rate",
                    `1 USD = ${country.rateFromUsd} ${country.currency}`,
                  ],
                  [
                    "Processing time",
                    "Minutes to 1-3 days depending on method",
                  ],
                  ["Min. transfer", `${methods[0].min.toLocaleString()} BDT`],
                  ["Max. transfer (daily)", "800,000 BDT"],
                ].map(([label, value]) => (
                  <Stack
                    key={label}
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      borderBottom: "1px solid rgba(255,255,255,.06)",
                      pb: 1.5,
                    }}
                  >
                    <Typography color="text.secondary">{label}</Typography>
                    <Typography fontWeight={800}>{value}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
          <Button variant="contained" size="large" sx={{ mt: 4, px: 5 }}>
            Start transfer to {country.name}
          </Button>
        </Box>
      </Container>

      <Footer />
    </main>
  );
}
