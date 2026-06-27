"use client";

import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextLang = i18n.language === "en" ? "bn" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Toggle Language"
      title="Change Language"
    >
      <span className="text-sm text-[#333333] font-medium cursor-pointer hover:text-[#006680]"> {i18n.language === "en" ? "Bangla" : "ইংরেজি"} </span>
      {/* <Globe className="h-5 w-5 cursor-pointer" color="#444444" /> */}
    </button>
  );
};
