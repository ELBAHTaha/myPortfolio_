"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const entries = [
  { id: "job1", bullets: 3 },
  { id: "job2", bullets: 2 },
  { id: "job3", bullets: 2 },
  { id: "job4", bullets: 2 },
  { id: "job5", bullets: 1 },
  { id: "job6", bullets: 2 },
  { id: "job7", bullets: 1 },
];

export default function Timeline() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="experience" className="py-[var(--section-y)]">
      <div className="shell" ref={ref}>
        {/* Header */}
        <header className="grid grid-cols-12 items-end gap-4 border-t border-ink pt-5 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-9 flex items-baseline gap-4">
            <span className="label text-accent">02</span>
            <h2
              className="font-display text-ink"
              style={{ fontSize: "var(--step-3)", lineHeight: 1 }}
            >
              {t("experience.title")}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <span className="label text-ink-muted">2020 — Present</span>
          </div>
        </header>

        {/* Ruled list */}
        <ol>
          {entries.map((entry, i) => {
            const location = t(`experience.${entry.id}Location`);
            const bullets = Array.from({ length: entry.bullets }, (_, b) =>
              t(`experience.${entry.id}Bullet${b + 1}`)
            );
            return (
              <motion.li
                key={entry.id}
                className="group grid grid-cols-12 gap-x-4 gap-y-4 py-8 md:py-9 border-t border-rule last:border-b"
                initial={reduced ? {} : { opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
              >
                {/* Date / location */}
                <div className="col-span-12 md:col-span-3 flex md:flex-col items-baseline md:items-start gap-x-3 gap-y-1">
                  <span className="label text-ink">
                    {t(`experience.${entry.id}Date`)}
                  </span>
                  {location && (
                    <span className="font-mono text-[0.68rem] text-ink-faint uppercase tracking-wide">
                      {location}
                    </span>
                  )}
                </div>

                {/* Company / role / bullets */}
                <div className="col-span-12 md:col-span-8 md:col-start-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.62rem] text-ink-faint tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="font-display text-ink leading-tight transition-colors duration-200 group-hover:text-accent"
                      style={{ fontSize: "var(--step-1)" }}
                    >
                      {t(`experience.${entry.id}Company`)}
                    </h3>
                  </div>
                  <p className="label text-ink-muted mt-1.5 ml-7">
                    {t(`experience.${entry.id}Role`)}
                  </p>
                  <ul className="mt-4 ml-7 flex flex-col gap-2">
                    {bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-3 text-ink text-[0.95rem] leading-snug"
                      >
                        <span aria-hidden="true" className="text-accent mt-0.5">
                          —
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
