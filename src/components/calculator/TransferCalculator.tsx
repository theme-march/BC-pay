"use client";

import {
  AccountBalance,
  ArrowBackIosNew,
  ArrowForwardIos,
  CheckCircle,
  Close,
  CreditCard,
  CurrencyExchange,
  Error,
  Search,
  SwapHoriz,
  Lock,
  Wallet,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { countries, methods } from "@/mock/data";
import { Country, LiveRates, SendCurrency, TransferMethod } from "@/types";
import { CurrencyCode } from "@/types";
import { FlagBadge } from "@/components/common/FlagBadge";
import { useLanguage } from "@/i18n/LanguageContext";

const SEND_CURRENCIES: { code: SendCurrency; label: string }[] = [
  { code: "RUB", label: "RUB" },
];

const Panel = styled(Box)(({ theme }) => ({
  background: "#121316",
  borderRadius: 30,
  padding: theme.spacing(3.5),
  width: "100%",
  maxWidth: 510,
  minHeight: 500,
  boxShadow: "0 24px 90px rgba(0,0,0,.36)",
}));

const PickRow = styled(Button)(({ theme }) => ({
  width: "100%",
  minHeight: 66,
  borderRadius: 18,
  background: "#25262A",
  color: "#fff",
  justifyContent: "space-between",
  padding: theme.spacing(1.2, 1.6),
  "&:hover": { background: "#2C2D32" },
}));

type WizardPayload = {
  country: Country;
  method: TransferMethod;
  amount: number;
  receive: number;
  receiveCurrency: CurrencyCode;
  sendCurrency: SendCurrency;
};

function getRateKey(from: SendCurrency, to: string): string {
  return `${from}_${to}`;
}

function CountryInline({
  onBack,
  onSelect,
}: {
  onBack: () => void;
  onSelect: (c: Country) => void;
}) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const filtered = countries.filter(
    (c) =>
      c.id !== "russia" &&
      `${c.name} ${c.nativeName}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Box>
      <SelectorHeader
        title={t("countryModalTitle")}
        subtitle={t("countrySubtitle")}
        onBack={onBack}
      />
      <Box sx={{ px: 0, pt: 3 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={selectorSearchSx}
        />
      </Box>
      <Stack
        spacing={1.6}
        sx={{ px: 0, pt: 2.5, pb: 4, maxHeight: 300, overflowY: "auto" }}
      >
        {filtered.map((item) => (
          <Button
            key={item.id}
            onClick={() => onSelect(item)}
            sx={{
              justifyContent: "flex-start",
              color: "white",
              minHeight: 56,
              p: 0,
              borderRadius: 3,
            }}
          >
            <Stack direction="row" spacing={1.6} alignItems="center">
              <FlagBadge id={item.id} size={52} rounded={18} />
              <Box textAlign="left">
                <Typography color="text.secondary" fontSize={14}>
                  {item.name}
                </Typography>
                <Typography fontWeight={900} fontSize={18}>
                  {item.nativeName}
                </Typography>
              </Box>
            </Stack>
          </Button>
        ))}
        {!filtered.length && (
          <Alert severity="info">{t("countryNotFound")}</Alert>
        )}
      </Stack>
    </Box>
  );
}

function MethodInline({
  onBack,
  onSelect,
  country,
}: {
  onBack: () => void;
  onSelect: (m: TransferMethod) => void;
  country: Country;
}) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "best" | "cash">("all");
  const filtered = methods.filter((item) => {
    const byQuery = `${item.title} ${item.subtitle} ${item.tag}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const byFilter =
      filter === "all" ||
      (filter === "best" && item.id === "bank") ||
      (filter === "cash" && ["bank", "cash"].includes(item.id));
    return byQuery && byFilter;
  });
  return (
    <Box>
      <SelectorHeader
        title={t("methodModalTitle")}
        subtitle={t("methodSubtitle")}
        onBack={onBack}
      />
      <Box sx={{ px: 1, pt: 3 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={selectorSearchSx}
        />
      </Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{ px: 1, pt: 2, pb: 1 }}
        flexWrap="wrap"
        useFlexGap
      >
        {(["all", "best", "cash"] as const).map((f) => (
          <Chip
            key={f}
            label={
              f === "all"
                ? t("all")
                : f === "best"
                  ? t("bestRate")
                  : t("cashPickup")
            }
            onClick={() => setFilter(f)}
            sx={{
              bgcolor: filter === f ? "white" : "#28292E",
              color: filter === f ? "#111" : "white",
              fontWeight: 900,
            }}
          />
        ))}
      </Stack>
      <Stack
        spacing={1.5}
        sx={{ px: 1, py: 2, maxHeight: 300, overflowY: "auto" }}
      >
        {filtered.map((item) => (
          <Box
            key={item.id}
            sx={{ bgcolor: "#232428", borderRadius: 1, p: 2.5 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row" spacing={1.2} alignItems="center">
                <FlagBadge id={country.id} size={44} rounded={15} />
                <Box>
                  <Typography fontWeight={900}>{item.title}</Typography>
                  <Typography color="text.secondary">
                    {item.subtitle}
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="contained"
                onClick={() => onSelect(item)}
                sx={{ minHeight: 36, borderRadius: 1 }}
              >
                {t("select")}
              </Button>
            </Stack>
            <Divider sx={{ my: 1.4 }} />
            <Box
              sx={{
                bgcolor: "#2A2010",
                color: "#FFB347",
                borderRadius: 1,
                p: 1.2,
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              {t("limitMessage")} : {item.min.toLocaleString()} –{" "}
              {item.max.toLocaleString()} BDT/RUB/USD
            </Box>
          </Box>
        ))}
        {!filtered.length && (
          <Alert severity="info">{t("methodNotFound")}</Alert>
        )}
      </Stack>
    </Box>
  );
}

function computeReceive(
  amount: number,
  from: SendCurrency,
  to: CurrencyCode,
  country: Country,
  liveRates: LiveRates | null,
): number {
  if (!amount) return 0;
  const key = getRateKey(from, to);
  if (liveRates && liveRates[key]) return Math.round(amount * liveRates[key]);

  // If receiving in the country's local currency
  if (to === country.currency) {
    if (from === "RUB") return Math.round(amount * country.rateFromRub);
    if (from === "USD") return Math.round(amount * country.rateFromUsd);
    if (from === "BDT") return Math.round(amount * country.rateFromBdt);
    if (from === "EUR") return Math.round(amount * country.rateFromUsd * 1.08);
    return Math.round(amount * country.rateFromUsd);
  }

  // If receiving in USD, derive cross rate: from -> local, then / (USD -> local)
  if (to === "USD") {
    const fromToLocal =
      from === "RUB"
        ? country.rateFromRub
        : from === "BDT"
          ? country.rateFromBdt
          : country.rateFromUsd;
    const usdToLocal = country.rateFromUsd || 1;
    return Math.round(amount * (fromToLocal / usdToLocal));
  }

  // Fallback to using local rate
  if (from === "RUB") return Math.round(amount * country.rateFromRub);
  if (from === "USD") return Math.round(amount * country.rateFromUsd);
  return Math.round(amount * country.rateFromUsd);
}

function getDisplayRate(
  from: SendCurrency,
  to: CurrencyCode,
  country: Country,
  liveRates: LiveRates | null,
): string {
  const key = getRateKey(from, to);
  const rate =
    liveRates?.[key] ??
    (to === country.currency
      ? from === "RUB"
        ? country.rateFromRub
        : from === "USD"
          ? country.rateFromUsd
          : country.rateFromBdt
      : undefined);
  const display = rate ?? "-";
  return `1 ${from} = ${display} ${to}`;
}

export function TransferCalculator({
  onCountryChange,
}: {
  onCountryChange?: (country: Country) => void;
}) {
  const { t } = useLanguage();
  const [country, setCountry] = useState<Country>(
    countries.find((c) => c.id !== "russia") || countries[0],
  );
  const [method, setMethod] = useState<TransferMethod | null>(null);
  const [amount, setAmount] = useState(0);
  const [sendCurrency, setSendCurrency] = useState<SendCurrency>("RUB");
  const [view, setView] = useState<"main" | "country" | "method">("main");
  const RECEIVE_MAP: Record<string, CurrencyCode[]> = {
    bangladesh: ["BDT"],
    india: ["INR", "USD"],
    pakistan: ["PKR", "USD"],
    "sri-lanka": ["LKR", "USD"],
  };
  const [receiveCurrency, setReceiveCurrency] = useState<CurrencyCode>(
    RECEIVE_MAP[country.id]?.[0] ?? country.currency,
  );
  const [wizardOpen, setWizardOpen] = useState(false);
  const [liveRates, setLiveRates] = useState<LiveRates | null>(null);
  const [ratesLoading, setRatesLoading] = useState(true);

  // Fetch live rates on mount
  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then((data) => {
        setLiveRates(data);
        setRatesLoading(false);
      })
      .catch(() => setRatesLoading(false));
  }, []);

  useEffect(() => {
    onCountryChange?.(country);
    setReceiveCurrency(RECEIVE_MAP[country.id]?.[0] ?? country.currency);
  }, [country, onCountryChange]);

  const receive = useMemo(
    () =>
      computeReceive(amount, sendCurrency, receiveCurrency, country, liveRates),
    [amount, sendCurrency, receiveCurrency, country, liveRates],
  );

  const selectedMethod = method ?? methods[0];
  // invalid only when a method is selected
  const invalidAmount =
    Boolean(method) &&
    (amount < selectedMethod.min || amount > selectedMethod.max);
  // show range helper when amount is outside the default/selected method limits
  const rangeError =
    amount > 0 && (amount < selectedMethod.min || amount > selectedMethod.max);
  const disabled = !method || invalidAmount || amount <= 0 || rangeError;

  const displayRate = getDisplayRate(
    sendCurrency,
    receiveCurrency,
    country,
    liveRates,
  );

  // Clear selected method if current amount is invalid for it
  useEffect(() => {
    if (method && (amount < method.min || amount > method.max)) {
      setMethod(null);
    }
  }, [amount, method]);

  return (
    <>
      <Panel>
        <AnimatePresence initial={false} mode="wait">
          {view === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Stack spacing={2}>
                {/* Destination country */}
                <PickRow onClick={() => setView("country")}>
                  <Stack direction="row" spacing={1.4} alignItems="center">
                    <FlagBadge id={country.id} />
                    <Box textAlign="left">
                      <Typography color="text.secondary" fontSize={14}>
                        {t("transferCountry")}
                      </Typography>
                      <Typography fontWeight={900}>
                        {country.nativeName}
                      </Typography>
                    </Box>
                  </Stack>
                  <ArrowForwardIos fontSize="small" />
                </PickRow>

                {/* Receive currency selector (shown at top per request) */}
                <Box>
                  <Typography color="text.secondary" fontSize={13} mb={1}>
                    {t("receiveCurrency")}
                    {ratesLoading && (
                      <CircularProgress size={10} sx={{ ml: 1 }} />
                    )}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {(RECEIVE_MAP[country.id] ?? [country.currency]).map(
                      (rc) => (
                        <Chip
                          key={rc}
                          label={rc}
                          onClick={() => setReceiveCurrency(rc)}
                          sx={{
                            fontWeight: 800,
                            bgcolor:
                              receiveCurrency === rc
                                ? "primary.main"
                                : "#2A2B30",
                            color:
                              receiveCurrency === rc
                                ? "white"
                                : "text.secondary",
                            border:
                              receiveCurrency === rc
                                ? "1px solid #1677FF"
                                : "1px solid transparent",
                            cursor: "pointer",
                          }}
                        />
                      ),
                    )}
                  </Stack>
                </Box>

                {/* Amount fields */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  alignItems="center"
                >
                  <TextField
                    fullWidth
                    label={`${t("sendAmount")} (${sendCurrency})`}
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    error={rangeError || invalidAmount}
                    InputProps={{
                      endAdornment:
                        rangeError || invalidAmount ? (
                          <InputAdornment position="end">
                            <Error color="error" />
                          </InputAdornment>
                        ) : null,
                    }}
                  />
                  <Tooltip title={t("swapCurrencies") ?? "Swap"}>
                    <span>
                      <IconButton
                        disabled
                        sx={{
                          bgcolor: "#25262A",
                          color: "white",
                          borderRadius: 1,
                          minWidth: 42,
                          height: 42,
                        }}
                      >
                        <SwapHoriz />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <TextField
                    fullWidth
                    label={`${t("receiveAmount")} (${receiveCurrency})`}
                    value={`${receive.toLocaleString()} ${receiveCurrency}`}
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
                {rangeError && (
                  <Box
                    sx={{
                      color: "error.main",
                      fontSize: 13,
                      mt: 0.5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {`${t("limitMessage")}: ${selectedMethod.min} – ${selectedMethod.max.toLocaleString()} ${sendCurrency}`}
                  </Box>
                )}

                {/* Transfer method */}
                <PickRow
                  onClick={() => setView("method")}
                  disabled={amount <= 0 || rangeError}
                >
                  <Stack direction="row" spacing={1.4} alignItems="center">
                    {method ? (
                      <FlagBadge id={country.id} />
                    ) : (
                      <Avatar sx={{ bgcolor: "#33343A" }}>
                        <CurrencyExchange />
                      </Avatar>
                    )}
                    <Box textAlign="left">
                      <Typography color="text.secondary" fontSize={14}>
                        {t("transferMethod")}
                      </Typography>
                      <Typography
                        fontWeight={900}
                        color={method ? "white" : "text.secondary"}
                      >
                        {method?.title ?? t("transferMethod")}
                      </Typography>
                    </Box>
                  </Stack>
                  {amount <= 0 || rangeError ? (
                    <Lock fontSize="small" />
                  ) : (
                    <ArrowForwardIos fontSize="small" />
                  )}
                </PickRow>

                {/* Rate summary */}
                {method && (
                  <Box sx={{ bgcolor: "#1A1B1F", borderRadius: 2, p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">
                        {t("exchangeRate")}
                      </Typography>
                      <Typography fontWeight={900} fontSize={14}>
                        {displayRate}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">{t("fee")}</Typography>
                      <Typography fontWeight={900}>
                        {method.fee} {sendCurrency}
                        {method.feePercent ? ` + ${method.feePercent}%` : ""}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">
                        {t("total")}
                      </Typography>
                      <Typography fontWeight={900} color="primary.main">
                        {(
                          amount +
                          method.fee +
                          (method.feePercent
                            ? Math.ceil((amount * method.feePercent) / 100)
                            : 0)
                        ).toLocaleString()}{" "}
                        {sendCurrency}
                      </Typography>
                    </Stack>
                  </Box>
                )}

                <Button
                  variant="contained"
                  disabled={disabled}
                  size="large"
                  onClick={() => setWizardOpen(true)}
                >
                  {t("startTransfer")}
                </Button>

                <Typography align="center" fontSize={12}>
                  <Box component="span" color="primary.main">
                    {t("license")}
                  </Box>
                </Typography>
              </Stack>
            </motion.div>
          )}
          {view === "country" && (
            <motion.div
              key="country"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.18 }}
            >
              <CountryInline
                onBack={() => setView("main")}
                onSelect={(item) => {
                  setCountry(item);
                  setMethod(null);
                  setView("main");
                }}
              />
            </motion.div>
          )}
          {view === "method" && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.18 }}
            >
              <MethodInline
                onBack={() => setView("main")}
                onSelect={(item) => {
                  setMethod(item);
                  setView("main");
                }}
                country={country}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Panel>
      {method && (
        <TransferWizard
          open={wizardOpen}
          onClose={() => setWizardOpen(false)}
          payload={{
            country,
            method,
            amount,
            receive,
            receiveCurrency,
            sendCurrency,
          }}
        />
      )}
    </>
  );
}

function CountryModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (c: Country) => void;
}) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const filtered = countries.filter(
    (c) =>
      c.id !== "russia" &&
      `${c.name} ${c.nativeName}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      hideBackdrop
      PaperProps={{ sx: selectorPaperSx }}
    >
      <SelectorHeader
        title={t("countryModalTitle")}
        subtitle={t("countrySubtitle")}
        onBack={onClose}
      />
      <Box sx={{ px: 0, pt: 3 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={selectorSearchSx}
        />
      </Box>
      <Stack
        spacing={1.6}
        sx={{ px: 0, pt: 2.5, pb: 4, maxHeight: 300, overflowY: "auto" }}
      >
        {filtered.map((item) => (
          <Button
            key={item.id}
            onClick={() => onSelect(item)}
            sx={{
              justifyContent: "flex-start",
              color: "white",
              minHeight: 56,
              p: 0,
              borderRadius: 3,
            }}
          >
            <Stack direction="row" spacing={1.6} alignItems="center">
              <FlagBadge id={item.id} size={52} rounded={18} />
              <Box textAlign="left">
                <Typography color="text.secondary" fontSize={14}>
                  {item.name}
                </Typography>
                <Typography fontWeight={900} fontSize={18}>
                  {item.nativeName}
                </Typography>
              </Box>
            </Stack>
          </Button>
        ))}
        {!filtered.length && (
          <Alert severity="info">{t("countryNotFound")}</Alert>
        )}
      </Stack>
    </Dialog>
  );
}

function MethodModal({
  open,
  onClose,
  onSelect,
  country,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (m: TransferMethod) => void;
  country: Country;
}) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "best" | "cash">("all");
  const filtered = methods.filter((item) => {
    const byQuery = `${item.title} ${item.subtitle} ${item.tag}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const byFilter =
      filter === "all" ||
      (filter === "best" && item.id === "bank") ||
      (filter === "cash" && ["bank", "cash"].includes(item.id));
    return byQuery && byFilter;
  });
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      hideBackdrop
      PaperProps={{ sx: selectorPaperSx }}
    >
      <SelectorHeader
        title={t("methodModalTitle")}
        subtitle={t("methodSubtitle")}
        onBack={onClose}
      />
      <Box sx={{ px: 4, pt: 3 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={selectorSearchSx}
        />
      </Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{ px: 4, pt: 2, pb: 1 }}
        flexWrap="wrap"
        useFlexGap
      >
        {(["all", "best", "cash"] as const).map((f) => (
          <Chip
            key={f}
            label={
              f === "all"
                ? t("all")
                : f === "best"
                  ? t("bestRate")
                  : t("cashPickup")
            }
            onClick={() => setFilter(f)}
            sx={{
              bgcolor: filter === f ? "white" : "#28292E",
              color: filter === f ? "#111" : "white",
              fontWeight: 900,
            }}
          />
        ))}
      </Stack>
      <Stack
        spacing={1.5}
        sx={{ px: 4, py: 2, maxHeight: 300, overflowY: "auto" }}
      >
        {filtered.map((item) => (
          <Box
            key={item.id}
            sx={{ bgcolor: "#232428", borderRadius: 3, p: 2.5 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row" spacing={1.2} alignItems="center">
                <FlagBadge id={country.id} size={44} rounded={15} />
                <Box>
                  <Typography fontWeight={900}>{item.title}</Typography>
                  <Typography color="text.secondary">
                    {item.subtitle}
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="contained"
                onClick={() => onSelect(item)}
                sx={{ minHeight: 36, borderRadius: 3 }}
              >
                {t("select")}
              </Button>
            </Stack>
            <Divider sx={{ my: 1.4 }} />
            <Box
              sx={{
                bgcolor: "#2A2010",
                color: "#FFB347",
                borderRadius: 2,
                p: 1.2,
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              {t("limitMessage")}: {item.min.toLocaleString()} –{" "}
              {item.max.toLocaleString()} BDT/RUB/USD
            </Box>
          </Box>
        ))}
        {!filtered.length && (
          <Alert severity="info">{t("methodNotFound")}</Alert>
        )}
      </Stack>
    </Dialog>
  );
}

const selectorPaperSx = {
  position: { xs: "fixed", md: "absolute" },
  top: { xs: 24, md: 96 },
  right: { xs: 16, md: 38, xl: 150 },
  left: { xs: 16, md: "auto" },
  width: { xs: "calc(100% - 32px)", sm: 510 },
  maxWidth: "none",
  m: 0,
  bgcolor: "#121314",
  color: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 24px 80px rgba(0,0,0,.48)",
  backgroundImage: "none",
};

const selectorSearchSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#252525",
    borderRadius: "16px",
    height: 48,
    fontSize: 18,
    "& fieldset": { border: 0 },
  },
};

function SelectorHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ p: 0, pb: "10px", borderBottom: "1px solid rgba(255,255,255,.08)" }}
    >
      <IconButton
        onClick={onBack}
        sx={{
          width: 52,
          height: 52,
          borderRadius: "14px",
          bgcolor: "#252525",
          color: "white",
        }}
      >
        <ArrowBackIosNew fontSize="small" />
      </IconButton>
      <Box>
        <Typography fontWeight={900} fontSize={20}>
          {title}
        </Typography>
        <Typography color="text.secondary" fontSize={16}>
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
}

