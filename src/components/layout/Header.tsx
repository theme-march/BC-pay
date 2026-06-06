"use client";

import { useState } from "react";
import { Check, KeyboardArrowDown } from "@mui/icons-material";
import { Logo } from "@/components/common/Logo";
import { FlagBadge } from "@/components/common/FlagBadge";
import { languageOptions, useLanguage } from "@/i18n/LanguageContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const { option, setLanguage } = useLanguage();

  return (
    <header className="container">
      <div className="hero-header">
        <Logo />
        <div className="header-actions">
          <div className="language-dropdown">
            <button
              type="button"
              className="locale-btn"
              onClick={() => setOpen((value) => !value)}
            >
              <FlagBadge id={option.flag} size={28} rounded={14} />
              <span>{option.short}</span>
              <KeyboardArrowDown />
            </button>
            {open && (
              <ul className="locale-menu">
                {languageOptions.map((item) => (
                  <li key={item.code}>
                    <button
                      type="button"
                      className={`locale-option ${item.code === option.code ? "active" : ""}`}
                      onClick={() => {
                        setLanguage(item.code);
                        setOpen(false);
                      }}
                    >
                      <FlagBadge id={item.flag} size={24} rounded={12} />
                      <span>{item.label}</span>
                      {item.code === option.code && <Check fontSize="small" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
