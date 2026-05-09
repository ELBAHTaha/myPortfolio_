"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Download, Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const navSections = ["about", "projects", "skills", "experience", "contact"];

export default function Navbar() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const cvHref = language === "fr"
    ? "/Taha_ElBah_CVfr%20(1).pdf"
    : "/TahaElBahCVeng.pdf";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const pos = window.scrollY + 120;
      let current = "";
      for (const id of navSections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 glass shadow-xl shadow-black/30" : "py-5"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          className="text-2xl font-black font-heading gradient-text"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          T.ElBah
        </motion.button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navSections.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative text-sm font-medium group"
            >
              <span
                className={`transition-colors duration-200 ${
                  activeSection === id ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {t(`nav.${id}`)}
              </span>
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-sky-500 transition-all duration-200 rounded-full ${
                  activeSection === id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <motion.a
            href={cvHref}
            download
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 transition-shadow duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={14} />
            {t("nav.downloadCV")}
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden mx-4 mt-2 p-5 glass rounded-2xl flex flex-col gap-4"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {navSections.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-slate-300 hover:text-white transition-colors font-medium"
              >
                {t(`nav.${id}`)}
              </button>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <LanguageSwitcher />
              <a
                href={cvHref}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-semibold"
              >
                <Download size={14} />
                CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
