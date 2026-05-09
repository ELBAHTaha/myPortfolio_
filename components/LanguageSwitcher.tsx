"use client";

import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/context/LanguageContext";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 glass rounded-full">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`relative px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
            language === lang.code
              ? "text-white"
              : "text-slate-400 hover:text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === lang.code && (
            <motion.span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-sky-500"
              layoutId="lang-pill"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">
            {lang.flag} {lang.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
