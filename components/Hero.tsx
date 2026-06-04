"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";

// "TAHA EL BAH" -> "Taha El Bah" for elegant display title-case
const toTitle = (s: string) =>
  s.toLowerCase().replace(/\b\p{L}/gu, (c) => c.toUpperCase());

const figures = [
  { value: "25+", label: "about.apisLabel" },
  { value: "05", label: "about.internshipsLabel" },
  { value: "89%", label: "about.accuracyLabel" },
];

export default function Hero() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const cvHref =
    language === "fr" ? "/Taha_ElBah_CVfr%20(1).pdf" : "/TahaElBah_Resume_eng.pdf";

  // Staggered page-load reveal
  const ease = [0.22, 1, 0.36, 1] as const;
  const reveal = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  const role = `${t("hero.role0")} · ${t("hero.role1")} · ${t("hero.role3")}`;

  return (
    <section className="relative min-h-svh flex flex-col justify-center pt-28 pb-12">
      <div className="shell w-full">
        {/* — Eyebrow row — */}
        <motion.div
          className="flex items-baseline justify-between gap-4 pb-4 rule-b"
          {...reveal(0)}
        >
          <span className="label text-ink">
            Portfolio <span className="text-ink-faint">/ 2026</span>
          </span>
          <span className="label text-ink-muted">
            {t("about.location")} <span className="text-ink-faint">— GMT+1</span>
          </span>
        </motion.div>

        {/* — Main grid — */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 pt-10 md:pt-16">
          {/* Statement */}
          <div className="lg:col-span-8 xl:col-span-9">
            <motion.p
              className="label text-accent mb-6 flex items-center gap-2.5"
              {...reveal(0.1)}
            >
              <span
                className="inline-block w-2 h-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              {role}
            </motion.p>

            <motion.h1
              className="display text-ink"
              {...reveal(0.18)}
            >
              <span className="block">{toTitle(t("hero.name")).split(" ")[0]}</span>
              <span className="block">
                {toTitle(t("hero.name")).split(" ").slice(1).join(" ")}
                <span className="text-accent">.</span>
              </span>
            </motion.h1>

            <motion.p
              className="font-display italic text-ink-muted mt-8 max-w-2xl"
              style={{ fontSize: "var(--step-2)", lineHeight: 1.2 }}
              {...reveal(0.28)}
            >
              {t("hero.tagline")}
            </motion.p>
          </div>

          {/* Metadata column */}
          <motion.aside
            className="lg:col-span-4 xl:col-span-3 lg:pt-3 flex flex-col gap-6"
            {...reveal(0.4)}
          >
            <dl className="flex flex-col">
              {[
                { k: "Available", v: "Open to roles & freelance" },
                { k: "Currently", v: `${t("experience.job2Role").split("·")[0].trim()} @ ${t("experience.job2Company")}` },
                { k: "Education", v: "B.Sc. Computer Engineering" },
              ].map((row, i) => (
                <div
                  key={row.k}
                  className={`flex flex-col gap-1 py-3 ${i === 0 ? "rule-t" : ""} rule-b`}
                >
                  <dt className="label text-ink-faint">{row.k}</dt>
                  <dd className="text-ink text-[0.95rem] leading-snug">{row.v}</dd>
                </div>
              ))}
            </dl>

            {/* Figures */}
            <div className="grid grid-cols-3 gap-x-3 rule-t pt-4">
              {figures.map((f) => (
                <div key={f.label} className="flex flex-col">
                  <span className="font-display text-ink tnum text-[1.7rem] leading-none">
                    {f.value}
                  </span>
                  <span
                    className="font-mono uppercase text-ink-muted mt-2 leading-[1.25]"
                    style={{ fontSize: "0.56rem", letterSpacing: "0.08em" }}
                  >
                    {t(f.label)}
                  </span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        {/* — CTA row — */}
        <motion.div
          className="mt-14 md:mt-20 pt-5 rule-t flex flex-wrap items-center gap-x-10 gap-y-4"
          {...reveal(0.52)}
        >
          <button
            onClick={scrollToProjects}
            className="label text-ink u-link cursor-pointer"
          >
            {t("hero.viewWork")} ↓
          </button>
          <a href={cvHref} download className="label text-ink u-link">
            {t("hero.downloadCV")} ↗
          </a>
          <span className="label text-ink-faint ml-auto hidden sm:inline">
            {t("hero.scrollDown")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
