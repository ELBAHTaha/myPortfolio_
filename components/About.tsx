"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { Mail, Phone, MapPin } from "lucide-react";

const stats = [
  { value: 25, suffix: "+", labelKey: "about.apisLabel", gradient: "from-blue-600 to-sky-500" },
  { value: 5, suffix: "", labelKey: "about.internshipsLabel", gradient: "from-cyan-600 to-blue-600" },
  { value: 89, suffix: "%", labelKey: "about.accuracyLabel", gradient: "from-emerald-600 to-teal-600" },
];

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.12, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-4 max-w-7xl mx-auto"
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={reduced ? {} : { opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-black font-heading gradient-text inline-block">
          {t("about.title")}
        </h2>
        <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-500" />
      </motion.div>

      {/* Split layout */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left — avatar */}
        <motion.div
          className="flex flex-col items-center gap-6"
          custom={0}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Gradient initials avatar */}
          <div className="relative">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-blue-500/40 ring-4 ring-blue-500/30 animate-float">
              TE
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 blur-2xl opacity-20 -z-10 scale-110" />
          </div>

          {/* Contact pills */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {[
              { icon: Mail, text: t("about.email"), href: `mailto:${t("about.email")}` },
              { icon: Phone, text: t("about.phone"), href: `tel:${t("about.phone").replace(/\s/g, "")}` },
              { icon: MapPin, text: t("about.location"), href: "#" },
            ].map(({ icon: Icon, text, href }) => (
              <a
                key={text}
                href={href}
                className="flex items-center gap-3 px-4 py-3 glass-card hover:border-blue-500/30 transition-colors duration-200 group"
              >
                <span className="p-2 rounded-full bg-gradient-to-br from-blue-600/20 to-sky-500/20 text-blue-400 group-hover:text-sky-400 transition-colors">
                  <Icon size={16} />
                </span>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {text}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — bio + stats */}
        <div className="flex flex-col gap-8">
          <motion.p
            className="text-slate-300 text-lg leading-relaxed font-body"
            custom={1}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {t("about.bio")}
          </motion.p>

          {/* Stat cards */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            custom={2}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {stats.map(({ value, suffix, labelKey, gradient }) => (
              <div
                key={labelKey}
                className="gradient-border-card p-5 text-center group hover:scale-105 transition-transform duration-200"
              >
                <div
                  className={`text-3xl font-black font-heading bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                >
                  {isInView && !reduced ? (
                    <CountUp end={value} duration={2.2} suffix={suffix} enableScrollSpy scrollSpyOnce />
                  ) : (
                    `${value}${suffix}`
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  {t(labelKey)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
