"use client";

import { useLanguage, type Language } from "@/context/LanguageContext";

const langs: Language[] = ["en", "fr"];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 label" role="group" aria-label="Language">
      {langs.map((code, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="text-ink-faint">/</span>}
          <button
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={language === code}
            className={`cursor-pointer transition-colors duration-200 ${
              language === code
                ? "text-ink u-link-static"
                : "text-ink-faint hover:text-ink"
            }`}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
