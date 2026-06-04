"use client";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  HourglassEmpty,
  Pending,
  Send,
} from "@mui/icons-material";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";

type TransferStatus = {
  id: string;
  status: "pending" | "processing" | "sent" | "completed";
  amount: string;
  currency: string;
  destination: string;
  method: string;
  createdAt: string;
  estimatedCompletion: string;
};

const MOCK_STATUSES: Record<string, TransferStatus> = {
  "MT-001234": {
    id: "MT-001234",
    status: "completed",
    amount: "5,000",
    currency: "BDT",
    destination: "Bangladesh / bKash",
    method: "Mobile Wallet",
    createdAt: "2025-11-14 09:32",
    estimatedCompletion: "2025-11-14 09:45",
  },
  "MT-005678": {
    id: "MT-005678",
    status: "processing",
    amount: "10,000",
    currency: "BDT",
    destination: "India / UPI",
    method: "Bank Transfer",
    createdAt: "2025-11-14 14:10",
    estimatedCompletion: "2025-11-15 14:10",
  },
  "MT-009999": {
    id: "MT-009999",
    status: "pending",
    amount: "2,500",
    currency: "BDT",
    destination: "Sri Lanka / LankaPay",
    method: "Mobile Wallet",
    createdAt: "2025-11-14 16:00",
    estimatedCompletion: "2025-11-14 16:30",
  },
};

const STEPS = ["Pending", "Processing", "Sent", "Completed"];
const STATUS_STEP: Record<TransferStatus["status"], number> = {
  pending: 0,
  processing: 1,
  sent: 2,
  completed: 3,
};

const STATUS_COLOR: Record<TransferStatus["status"], string> = {
  pending: "#FFA726",
  processing: "#42A5F5",
  sent: "#AB47BC",
  completed: "#66BB6A",
};

const STATUS_ICON: Record<TransferStatus["status"], React.ReactNode> = {
  pending: <HourglassEmpty sx={{ fontSize: 56 }} />,
  processing: <CircularProgress size={56} />,
  sent: <Send sx={{ fontSize: 56 }} />,
  completed: <CheckCircle sx={{ fontSize: 56, color: "#66BB6A" }} />,
};

export default function StatusPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TransferStatus | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);
    setTimeout(() => {
      const found = MOCK_STATUSES[query.trim().toUpperCase()];
      if (found) {
        setResult(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 900);
  };

  return (
    <main>
      <Box
        sx={{
          background:
            "radial-gradient(circle at 60% 10%, #1a3a6a 0%, #0a0d14 60%)",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Container maxWidth="sm" sx={{ pt: { xs: 15, md: 18 }, pb: 10 }}>
          <Typography
            variant="h1"
            fontWeight={900}
            fontSize={{ xs: 36, md: 48 }}
            textTransform="uppercase"
            mb={2}
          >
            Transfer status
          </Typography>
          <Typography color="text.secondary" fontSize={18} mb={6}>
            Enter your transfer ID or phone number to track your transfer.
          </Typography>

          {/* Search box */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={6}>
            <TextField
              fullWidth
              placeholder="Transfer ID (e.g. MT-001234) or phone number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1A1B1F",
                  borderRadius: 3,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              sx={{
                minWidth: 130,
                minHeight: 56,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Track"
              )}
            </Button>
          </Stack>

          <Typography
            color="text.secondary"
            fontSize={14}
            mb={4}
            sx={{ opacity: 0.6 }}
          >
            Demo: try MT-001234, MT-005678, or MT-009999
          </Typography>

          {/* Result */}
          {result && (
            <Box
              sx={{
                bgcolor: "#141518",
                borderRadius: 5,
                p: { xs: 3, md: 4 },
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              {/* Status header */}
              <Stack direction="row" alignItems="center" spacing={3} mb={4}>
                <Box sx={{ color: STATUS_COLOR[result.status] }}>
                  {STATUS_ICON[result.status]}
                </Box>
                <Box>
                  <Typography
                    fontWeight={900}
                    fontSize={28}
                    sx={{ color: STATUS_COLOR[result.status] }}
                  >
                    {result.status.charAt(0).toUpperCase() +
                      result.status.slice(1)}
                  </Typography>
                  <Typography color="text.secondary">
                    Transfer #{result.id}
                  </Typography>
                </Box>
              </Stack>

              {/* Stepper */}
              <Stepper
                activeStep={STATUS_STEP[result.status]}
                alternativeLabel
                sx={{ mb: 4 }}
              >
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Divider sx={{ mb: 3 }} />

              {/* Details */}
              <Stack spacing={2}>
                {[
                  ["Amount", `${result.amount} ${result.currency}`],
                  ["Destination", result.destination],
                  ["Method", result.method],
                  ["Created", result.createdAt],
                  ["Est. completion", result.estimatedCompletion],
                ].map(([label, value]) => (
                  <Stack
                    key={label}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography color="text.secondary">{label}</Typography>
                    <Typography fontWeight={800}>{value}</Typography>
                  </Stack>
                ))}
              </Stack>

              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 4, borderRadius: 3 }}
                href="https://t.me/assist_multitransfer_bot"
                target="_blank"
              >
                Contact support
              </Button>
            </Box>
          )}

          {notFound && (
            <Box
              sx={{
                bgcolor: "#1A1010",
                borderRadius: 5,
                p: 4,
                border: "1px solid rgba(255,80,80,.2)",
                textAlign: "center",
              }}
            >
              <Pending sx={{ fontSize: 48, color: "#FF7043", mb: 2 }} />
              <Typography fontWeight={900} fontSize={22}>
                Transfer not found
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Check the transfer ID or contact support if you think this is an
                error.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </main>
  );
}
