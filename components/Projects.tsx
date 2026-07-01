"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const projects = [
  {
    id: "ontarioPost",
    badge: "Live",
    tags: ["React", "PHP", "MySQL", "n8n"],
    liveUrl: "https://ontariopost.ca",
    githubUrl: null,
  },
  {
    id: "aiResumeScreener",
    badge: "Open Source",
    tags: ["NestJS", "FastAPI", "Next.js", "PostgreSQL", "Redis", "AWS"],
    liveUrl: null,
    githubUrl: "https://github.com/ELBAHTaha/AIresumeScreener",
  },
  {
    id: "keyinov",
    badge: "Live",
    tags: ["React", "Laravel", "MySQL", "CI/CD"],
    liveUrl: "https://keyinov.com",
    githubUrl: null,
  },
  {
    id: "ecommerce",
    badge: "Live",
    tags: ["Laravel", "React", "WooCommerce", "SQL", "CI/CD"],
    liveUrl: "https://innoland.ma",
    githubUrl: null,
  },
  {
    id: "spx500",
    badge: "Machine Learning",
    tags: ["Python", "scikit-learn", "XGBoost", "SHAP"],
    liveUrl: null,
    githubUrl: "https://github.com/ELBAHTaha",
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="projects" className="py-[var(--section-y)]">
      <div className="shell" ref={ref}>
        {/* Section header */}
        <header className="grid grid-cols-12 items-end gap-4 border-t border-ink pt-5 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-9 flex items-baseline gap-4">
            <span className="label text-accent">03</span>
            <h2
              className="font-display text-ink"
              style={{ fontSize: "var(--step-3)", lineHeight: 1 }}
            >
              {t("projects.title")}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <span className="label text-ink-muted">
              {projects.length} selected
            </span>
          </div>
        </header>

        {/* Entries */}
        <ol>
          {projects.map((p, i) => {
            const primary = p.liveUrl ?? p.githubUrl;
            const title = t(`${"projects."}${p.id}Title`);
            return (
              <motion.li
                key={p.id}
                className="group border-t border-rule last:border-b"
                initial={reduced ? {} : { opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <div className="grid grid-cols-12 gap-x-4 gap-y-5 py-8 md:py-10">
                  {/* Index */}
                  <div className="col-span-12 md:col-span-1">
                    <span className="font-mono tabular-nums text-sm text-ink-faint transition-colors duration-200 group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="col-span-12 md:col-span-7">
                    {primary ? (
                      <a
                        href={primary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-2 group/title"
                      >
                        <h3
                          className="font-display text-ink leading-[1.05] transition-colors duration-200 group-hover:text-accent"
                          style={{ fontSize: "var(--step-2)" }}
                        >
                          {title}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="mt-1 text-ink-faint transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    ) : (
                      <h3
                        className="font-display text-ink leading-[1.05]"
                        style={{ fontSize: "var(--step-2)" }}
                      >
                        {title}
                      </h3>
                    )}
                    <p className="text-ink-muted mt-4 max-w-xl leading-relaxed text-[0.95rem]">
                      {t(`${"projects."}${p.id}Desc`)}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:items-end">
                    <span className="label text-ink">{p.badge}</span>
                    <ul className="flex flex-wrap gap-x-3 gap-y-1.5 md:justify-end">
                      {p.tags.map((tag) => (
                        <li
                          key={tag}
                          className="font-mono text-[0.7rem] text-ink-muted tracking-wide"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-5 md:justify-end mt-1">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label text-ink u-link"
                        >
                          {t("projects.liveDemo")} ↗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label text-ink u-link"
                        >
                          {t("projects.github")} ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
