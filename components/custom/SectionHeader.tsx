"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/lib/i18n"; // import i18n configuration

interface SectionHeaderProps {
  title: string;
  buttonText?: string;
  href?: string;
}

export default function SectionHeader({
  title,
  buttonText,
  href,
}: SectionHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-10">
      <h2 className="text-3xl font-bold text-slate-800">{t(title)}</h2>

      {buttonText && href && (
        <Link
          href={href}
          className="flex gap-2 items-center border border-[#006680] px-4 py-1.5 rounded-full relative overflow-hidden group hover:text-white font-semibold font-sm text-[#086880] hover:border-red-500 transition-colors duration-300"
        >
          <span className="absolute inset-0 bg-red-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
          <span className="relative z-10 flex gap-2 items-center">
            {buttonText && t(buttonText)} <MoveRight size={14} />
          </span>
        </Link>
      )}
    </div>
  );
}
