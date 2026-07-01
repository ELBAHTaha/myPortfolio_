"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const categories = [
  {
    key: "skills.backend",
    items: ["Spring Boot", "Laravel", "NestJS", "REST APIs", "Microservices", "JWT", "WebSocket"],
  },
  {
    key: "skills.frontend",
    items: ["React", "Next.js", "HTML5", "CSS3", "Flutter", "Electron"],
  },
  {
    key: "skills.dataML",
    items: ["PostgreSQL", "Redis", "TensorFlow", "scikit-learn", "LLM APIs", "Data Analytics"],
  },
  {
    key: "skills.devops",
    items: ["Docker", "GitHub Actions", "CI/CD", "n8n", "AWS EC2 / S3", "Git", "Agile Scrum"],
  },
  {
    key: "skills.languages",
    items: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "PHP"],
  },
];

// Flattened, de-duplicated marquee of every technology
const ticker = Array.from(new Set(categories.flatMap((c) => c.items)));

// Spoken languages — translation keys, rendered as a final row (kept out of the ticker)
const spokenLanguages = [
  "skills.spokenArabic",
  "skills.spokenFrench",
  "skills.spokenEnglish",
  "skills.spokenTurkish",
];

export default function Skills() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  // Tech categories + a translated spoken-languages row, sharing one ruled list
  const rows = [
    ...categories,
    { key: "skills.spoken", items: spokenLanguages.map((k) => t(k)) },
  ];

  return (
    <section id="skills" className="py-[var(--section-y)]">
      <div className="shell" ref={ref}>
        {/* Header */}
        <header className="grid grid-cols-12 items-end gap-4 border-t border-ink pt-5 mb-10 md:mb-12">
          <div className="col-span-12 md:col-span-9 flex items-baseline gap-4">
            <span className="label text-accent">04</span>
            <h2
              className="font-display text-ink"
              style={{ fontSize: "var(--step-3)", lineHeight: 1 }}
            >
              {t("skills.title")}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <span className="label text-ink-muted">Stack</span>
          </div>
        </header>
      </div>

      {/* Full-bleed marquee ticker */}
      <div className="marquee relative overflow-hidden border-y border-rule py-5 select-none">
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex items-center">
              {ticker.map((tech) => (
                <span key={tech} className="flex items-center">
                  <span
                    className="font-display italic text-ink px-6"
                    style={{ fontSize: "var(--step-2)" }}
                  >
                    {tech}
                  </span>
                  <span className="text-accent text-lg">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Ruled category list */}
      <div className="shell mt-12 md:mt-16">
        <ul>
          {rows.map((cat, i) => (
            <motion.li
              key={cat.key}
              className="grid grid-cols-12 gap-x-4 gap-y-2 py-6 border-t border-rule last:border-b"
              initial={reduced ? {} : { opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
            >
              <div className="col-span-12 md:col-span-3 flex items-baseline gap-3">
                <span className="font-mono text-[0.62rem] text-ink-faint tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label text-ink">{t(cat.key)}</span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <p className="text-ink-muted leading-relaxed">
                  {cat.items.map((item, j) => (
                    <span key={item}>
                      {item}
                      {j < cat.items.length - 1 && (
                        <span className="text-ink-faint px-2">/</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
