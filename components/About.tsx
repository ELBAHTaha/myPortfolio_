"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const reveal = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay, ease },
        };

  const facts = [
    { k: "Email", v: t("about.email"), href: `mailto:${t("about.email")}` },
    { k: "Based", v: t("about.location"), href: null },
    { k: "Focus", v: "Full-Stack · APIs · Machine Learning", href: null },
  ];

  const bio = t("about.bio");
  const firstLetter = bio.charAt(0);
  const restBio = bio.slice(1);

  return (
    <section id="about" className="py-[var(--section-y)]">
      <div className="shell" ref={ref}>
        {/* Header */}
        <header className="grid grid-cols-12 items-end gap-4 border-t border-ink pt-5 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-9 flex items-baseline gap-4">
            <span className="label text-accent">01</span>
            <h2
              className="font-display text-ink"
              style={{ fontSize: "var(--step-3)", lineHeight: 1 }}
            >
              {t("about.title")}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <span className="label text-ink-muted">Profile</span>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          {/* Bio */}
          <motion.div className="col-span-12 md:col-span-7" {...reveal(0)}>
            <p
              className="text-ink leading-[1.6]"
              style={{ fontSize: "var(--step-1)" }}
            >
              <span className="font-display float-left text-accent leading-[0.8] mr-3 mt-1.5 text-[3.4em]">
                {firstLetter}
              </span>
              {restBio}
            </p>
          </motion.div>

          {/* Photo + facts */}
          <motion.aside
            className="col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-9 flex flex-col gap-7"
            {...reveal(0.12)}
          >
            <div className="group relative w-full max-w-xs">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink">
                <Image
                  src="/profimage.jpeg"
                  alt="Portrait of Taha El Bah"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top grayscale contrast-[1.05] transition-[filter] duration-500 group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
              <span className="absolute -bottom-px left-0 h-[3px] w-12 bg-accent" />
            </div>

            <dl className="flex flex-col">
              {facts.map((f, i) => (
                <div
                  key={f.k}
                  className={`flex items-baseline justify-between gap-4 py-3 rule-b ${
                    i === 0 ? "rule-t" : ""
                  }`}
                >
                  <dt className="label text-ink-faint">{f.k}</dt>
                  <dd className="text-ink text-[0.9rem] text-right">
                    {f.href ? (
                      <a href={f.href} className="u-link">
                        {f.v}
                      </a>
                    ) : (
                      f.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
