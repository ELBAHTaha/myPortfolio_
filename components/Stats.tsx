"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const figures = [
  { value: "25+", labelKey: "stats.apis" },
  { value: "05", labelKey: "stats.internships" },
  { value: "89%", labelKey: "stats.accuracy" },
  { value: "30%", labelKey: "stats.performance" },
];

export default function Stats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="pb-[var(--section-y)]">
      <div className="shell" ref={ref}>
        <p className="label text-ink-muted mb-6">{t("stats.title")}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-ink">
          {figures.map((f, i) => (
            <motion.div
              key={f.labelKey}
              className="flex flex-col gap-3 py-8 md:py-10 border-b border-rule md:border-b-0 md:border-r md:border-rule last:border-r-0 md:pr-4 [&:nth-child(odd)]:pr-4 md:[&:nth-child(odd)]:pr-4"
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
            >
              <span
                className="font-display text-ink tnum leading-[0.9]"
                style={{ fontSize: "var(--step-4)" }}
              >
                {f.value}
              </span>
              <span className="label text-ink-muted leading-tight max-w-[14ch]">
                {t(f.labelKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
