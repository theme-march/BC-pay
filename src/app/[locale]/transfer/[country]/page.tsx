"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { CreditCard, QrCode2, ShieldOutlined } from "@mui/icons-material";
import { useLanguage } from "@/i18n/LanguageContext";
import { countries, methods } from "@/mock/data";

const locales = ["en", "bg", "sl", "in"];
const nationalCountryOptions = ["Bangladesh", "India", "Pakistan", "Sri Lanka"];
const TRANSFER_WIZARD_STATE_KEY = "transferWizardState";

type Step = "details" | "confirm" | "payment";
type PaymentMode = "sbp" | "card";

type TransferDraft = {
  locale: string;
  countryId: string;
  amount: number;
  receive: number;
  sendCurrency: string;
  receiveCurrency: string;
  methodId: string;
  methodTitle?: string;
  rateDisplay?: string;
  totalAmount?: number;
  feeAmount?: number;
  createdAt: number;
};

type FormState = {
  receiverFirstName: string;
  receiverLastName: string;
  receiverMiddleName: string;
  receiverPhone: string;
  countryOfDocumentIssue: string;
  passportSeries: string;
  passportNumber: string;
  divisionCode: string;
  issuingAuthority: string;
  dateOfBirth: string;
  countryOfResidence: string;
  citizenship: string;
  countryOfBirth: string;
  placeOfBirth: string;
  countryOfRegistration: string;
  placeOfRegistration: string;
  senderFirstName: string;
  senderLastName: string;
  senderMiddleName: string;
  senderPhone: string;
};

type TransferWizardState = {
  countryId: string;
  step: Step;
  passportType: "russian" | "national";
  paymentMode: PaymentMode;
  gender: "male" | "female" | null;
  consentChecked: boolean;
  formState: FormState;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
};

const initialFormState: FormState = {
  receiverFirstName: "",
  receiverLastName: "",
  receiverMiddleName: "",
  receiverPhone: "",
  countryOfDocumentIssue: "",
  passportSeries: "",
  passportNumber: "",
  divisionCode: "",
  issuingAuthority: "",
  dateOfBirth: "",
  countryOfResidence: "",
  citizenship: "",
  countryOfBirth: "",
  placeOfBirth: "",
  countryOfRegistration: "",
  placeOfRegistration: "",
  senderFirstName: "",
  senderLastName: "",
  senderMiddleName: "",
  senderPhone: "",
};

