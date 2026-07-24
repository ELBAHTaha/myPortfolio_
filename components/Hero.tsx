"use client";

import Image from "next/image";
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
    language === "fr" ? "/TahaElBah_CV_fr.pdf" : "/TahaElBah_cveng.pdf";

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
  const bio = t("about.bio");
  const facts = [
    { k: "Email", v: t("about.email"), href: `mailto:${t("about.email")}` },
    { k: "Based", v: t("about.location"), href: null },
    { k: "Focus", v: "Full-Stack · APIs · Machine Learning", href: null },
  ];

  return (
    <section id="about" className="relative pt-28 pb-14 md:pb-20 scroll-mt-20">
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

        {/* One unified introduction and profile composition */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-8 pt-8 md:pt-11">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <motion.p
              className="label text-accent mb-6 flex items-center gap-2.5"
              {...reveal(0.1)}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
              {role}
            </motion.p>

            <motion.h1 className="display text-ink" {...reveal(0.18)}>
              <span className="block">{toTitle(t("hero.name")).split(" ")[0]}</span>
              <span className="block">
                {toTitle(t("hero.name")).split(" ").slice(1).join(" ")}
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

          <motion.aside
            className="col-span-8 sm:col-span-6 lg:col-span-4 xl:col-span-3 lg:pt-3"
            {...reveal(0.34)}
          >
            <div className="group relative w-full max-w-xs ml-auto">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink bg-paper-sunk">
                <Image
                  src="/profimage.jpeg"
                  alt="Portrait of Taha El Bah"
                  fill
                  priority
                  sizes="(max-width: 1024px) 50vw, 320px"
                  className="object-cover object-top contrast-[1.05] scale-[1.01] transition-transform duration-500 ease-editorial group-hover:scale-[1.04]"
                />
              </div>
              <span
                className="absolute -bottom-px left-0 h-[3px] w-12 bg-accent transition-[width] duration-500 ease-editorial group-hover:w-full"
                aria-hidden="true"
              />
            </div>
          </motion.aside>

          <motion.div
            className="col-span-12 lg:col-span-7 pt-7 border-t border-rule"
            {...reveal(0.4)}
          >
            <div className="flex items-baseline gap-3 mb-5">
              <span className="label text-accent">01</span>
              <h2 className="label text-ink">{t("about.title")}</h2>
              <span className="label text-ink-faint ml-auto">Profile</span>
            </div>
            <p className="text-ink leading-[1.6]" style={{ fontSize: "var(--step-1)" }}>
              <span className="font-display float-left text-accent leading-[0.8] mr-3 mt-1.5 text-[3.4em]">
                {bio.charAt(0)}
              </span>
              {bio.slice(1)}
            </p>
          </motion.div>

          <motion.aside
            className="col-span-12 lg:col-span-5 grid sm:grid-cols-2 gap-x-7"
            {...reveal(0.46)}
          >
            <dl className="flex flex-col">
              {[
                { k: "Available", v: "Open to roles & freelance" },
                {
                  k: "Currently",
                  v: `${t("experience.job2Role").split("·")[0].trim()} @ ${t("experience.job2Company")}`,
                },
                { k: "Education", v: "B.Sc. Computer Engineering" },
              ].map((row, i) => (
                <div key={row.k} className={`flex flex-col gap-1 py-3 ${i === 0 ? "rule-t" : ""} rule-b`}>
                  <dt className="label text-ink-faint">{row.k}</dt>
                  <dd className="text-ink text-[0.88rem] leading-snug">{row.v}</dd>
                </div>
              ))}
            </dl>

            <dl className="flex flex-col">
              {facts.map((fact, i) => (
                <div key={fact.k} className={`flex flex-col gap-1 py-3 ${i === 0 ? "rule-t" : ""} rule-b`}>
                  <dt className="label text-ink-faint">{fact.k}</dt>
                  <dd className="text-ink text-[0.88rem] leading-snug">
                    {fact.href ? <a href={fact.href} className="u-link">{fact.v}</a> : fact.v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>

        <motion.div
          className="mt-9 md:mt-11 pt-5 border-t border-ink grid grid-cols-12 gap-x-8 gap-y-7 items-end"
          {...reveal(0.52)}
        >
          <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-x-5">
            {figures.map((figure) => (
              <div key={figure.label} className="flex flex-col">
                <span className="font-display text-ink tnum text-[1.9rem] leading-none">{figure.value}</span>
                <span className="font-mono uppercase text-ink-muted mt-2 leading-[1.25] text-[0.58rem] tracking-[0.08em]">
                  {t(figure.label)}
                </span>
              </div>
            ))}
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-wrap md:justify-end items-center gap-x-8 gap-y-3">
            <button onClick={scrollToProjects} className="label text-ink u-link cursor-pointer">
              {t("hero.viewWork")} ↓
            </button>
            <a href={cvHref} download className="label text-ink u-link">
              {t("hero.downloadCV")} ↗
            </a>
            <span className="label text-ink-faint hidden xl:inline">{t("hero.scrollDown")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
