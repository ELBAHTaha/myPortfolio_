"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

const i18nInstance = i18next.createInstance();

i18nInstance.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const raw = localStorage.getItem("portfolio-lang");
    const saved: Language = raw === "fr" ? "fr" : "en";
    if (saved !== "en") {
      applyLanguage(saved);
      setLanguageState(saved);
    }
    // Console easter egg
    console.log(
      "%c\n ████████╗ █████╗ ██╗  ██╗ █████╗ \n    ██╔══╝██╔══██╗██║  ██║██╔══██╗\n    ██║   ███████║███████║███████║\n    ██║   ██╔══██║██╔══██║██╔══██║\n    ██║   ██║  ██║██║  ██║██║  ██║\n    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝\n",
      "color: #2563EB; font-weight: bold; font-family: monospace;"
    );
    console.log(
      "%c👋 Hey curious dev! You found the easter egg.",
      "color: #0EA5E9; font-size: 16px; font-weight: bold;"
    );
    console.log(
      "%c🚀 Looking for a talented backend engineer? → tahaelbah@gmail.com",
      "color: #06B6D4; font-size: 14px;"
    );
    console.log(
      "%c🐙 github.com/ELBAHTaha  |  🔗 linkedin.com/in/tahaelbah",
      "color: #10B981; font-size: 13px;"
    );
  }, []);

  function applyLanguage(lang: Language) {
    i18nInstance.changeLanguage(lang);
    document.documentElement.dir = "ltr";
    document.documentElement.lang = lang;
  }

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    applyLanguage(lang);
    localStorage.setItem("portfolio-lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