export default function TransferCountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [paramData, setParamData] = useState<{ locale: string; country: string } | null>(null);
  const [draft, setDraft] = useState<TransferDraft | null>(null);
  const [step, setStep] = useState<Step>("details");
  const [passportType, setPassportType] = useState<"russian" | "national">("russian");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("sbp");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      const { locale, country: countryId } = resolvedParams;

      if (!locales.includes(locale)) {
        notFound();
      }

      const country = countries.find((item) => item.id === countryId);
      if (!country) {
        notFound();
      }

      const transferDraftRaw = window.sessionStorage.getItem("transferDraft");
      if (!transferDraftRaw) {
        router.replace(`/${locale}`);
        return;
      }

      try {
        const parsedDraft = JSON.parse(transferDraftRaw) as Partial<TransferDraft>;
        const invalidDraft =
          parsedDraft.countryId !== countryId ||
          typeof parsedDraft.amount !== "number" ||
          parsedDraft.amount <= 0 ||
          typeof parsedDraft.receive !== "number" ||
          !parsedDraft.methodId;

        if (invalidDraft) {
          router.replace(`/${locale}`);
          return;
        }

        const draftAmount = parsedDraft.amount as number;
        const draftReceive = parsedDraft.receive as number;
        let savedWizardState: TransferWizardState | null = null;

        try {
          const wizardRaw = window.sessionStorage.getItem(TRANSFER_WIZARD_STATE_KEY);
          const parsedWizard = wizardRaw ? (JSON.parse(wizardRaw) as TransferWizardState) : null;
          savedWizardState = parsedWizard?.countryId === countryId ? parsedWizard : null;
        } catch {
          savedWizardState = null;
        }

        const selectedMethod = methods.find((item) => item.id === parsedDraft.methodId) ?? methods[0];
        const feeAmount =
          parsedDraft.feeAmount ??
          (selectedMethod.fee +
            (selectedMethod.feePercent
              ? Math.ceil((draftAmount * selectedMethod.feePercent) / 100)
              : 0));

        window.sessionStorage.setItem(
          "transferDraft",
          JSON.stringify({
            ...parsedDraft,
            locale,
            countryId,
            amount: draftAmount,
            receive: draftReceive,
            methodId: selectedMethod.id,
            feeAmount,
          }),
        );

        setDraft({
          locale,
          countryId,
          amount: draftAmount,
          receive: draftReceive,
          sendCurrency: parsedDraft.sendCurrency ?? "RUB",
          receiveCurrency: parsedDraft.receiveCurrency ?? country.currency,
          methodId: selectedMethod.id,
          methodTitle: parsedDraft.methodTitle ?? selectedMethod.title,
          rateDisplay:
            parsedDraft.rateDisplay ??
            `1 ${parsedDraft.sendCurrency ?? "RUB"} = ${(draftReceive / draftAmount).toFixed(4)} ${parsedDraft.receiveCurrency ?? country.currency}`,
          totalAmount: parsedDraft.totalAmount ?? (draftAmount + feeAmount),
          feeAmount,
          createdAt: parsedDraft.createdAt ?? Date.now(),
        });
        if (savedWizardState) {
          setStep(savedWizardState.step);
          setPassportType(savedWizardState.passportType);
          setPaymentMode(savedWizardState.paymentMode);
          setGender(savedWizardState.gender);
          setConsentChecked(savedWizardState.consentChecked);
          setFormState(savedWizardState.formState);
          setCardNumber(savedWizardState.cardNumber);
          setCardExpiry(savedWizardState.cardExpiry);
          setCardCvv(savedWizardState.cardCvv);
        }
        setParamData({ locale, country: countryId });
        setMounted(true);
      } catch {
        router.replace(`/${locale}`);
      }
    })();
  }, [params, router]);

  const country = useMemo(() => {
    if (!paramData) return null;
    return countries.find((item) => item.id === paramData.country) ?? null;
  }, [paramData]);

  useEffect(() => {
    const options = passportType === "russian" ? ["Russia"] : nationalCountryOptions;
    setFormState((prev) => ({
      ...prev,
      countryOfDocumentIssue: options.includes(prev.countryOfDocumentIssue) ? prev.countryOfDocumentIssue : options[0],
      countryOfResidence: options.includes(prev.countryOfResidence) ? prev.countryOfResidence : options[0],
      citizenship: options.includes(prev.citizenship) ? prev.citizenship : options[0],
      countryOfBirth: options.includes(prev.countryOfBirth) ? prev.countryOfBirth : options[0],
      countryOfRegistration: options.includes(prev.countryOfRegistration) ? prev.countryOfRegistration : options[0],
    }));
  }, [passportType]);

  useEffect(() => {
    if (!mounted || !paramData || typeof window === "undefined") return;

    const wizardState: TransferWizardState = {
      countryId: paramData.country,
      step,
      passportType,
      paymentMode,
      gender,
      consentChecked,
      formState,
      cardNumber,
      cardExpiry,
      cardCvv,
    };

    window.sessionStorage.setItem(TRANSFER_WIZARD_STATE_KEY, JSON.stringify(wizardState));
  }, [mounted, paramData, step, passportType, paymentMode, gender, consentChecked, formState, cardNumber, cardExpiry, cardCvv]);

  if (!mounted || !paramData || !country || !draft) {
    return null;
  }

  const senderCountryOptions = passportType === "russian" ? ["Russia"] : nationalCountryOptions;
  const stepIndex = step === "details" ? 1 : step === "confirm" ? 2 : 3;
  const progressWidth = `${(stepIndex / 3) * 100}%`;
  const transferTitle = t("transferToCountry").replace("{country}", country.name);
  const methodLabel = draft.methodTitle ?? methods.find((item) => item.id === draft.methodId)?.title ?? draft.methodId;
  const field = (key: keyof FormState) => formState[key];

  const handleFieldChange =
    (key: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextValue = event.target.value;
      setFormState((prev) => ({ ...prev, [key]: nextValue }));
      setFormErrors((prev) => prev.filter((item) => item !== key));
    };

  const validateDetails = () => {
    const requiredFields: Array<keyof FormState> = [
      "receiverFirstName",
      "receiverLastName",
      "receiverPhone",
      "countryOfDocumentIssue",
      "passportSeries",
      "passportNumber",
      "divisionCode",
      "issuingAuthority",
      "dateOfBirth",
      "countryOfResidence",
      "citizenship",
      "countryOfBirth",
      "placeOfBirth",
      "countryOfRegistration",
      "placeOfRegistration",
      "senderFirstName",
      "senderLastName",
      "senderPhone",
    ];

    const missingFields = requiredFields.filter((item) => !formState[item].trim());
    if (!gender) missingFields.push("senderFirstName");
    if (!consentChecked) missingFields.push("senderPhone");

    setFormErrors(missingFields);
    return missingFields.length === 0 && Boolean(gender) && consentChecked;
  };

  const handleDetailsContinue = () => {
    if (!validateDetails()) return;
    setStep("confirm");
  };

  const canSubmitCard = cardNumber.replace(/\s/g, "").length >= 16 && cardExpiry.length >= 5 && cardCvv.length >= 3;

  const summaryRows = [
    { label: t("sendAmount"), value: `${draft.amount.toLocaleString()} ${draft.sendCurrency}` },
    { label: t("amountToReceive"), value: `${draft.receive.toLocaleString()} ${draft.receiveCurrency}` },
    { label: t("fxRate"), value: draft.rateDisplay ?? "-" },
    { label: t("fee"), value: `${(draft.feeAmount ?? 0).toLocaleString()} ${draft.sendCurrency}` },
    { label: t("totalToTransfer"), value: `${(draft.totalAmount ?? draft.amount).toLocaleString()} ${draft.sendCurrency}` },
    { label: t("transferMethodLabel"), value: methodLabel },
    { label: t("recipientFirstNameLabel"), value: field("receiverFirstName") },
    { label: t("recipientLastNameLabel"), value: field("receiverLastName") },
    { label: t("recipientPhoneLabel"), value: field("receiverPhone") },
    { label: t("senderFirstNameLabel"), value: field("senderFirstName") },
    { label: t("senderLastNameLabel"), value: field("senderLastName") },
    { label: t("senderPhoneLabel"), value: field("senderPhone") },
    { label: t("documentType"), value: passportType === "russian" ? t("russianPassport") : t("nationalPassport") },
    { label: t("documentCountry"), value: field("countryOfDocumentIssue") },
  ];

  const stepSubtitle = step === "details" ? t("dataEntry") : step === "confirm" ? t("confirmDetails") : t("paymentDetails");
  const stepCounter = t("stepOf").replace("{current}", String(stepIndex)).replace("{total}", "3");

  return (
    <main className="transfer-route-page">
      <div className="transfer-route-grid transfer-route-grid-wide">
        <section
          className="transfer-route-left"
          style={{
            backgroundImage: country.heroImage,
            backgroundSize: country.backgroundSize || "cover",
            backgroundPosition: country.backgroundPosition || "center",
          }}
        >
          <div className="transfer-route-left-inner">
            <div className="transfer-route-badge">Banking license #3341-K, dated 14.11.2025</div>
            <div className="transfer-route-step-meta">
              <span>{stepSubtitle}</span>
              <strong>{stepCounter}</strong>
            </div>
            <h1 className="transfer-route-title">{transferTitle.toUpperCase()}</h1>
            <p className="transfer-route-subtitle">{stepSubtitle}</p>
            <div className="transfer-route-progress">
              <div className="transfer-route-progress-bar" style={{ width: progressWidth }} />
            </div>
            <div className="transfer-route-hero-globe transfer-route-hero-globe-accent" />
            <div className="transfer-route-side-actions">
              {step === "details" ? (
                <Link href={`/${paramData.locale}`} className="btn btn-light btn-back">
                  {t("backHome")}
                </Link>
              ) : (
                <button type="button" className="btn btn-light btn-back" onClick={() => setStep(step === "payment" ? "confirm" : "details")}>
                  {t("back")}
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="transfer-route-right transfer-route-right-scroll">
          {step === "details" && (
            <>
              <div className="form-block">
                <div className="form-heading">{t("receiver")}</div>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("receiverFirstName") ? "is-invalid" : ""}`} placeholder={t("firstName")} value={field("receiverFirstName")} onChange={handleFieldChange("receiverFirstName")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("receiverLastName") ? "is-invalid" : ""}`} placeholder={t("lastName")} value={field("receiverLastName")} onChange={handleFieldChange("receiverLastName")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <input type="text" className="form-control bg-dark text-white rounded-3 border-0" placeholder={t("middleName")} value={field("receiverMiddleName")} onChange={handleFieldChange("receiverMiddleName")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("receiverPhone") ? "is-invalid" : ""}`} placeholder={t("phoneNumber")} value={field("receiverPhone")} onChange={handleFieldChange("receiverPhone")} />
                  </div>
                </div>
              </div>

              <div className="form-block">
                <div className="form-heading">{t("sender")}</div>
                <div className="btn-transfer-methods mb-4">
                  <button type="button" className={`btn btn-transfer-option ${passportType === "russian" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setPassportType("russian")}>{t("russianPassport")}</button>
                  <button type="button" className={`btn btn-transfer-option ${passportType === "national" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setPassportType("national")}>{t("nationalPassport")}</button>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("countryOfDocumentIssue")}</label>
                    <select className={`form-select bg-dark text-white rounded-3 border-0 ${formErrors.includes("countryOfDocumentIssue") ? "is-invalid" : ""}`} value={field("countryOfDocumentIssue")} onChange={handleFieldChange("countryOfDocumentIssue")}>
                      {senderCountryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("passportSeries")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("passportSeries") ? "is-invalid" : ""}`} placeholder={t("passportSeries")} value={field("passportSeries")} onChange={handleFieldChange("passportSeries")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("passportNumber")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("passportNumber") ? "is-invalid" : ""}`} placeholder={t("passportNumber")} value={field("passportNumber")} onChange={handleFieldChange("passportNumber")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("divisionCode")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("divisionCode") ? "is-invalid" : ""}`} placeholder="000-000" value={field("divisionCode")} onChange={handleFieldChange("divisionCode")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("issuingAuthority")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("issuingAuthority") ? "is-invalid" : ""}`} placeholder={t("enterIssuingAuthority")} value={field("issuingAuthority")} onChange={handleFieldChange("issuingAuthority")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("dateOfBirth")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("dateOfBirth") ? "is-invalid" : ""}`} placeholder="DD.MM.YYYY" value={field("dateOfBirth")} onChange={handleFieldChange("dateOfBirth")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("countryOfResidence")}</label>
                    <select className={`form-select bg-dark text-white rounded-3 border-0 ${formErrors.includes("countryOfResidence") ? "is-invalid" : ""}`} value={field("countryOfResidence")} onChange={handleFieldChange("countryOfResidence")}>
                      {senderCountryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("citizenship")}</label>
                    <select className={`form-select bg-dark text-white rounded-3 border-0 ${formErrors.includes("citizenship") ? "is-invalid" : ""}`} value={field("citizenship")} onChange={handleFieldChange("citizenship")}>
                      {senderCountryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("countryOfBirth")}</label>
                    <select className={`form-select bg-dark text-white rounded-3 border-0 ${formErrors.includes("countryOfBirth") ? "is-invalid" : ""}`} value={field("countryOfBirth")} onChange={handleFieldChange("countryOfBirth")}>
                      {senderCountryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("placeOfBirth")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("placeOfBirth") ? "is-invalid" : ""}`} placeholder={t("enterPlaceOfBirth")} value={field("placeOfBirth")} onChange={handleFieldChange("placeOfBirth")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("countryOfRegistration")}</label>
                    <select className={`form-select bg-dark text-white rounded-3 border-0 ${formErrors.includes("countryOfRegistration") ? "is-invalid" : ""}`} value={field("countryOfRegistration")} onChange={handleFieldChange("countryOfRegistration")}>
                      {senderCountryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("placeOfRegistration")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("placeOfRegistration") ? "is-invalid" : ""}`} placeholder={t("enterPlaceOfRegistration")} value={field("placeOfRegistration")} onChange={handleFieldChange("placeOfRegistration")} />
                  </div>
                  <div className="col-12">
                    <label className="form-label small d-block mb-3">{t("gender")}</label>
                    <div className="btn-gender-group">
                      <button type="button" className={`btn btn-gender ${gender === "male" ? "active" : ""}`} aria-pressed={gender === "male"} onClick={() => setGender("male")}>{t("male")}</button>
                      <button type="button" className={`btn btn-gender ${gender === "female" ? "active" : ""}`} aria-pressed={gender === "female"} onClick={() => setGender("female")}>{t("female")}</button>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("firstName")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("senderFirstName") ? "is-invalid" : ""}`} placeholder={t("firstName")} value={field("senderFirstName")} onChange={handleFieldChange("senderFirstName")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("lastName")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("senderLastName") ? "is-invalid" : ""}`} placeholder={t("lastName")} value={field("senderLastName")} onChange={handleFieldChange("senderLastName")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("middleName")}</label>
                    <input type="text" className="form-control bg-dark text-white rounded-3 border-0" placeholder={t("middleName")} value={field("senderMiddleName")} onChange={handleFieldChange("senderMiddleName")} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small">{t("phoneNumber")}</label>
                    <input type="text" className={`form-control bg-dark text-white rounded-3 border-0 ${formErrors.includes("senderPhone") ? "is-invalid" : ""}`} placeholder={t("enterPhoneWithCode")} value={field("senderPhone")} onChange={handleFieldChange("senderPhone")} />
                  </div>
                </div>
              </div>

              <div className="sender-consent">
                <input type="checkbox" id="dataConsent" className="form-check-input" checked={consentChecked} onChange={(event) => setConsentChecked(event.target.checked)} />
                <label htmlFor="dataConsent" className="form-check-label">{t("personalDataConsent")}</label>
              </div>

              <button type="button" className="btn btn-primary w-100 btn-continue" onClick={handleDetailsContinue}>
                {t("continueToConfirm")}
              </button>
            </>
          )}

          {step === "confirm" && (
            <div className="transfer-white-panel">
              <div className="transfer-confirm-note">
                {t("confirmNote")}
              </div>
              <div className="transfer-summary-grid">
                {summaryRows.map((row) => (
                  <div key={row.label} className="transfer-summary-row">
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                ))}
              </div>
              <div className="transfer-panel-actions">
                <button type="button" className="btn btn-light transfer-soft-btn" onClick={() => setStep("details")}>{t("editData")}</button>
                <button type="button" className="btn btn-primary transfer-cta-btn" onClick={() => setStep("payment")}>{t("continue")}</button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="transfer-white-panel">
              <div className="transfer-payment-header">
                <h2>{t("paymentDetails")}</h2>
                <span>{stepCounter}</span>
              </div>

              <div className="payment-tab-grid">
                <button type="button" className={`payment-tab ${paymentMode === "sbp" ? "active" : ""}`} onClick={() => setPaymentMode("sbp")}>
                  <QrCode2 fontSize="small" />
                  <span>SBP</span>
                </button>
                <button type="button" className={`payment-tab ${paymentMode === "card" ? "active" : ""}`} onClick={() => setPaymentMode("card")}>
                  <CreditCard fontSize="small" />
                  <span>{t("byCard")}</span>
                </button>
              </div>

              {paymentMode === "sbp" ? (
                <div className="payment-surface payment-surface-center">
                  <div className="payment-qr-placeholder">
                    <QrCode2 />
                    <strong>{t("scanSbpQr")}</strong>
                    <span>{`${(draft.totalAmount ?? draft.amount).toLocaleString()} ${draft.sendCurrency}`}</span>
                  </div>
                  <div className="payment-security-line">
                    <ShieldOutlined fontSize="small" /> {t("paymentProtected")}
                  </div>
                </div>
              ) : (
                <div className="payment-surface">
                  <div className="payment-card-grid">
                    <label className="payment-inline-field payment-inline-field-full">
                      <span>{t("cardNumber")}</span>
                      <input type="text" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="0000 0000 0000 0000" />
                    </label>
                    <label className="payment-inline-field">
                      <span>MM/YY</span>
                      <input type="text" value={cardExpiry} onChange={(event) => setCardExpiry(event.target.value)} placeholder="00/00" />
                    </label>
                    <label className="payment-inline-field">
                      <span>CVC/CVV</span>
                      <input type="password" value={cardCvv} onChange={(event) => setCardCvv(event.target.value)} placeholder="000" />
                    </label>
                  </div>
                </div>
              )}

              <div className="transfer-summary-grid transfer-summary-grid-compact">
                {summaryRows.slice(0, 7).map((row) => (
                  <div key={row.label} className="transfer-summary-row">
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                ))}
              </div>

              <div className="transfer-payment-footnote">
                {t("paymentTermsNote")}
              </div>

              <div className="transfer-panel-actions">
                <button type="button" className="btn btn-light transfer-soft-btn" onClick={() => setStep("confirm")}>{t("back")}</button>
                <button type="button" className="btn btn-primary transfer-cta-btn" disabled={paymentMode === "card" && !canSubmitCard}>{t("send")}</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
