"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { Download, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
});

const techBadges = [
  { label: "Spring Boot", from: "from-green-600", to: "to-emerald-500" },
  { label: "React", from: "from-cyan-500", to: "to-blue-600" },
  { label: "PostgreSQL", from: "from-blue-600", to: "to-indigo-700" },
  { label: "Docker", from: "from-sky-500", to: "to-blue-500" },
  { label: "TensorFlow", from: "from-orange-500", to: "to-red-600" },
  { label: "TypeScript", from: "from-blue-400", to: "to-blue-700" },
];

export default function Hero() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const cvHref = language === "fr"
    ? "/Taha_ElBah_CVfr%20(1).pdf"
    : "/TahaElBahCVeng.pdf";
  const reduced = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: "easeOut" },
        };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg">
      <ParticleBackground />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-blue-700/8 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div
        className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] rounded-full bg-sky-700/8 blur-[120px] pointer-events-none animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-24 pb-12">
        {/* Cycling greeting */}
        <motion.p
          className="text-xl md:text-2xl text-slate-400 mb-3 font-body"
          {...fadeUp(0)}
        >
          <TypeAnimation
            sequence={[
              t("hero.greeting0"), 2500,
              t("hero.greeting1"), 2500,
            ]}
            wrapper="span"
            speed={45}
            repeat={Infinity}
          />
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-black font-heading gradient-text leading-none mb-6 tracking-tight"
          {...fadeUp(0.15)}
        >
          {t("hero.name")}
        </motion.h1>

        {/* Role typewriter */}
        <motion.div
          className="text-xl md:text-3xl font-bold font-heading mb-5 h-10 flex items-center justify-center"
          {...fadeUp(0.3)}
        >
          <TypeAnimation
            sequence={[
              t("hero.role0"), 2000,
              t("hero.role1"), 2000,
              t("hero.role2"), 2000,
              t("hero.role3"), 2000,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
            className="gradient-text-cyan"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-base md:text-lg text-slate-400 mb-10 max-w-xl mx-auto font-body"
          {...fadeUp(0.45)}
        >
          {t("hero.tagline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          {...fadeUp(0.6)}
        >
          <motion.button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 transition-shadow duration-300"
            whileHover={reduced ? {} : { scale: 1.05 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
          >
            {t("hero.viewWork")} ↓
          </motion.button>

          <motion.a
            href={cvHref}
            download
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-blue-500/30 text-white font-bold text-lg hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            whileHover={reduced ? {} : { scale: 1.05 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
          >
            <Download size={20} />
            {t("hero.downloadCV")}
          </motion.a>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-16"
          initial={reduced ? {} : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {techBadges.map((badge, i) => (
            <motion.span
              key={badge.label}
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${badge.from} ${badge.to} text-white text-sm font-semibold shadow-lg cursor-default`}
              initial={reduced ? {} : { opacity: 0, scale: 0.6 }}
              animate={reduced ? {} : { opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 + i * 0.08, duration: 0.3 }}
              whileHover={reduced ? {} : { scale: 1.12, y: -3 }}
            >
              {badge.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 text-slate-500"
          initial={reduced ? {} : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="text-xs tracking-widest uppercase">
            {t("hero.scrollDown")}
          </span>
          <motion.div
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={22} className="text-slate-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
