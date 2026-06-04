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
      "color: #E5481D; font-weight: bold; font-family: monospace;"
    );
    console.log(
      "%cHey curious dev — you found the easter egg.",
      "color: #16130D; font-size: 15px; font-weight: bold; font-family: monospace;"
    );
    console.log(
      "%cLooking for a backend engineer? → tahaelbah@gmail.com",
      "color: #E5481D; font-size: 13px; font-family: monospace;"
    );
    console.log(
      "%cgithub.com/ELBAHTaha  ·  linkedin.com/in/tahaelbah",
      "color: #6A6157; font-size: 12px; font-family: monospace;"
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
