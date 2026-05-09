"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail } from "lucide-react";

const navLinks = ["about", "projects", "skills", "experience", "contact"];

const socials = [
  { icon: Github, href: "https://github.com/ELBAHTaha", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/tahaelbah", label: "LinkedIn" },
  { icon: Mail, href: "mailto:tahaelbah@gmail.com", label: "Email" },
];

export default function Footer() {
  const { t } = useTranslation();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-white/6 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <motion.button
          className="text-2xl font-black font-heading gradient-text"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.05 }}
        >
          T.ElBah
        </motion.button>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-5">
          {navLinks.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-slate-500 hover:text-white transition-colors capitalize"
            >
              {t(`nav.${id}`)}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-sky-500 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>

        {/* Built by */}
        <p className="text-sm gradient-text font-semibold">{t("footer.built")}</p>
        <p className="text-xs text-slate-600">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
