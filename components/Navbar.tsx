"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const navSections = ["about", "experience", "projects", "skills", "contact"];

export default function Navbar() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const cvHref =
    language === "fr" ? "/Taha_ElBah_CVfr%20(1).pdf" : "/TahaElBah_Resume_eng.pdf";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const pos = window.scrollY + 140;
      let current = "";
      for (const id of navSections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,padding] duration-300 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-sm border-b border-rule py-3"
          : "border-b border-transparent py-5"
      }`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="shell flex items-center justify-between gap-6">
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl text-ink leading-none cursor-pointer shrink-0"
          aria-label="Back to top"
        >
          Taha El Bah<span className="text-accent">.</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navSections.map((id, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-current={activeSection === id ? "true" : undefined}
              className="group flex items-baseline gap-1.5 cursor-pointer"
            >
              <span className="font-mono text-[0.62rem] text-ink-faint tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`label transition-colors duration-200 ${
                  activeSection === id
                    ? "text-ink u-link-static"
                    : "text-ink-muted group-hover:text-ink"
                }`}
              >
                {t(`nav.${id}`)}
              </span>
            </button>
          ))}
        </div>

        {/* Right cluster */}
        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          <a
            href={cvHref}
            download
            className="label px-4 py-2 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-200"
          >
            {t("nav.downloadCV")} ↓
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ink p-1.5 -mr-1.5 cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-paper border-t border-rule mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shell py-4 flex flex-col">
              {navSections.map((id, i) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="flex items-baseline gap-3 py-3 rule-b text-left cursor-pointer"
                >
                  <span className="font-mono text-[0.62rem] text-ink-faint tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label text-ink">{t(`nav.${id}`)}</span>
                </button>
              ))}
              <div className="flex items-center justify-between pt-4">
                <LanguageSwitcher />
                <a
                  href={cvHref}
                  download
                  className="label px-4 py-2 border border-ink text-ink"
                >
                  {t("nav.downloadCV")} ↓
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
