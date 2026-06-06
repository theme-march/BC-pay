"use client";

import {
  ArrowBackIosNew,
  ArrowForwardIos,
  CurrencyExchange,
  Lock,
  Search,
  SwapHoriz,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { countries, methods } from "@/mock/data";
import {
  Country,
  CurrencyCode,
  LiveRates,
  SendCurrency,
  TransferMethod,
} from "@/types";
import { FlagBadge } from "@/components/common/FlagBadge";
import { useLanguage } from "@/i18n/LanguageContext";

const HOME_TRANSFER_STATE_KEY = "homeTransferState";
const RECEIVE_MAP: Record<string, CurrencyCode[]> = {
  bangladesh: ["BDT"],
  india: ["INR", "USD"],
  pakistan: ["PKR", "USD"],
  "sri-lanka": ["LKR", "USD"],
};

function getDefaultCountry() {
  return countries.find((c) => c.id !== "russia") || countries[0];
}

function readHomeTransferState() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(HOME_TRANSFER_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

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
    <div className="country-panel">
      <div className="d-flex align-items-center gap-3 pb-3 border-bottom">
        <button
          type="button"
          className="btn btn-outline-secondary btn-icon"
          onClick={onBack}
        >
          <ArrowBackIosNew fontSize="small" />
        </button>
        <div>
          <h3 className="modal-title mb-1">{t("countryModalTitle")}</h3>
          <p className="modal-subtitle mb-0">{t("countrySubtitle")}</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="input-group bg-dark rounded-3 overflow-hidden border border-dark">
          <span className="input-group-text bg-dark border-0 text-muted">
            <Search />
          </span>
          <input
            type="text"
            className="form-control bg-dark border-0 text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
          />
        </div>
      </div>

      <div className="mt-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              className="btn btn-dark w-100 text-start rounded-3 mb-2 py-3 country-item"
              onClick={() => onSelect(item)}
            >
              <div className="d-flex align-items-center gap-3">
                <FlagBadge id={item.id} size={52} rounded={18} />
                <div>
                  <div className="country-item-meta small">{item.name}</div>
                  <div className="country-item-title fw-bold">
                    {item.nativeName}
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="alert alert-info mb-0">{t("countryNotFound")}</div>
        )}
      </div>
    </div>
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
    <div className="country-panel">
      <div className="d-flex align-items-center gap-3 pb-3 border-bottom">
        <button
          type="button"
          className="btn btn-outline-secondary btn-icon"
          onClick={onBack}
        >
          <ArrowBackIosNew fontSize="small" />
        </button>
        <div>
          <h3 className="modal-title mb-1">{t("methodModalTitle")}</h3>
          <p className="modal-subtitle mb-0">{t("methodSubtitle")}</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="input-group bg-dark rounded-3 overflow-hidden border border-dark">
          <span className="input-group-text bg-dark border-0 text-muted">
            <Search />
          </span>
          <input
            type="text"
            className="form-control bg-dark border-0 text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
          />
        </div>
      </div>

      <div className="pick-chip-group mt-3">
        {(["all", "best", "cash"] as const).map((f) => (
          <button
            type="button"
            key={f}
            className={`select-chip ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all"
              ? t("all")
              : f === "best"
                ? t("bestRate")
                : t("cashPickup")}
          </button>
        ))}
      </div>

      <div className="mt-3 bank-transfer-list">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div key={item.id} className="card card-dark mb-3">
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <FlagBadge id={country.id} size={44} rounded={15} />
                    <div>
                      <div className="method-card-title fw-bold">
                        {item.title}
                      </div>
                      <div className="method-card-subtitle small">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelect(item)}
                  >
                    {t("select")}
                  </button>
                </div>
                <div className="border-top mt-3 pt-3 transfer-card-badge">
                  {t("limitMessage")} : {item.min.toLocaleString()} –{" "}
                  {item.max.toLocaleString()} BDT/RUB/USD
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info mb-0">{t("methodNotFound")}</div>
        )}
      </div>
    </div>
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

  if (to === country.currency) {
    if (from === "RUB") return Math.round(amount * country.rateFromRub);
    if (from === "USD") return Math.round(amount * country.rateFromUsd);
    if (from === "BDT") return Math.round(amount * country.rateFromBdt);
    if (from === "EUR") return Math.round(amount * country.rateFromUsd * 1.08);
    return Math.round(amount * country.rateFromUsd);
  }

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
  const defaultCountry = getDefaultCountry();
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [method, setMethod] = useState<TransferMethod | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [sendCurrency, setSendCurrency] = useState<SendCurrency>("RUB");
  const [view, setView] = useState<"main" | "country" | "method">("main");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";
  const [receiveCurrency, setReceiveCurrency] = useState<CurrencyCode>(
    RECEIVE_MAP[defaultCountry.id]?.[0] ?? defaultCountry.currency,
  );
  const [liveRates, setLiveRates] = useState<LiveRates | null>(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [isStateRestored, setIsStateRestored] = useState(false);

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
    const savedHomeState = readHomeTransferState();

    if (!savedHomeState) {
      setIsStateRestored(true);
      return;
    }

    const restoredCountry =
      countries.find((item) => item.id === savedHomeState.countryId) ??
      defaultCountry;
    const nextReceiveOptions = RECEIVE_MAP[restoredCountry.id] ?? [
      restoredCountry.currency,
    ];

    setCountry(restoredCountry);
    setMethod(
      methods.find((item) => item.id === savedHomeState.methodId) ?? null,
    );
    setAmount(
      typeof savedHomeState.amount === "number" ? savedHomeState.amount : 0,
    );
    setSendCurrency(savedHomeState.sendCurrency ?? "RUB");
    setReceiveCurrency(
      nextReceiveOptions.includes(savedHomeState.receiveCurrency)
        ? savedHomeState.receiveCurrency
        : nextReceiveOptions[0],
    );
    setIsStateRestored(true);
  }, [defaultCountry]);

  useEffect(() => {
    onCountryChange?.(country);
    setReceiveCurrency((currentValue) => {
      const nextAllowed = RECEIVE_MAP[country.id] ?? [country.currency];
      return nextAllowed.includes(currentValue) ? currentValue : nextAllowed[0];
    });
  }, [country, onCountryChange]);

  useEffect(() => {
    if (typeof window === "undefined" || !isStateRestored) return;

    window.sessionStorage.setItem(
      HOME_TRANSFER_STATE_KEY,
      JSON.stringify({
        countryId: country.id,
        methodId: method?.id ?? null,
        amount,
        sendCurrency,
        receiveCurrency,
      }),
    );
  }, [
    country.id,
    method,
    amount,
    sendCurrency,
    receiveCurrency,
    isStateRestored,
  ]);

  const receive = useMemo(
    () =>
      computeReceive(amount, sendCurrency, receiveCurrency, country, liveRates),
    [amount, sendCurrency, receiveCurrency, country, liveRates],
  );

  const selectedMethod = method ?? methods[0];
  const invalidAmount =
    Boolean(method) &&
    (amount < selectedMethod.min || amount > selectedMethod.max);
  const rangeError =
    amount > 0 && (amount < selectedMethod.min || amount > selectedMethod.max);
  const disabled = !method || invalidAmount || amount <= 0 || rangeError;

  const displayRate = getDisplayRate(
    sendCurrency,
    receiveCurrency,
    country,
    liveRates,
  );

  const handleStartTransfer = () => {
    const feeAmount =
      selectedMethod.fee +
      (selectedMethod.feePercent
        ? Math.ceil((amount * selectedMethod.feePercent) / 100)
        : 0);

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "transferDraft",
        JSON.stringify({
          locale: currentLocale,
          countryId: country.id,
          amount,
          receive,
          sendCurrency,
          receiveCurrency,
          methodId: selectedMethod.id,
          methodTitle: selectedMethod.title,
          rateDisplay: displayRate,
          feeAmount,
          totalAmount: amount + feeAmount,
          createdAt: Date.now(),
        }),
      );
    }

    router.push(`/${currentLocale}/transfer/${country.id}`);
  };

  useEffect(() => {
    if (method && (amount < method.min || amount > method.max)) {
      setMethod(null);
    }
  }, [amount, method]);

  return (
    <>
      <div className="transfer-panel">
        {view === "main" && (
          <div key="main">
            <div className="transfer-row">
              <div className="transfer-top d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
                <button
                  type="button"
                  className="pick-row flex-grow-1 text-start"
                  onClick={() => setView("country")}
                >
                  <div className="pick-info">
                    <FlagBadge id={country.id} />
                    <div>
                      <div className="transfer-meta-label small">
                        {t("transferCountry")}
                      </div>
                      <div className="fw-bold">{country.nativeName}</div>
                    </div>
                  </div>
                  <ArrowForwardIos fontSize="small" />
                </button>
              </div>

              <div>
                <div className="currency-pill-group">
                  {(RECEIVE_MAP[country.id] ?? [country.currency]).map((rc) => (
                    <button
                      key={rc}
                      type="button"
                      className={`currency-pill ${receiveCurrency === rc ? "active" : ""}`}
                      onClick={() => setReceiveCurrency(rc)}
                    >
                      {rc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="amount-card-grid">
                <div className="input-card input-card-plain">
                  <div className="input-label">{t("sendAmount")}</div>
                  <div className="amount-input-inline">
                    <input
                      type="number"
                      min="0"
                      className="form-control input-value input-value-plain"
                      value={amount || ""}
                      onChange={(e) => setAmount(Number(e.target.value) || 0)}
                      placeholder="0"
                    />
                    <span className="amount-currency-tag">{sendCurrency}</span>
                  </div>
                </div>

                <div className="input-card input-card-plain">
                  <div className="input-label">{t("receiveAmount")}</div>
                  <div className="amount-static-value">
                    <span>{receive.toLocaleString() || 0}</span>
                    <span className="amount-currency-tag">
                      {receiveCurrency}
                    </span>
                  </div>
                </div>
              </div>

              {rangeError && (
                <div className="text-helper">{`${t("limitMessage")}: ${selectedMethod.min} – ${selectedMethod.max.toLocaleString()} ${sendCurrency}`}</div>
              )}
            </div>

            <div className="transfer-group transfer-method-group">
              <button
                type="button"
                className="pick-row transfer-method-row"
                disabled={amount <= 0 || rangeError}
                onClick={() => setView("method")}
              >
                <span className="transfer-method-icon">
                  <SwapHoriz />
                </span>
                <span className="transfer-method-main">
                  <span className="transfer-method-title">
                    {t("transferMethod")}
                  </span>
                  {method ? (
                    <span className="transfer-method-selected">
                      {method.title}
                    </span>
                  ) : null}
                </span>
                <span className="transfer-method-meta">
                  {amount <= 0 || rangeError ? <Lock fontSize="small" /> : null}
                  <ArrowForwardIos fontSize="small" />
                </span>
              </button>
            </div>

            {method && (
              <div className="transfer-group transfer-rate-card">
                <div className="row gx-3 gy-3">
                  <div className="col-12">
                    <div className="d-flex justify-content-between">
                      <div className="summary-label">{t("exchangeRate")}</div>
                      <div className="fw-bold small">{displayRate}</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-content-between">
                      <div className="summary-label">{t("fee")}</div>
                      <div className="fw-bold">
                        {method.fee} {sendCurrency}
                        {method.feePercent ? ` + ${method.feePercent}%` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-content-between">
                      <div className="summary-label">{t("total")}</div>
                      <div className="fw-bold text-primary">
                        {(
                          amount +
                          method.fee +
                          (method.feePercent
                            ? Math.ceil((amount * method.feePercent) / 100)
                            : 0)
                        ).toLocaleString()}{" "}
                        {sendCurrency}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary btn-transfer"
              disabled={disabled}
              onClick={handleStartTransfer}
            >
              {t("startTransfer")}
            </button>

            <div className="transfer-info">
              <span>{t("license")}</span>
            </div>
          </div>
        )}
        {view === "country" && (
          <div key="country">
            <CountryInline
              onBack={() => setView("main")}
              onSelect={(item) => {
                setCountry(item);
                setMethod(null);
                setView("main");
              }}
            />
          </div>
        )}
        {view === "method" && (
          <div key="method">
            <MethodInline
              onBack={() => setView("main")}
              onSelect={(item) => {
                setMethod(item);
                setView("main");
              }}
              country={country}
            />
          </div>
        )}
      </div>
    </>
  );
}
