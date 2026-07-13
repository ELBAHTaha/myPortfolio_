"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const projects = [
  {
    id: "ontarioPost",
    category: "web",
    badge: "Live",
    tags: ["React", "PHP", "MySQL", "n8n"],
    liveUrl: "https://ontariopost.ca",
    githubUrl: null,
  },
  {
    id: "aiResumeScreener",
    category: "ai",
    badge: "Open Source",
    tags: ["NestJS", "FastAPI", "Next.js", "PostgreSQL", "Redis", "AWS"],
    liveUrl: null,
    githubUrl: "https://github.com/ELBAHTaha/AIresumeScreener",
  },
  {
    id: "keyinov",
    category: "web",
    badge: "Live",
    tags: ["React", "Laravel", "MySQL", "CI/CD"],
    liveUrl: "https://keyinov.com",
    githubUrl: null,
  },
  {
    id: "ecommerce",
    category: "web",
    badge: "Live",
    tags: ["Laravel", "React", "WooCommerce", "SQL", "CI/CD"],
    liveUrl: "https://innoland.ma",
    githubUrl: null,
  },
  {
    id: "spx500",
    category: "ai",
    badge: "Machine Learning",
    tags: ["Python", "scikit-learn", "XGBoost", "SHAP"],
    liveUrl: null,
    githubUrl: "https://github.com/ELBAHTaha",
  },
];

const filters = [
  { id: "all", label: "projects.all" },
  { id: "web", label: "projects.webPlatforms" },
  { id: "ai", label: "projects.aiData" },
] as const;

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["id"]>("all");
  const ease = [0.22, 1, 0.36, 1] as const;
  const visibleProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

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
              {t("projects.selectedCount", { count: visibleProjects.length })}
            </span>
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-10" aria-label="Project filters">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={active}
                className={`label px-4 py-2 border transition-colors duration-200 cursor-pointer ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-ink-muted hover:border-ink hover:text-ink"
                }`}
              >
                {t(filter.label)}
              </button>
            );
          })}
        </div>

        {/* Entries */}
        <motion.ol layout={!reduced}>
          <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((p) => {
            const i = projects.findIndex((project) => project.id === p.id);
            const primary = p.liveUrl ?? p.githubUrl;
            const title = t(`${"projects."}${p.id}Title`);
            return (
              <motion.li
                key={p.id}
                layout={!reduced}
                exit={reduced ? {} : { opacity: 0, y: -12 }}
                className="group border-t border-rule last:border-b transition-colors duration-300 hover:bg-paper-sunk/60 focus-within:bg-paper-sunk/60"
                initial={reduced ? {} : { opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <div className="grid grid-cols-12 gap-x-4 gap-y-5 py-8 md:py-10 px-3 md:px-5 -mx-3 md:-mx-5">
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
          </AnimatePresence>
        </motion.ol>
      </div>
    </section>
  );
}