function TransferWizard({
  open,
  onClose,
  payload,
}: {
  open: boolean;
  onClose: () => void;
  payload: WizardPayload;
}) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("card");
  const [done, setDone] = useState(false);
  const [accepted, setAccepted] = useState(true);
  const [form, setForm] = useState({
    card: "",
    recipientLastName: "",
    recipientFirstName: "",
    senderLastName: "",
    senderFirstName: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const cardDigits = form.card.replace(/\D/g, "");
  const phoneDigits = form.phone.replace(/\D/g, "");
  const isStepOneValid = Boolean(payment);
  const isStepTwoValid =
    cardDigits.length >= 12 &&
    form.recipientLastName.trim().length > 1 &&
    form.recipientFirstName.trim().length > 1 &&
    form.senderLastName.trim().length > 1 &&
    form.senderFirstName.trim().length > 1 &&
    phoneDigits.length >= 10 &&
    accepted;
  const update = (key: keyof typeof form, value: string) =>
    setForm((c) => ({ ...c, [key]: value }));
  const close = () => {
    setStep(1);
    setDone(false);
    setAccepted(true);
    setSubmitted(false);
    onClose();
  };

  const totalFee =
    payload.method.fee +
    (payload.method.feePercent
      ? Math.ceil((payload.amount * payload.method.feePercent) / 100)
      : 0);

  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#121316",
          borderRadius: { xs: 0, sm: 7 },
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {step > 1 && !done && (
              <IconButton
                onClick={() => setStep(1)}
                sx={{ bgcolor: "#25262A" }}
              >
                <ArrowBackIosNew fontSize="small" />
              </IconButton>
            )}
            <Box>
              <Typography fontWeight={900} fontSize={26}>
                {done
                  ? t("transferCreated")
                  : step === 1
                    ? t("stepOneTitle")
                    : t("stepTwoTitle")}
              </Typography>
              <Typography color="text.secondary">
                {t("checkBeforeNext")}
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={close}>
            <Close />
          </IconButton>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={done ? 100 : step * 50}
          sx={{ mt: 2, height: 8, borderRadius: 99 }}
        />
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        {done ? (
          <Stack spacing={2.5} alignItems="center" textAlign="center" py={5}>
            <CheckCircle color="success" sx={{ fontSize: 76 }} />
            <Typography fontWeight={900} fontSize={30}>
              {t("readyTitle")}
            </Typography>
            <Typography color="text.secondary" maxWidth={520}>
              {t("readyText")}
            </Typography>
            <Button variant="contained" onClick={close} sx={{ px: 5 }}>
              {t("done")}
            </Button>
          </Stack>
        ) : step === 1 ? (
          <Stack spacing={2.5}>
            <SummaryCard payload={payload} totalFee={totalFee} />
            <Typography fontWeight={900} fontSize={20}>
              {t("paymentMethod")}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              {[
                { id: "card", title: t("card"), icon: <CreditCard /> },
                { id: "sbp", title: "SBP / BKASH", icon: <AccountBalance /> },
                { id: "pay", title: "Pay", icon: <Wallet /> },
              ].map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setPayment(item.id)}
                  startIcon={item.icon}
                  sx={{
                    flex: 1,
                    minHeight: 72,
                    bgcolor: payment === item.id ? "primary.main" : "#232428",
                    color: "white",
                    border:
                      payment === item.id
                        ? "1px solid #1677FF"
                        : "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
            <Alert severity="info">{t("helperInfo")}</Alert>
            <Button
              variant="contained"
              disabled={!isStepOneValid}
              onClick={() => setStep(2)}
            >
              {t("next")}
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2.5}>
            <SummaryCard payload={payload} dense totalFee={totalFee} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              <TextField
                label={t("recipientCard")}
                value={form.card}
                onChange={(e) => update("card", e.target.value)}
                error={submitted && cardDigits.length < 12}
              />
              <TextField
                label={t("senderPhone")}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                error={submitted && phoneDigits.length < 10}
              />
              <TextField
                label={t("recipientLastName")}
                value={form.recipientLastName}
                onChange={(e) => update("recipientLastName", e.target.value)}
                error={submitted && form.recipientLastName.trim().length < 2}
              />
              <TextField
                label={t("recipientFirstName")}
                value={form.recipientFirstName}
                onChange={(e) => update("recipientFirstName", e.target.value)}
                error={submitted && form.recipientFirstName.trim().length < 2}
              />
              <TextField
                label={t("senderLastName")}
                value={form.senderLastName}
                onChange={(e) => update("senderLastName", e.target.value)}
                error={submitted && form.senderLastName.trim().length < 2}
              />
              <TextField
                label={t("senderFirstName")}
                value={form.senderFirstName}
                onChange={(e) => update("senderFirstName", e.target.value)}
                error={submitted && form.senderFirstName.trim().length < 2}
              />
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
              }
              label={t("confirmData")}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                onClick={() => setStep(1)}
                sx={{ bgcolor: "#232428", color: "white" }}
              >
                {t("back")}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setSubmitted(true);
                  if (isStepTwoValid) setDone(true);
                }}
              >
                {t("confirmTransfer")}
              </Button>
            </Stack>
            {submitted && !isStepTwoValid && (
              <Alert severity="error">{t("formError")}</Alert>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SummaryCard({
  payload,
  dense = false,
  totalFee,
}: {
  payload: WizardPayload;
  dense?: boolean;
  totalFee: number;
}) {
  const { t } = useLanguage();
  return (
    <Box sx={{ bgcolor: "#232428", borderRadius: 1, p: dense ? 2.5 : 3.5 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <FlagBadge id={payload.country.id} size={48} rounded={16} />
          <Box>
            <Typography color="text.secondary">{t("direction")}</Typography>
            <Typography fontWeight={900}>
              {payload.country.nativeName} / {payload.method.title}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Box>
            <Typography color="text.secondary">{t("sending")}</Typography>
            <Typography fontWeight={900}>
              {payload.amount.toLocaleString()} {payload.sendCurrency}
            </Typography>
          </Box>
          <Box>
            <Typography color="text.secondary">{t("receiving")}</Typography>
            <Typography fontWeight={900}>
              {payload.receive.toLocaleString()} {payload.receiveCurrency}
            </Typography>
          </Box>
          <Box>
            <Typography color="text.secondary">{t("fee")}</Typography>
            <Typography fontWeight={900}>
              {totalFee} {payload.sendCurrency}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
