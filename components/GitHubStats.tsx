"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const GH_USER = "ELBAHTaha";

const statsCards = [
  {
    src: `https://github-readme-stats.vercel.app/api?username=${GH_USER}&show_icons=true&theme=radical&bg_color=0d0d14&hide_border=true&title_color=a855f7&icon_color=ec4899&text_color=94a3b8`,
    alt: "GitHub Stats",
    wide: true,
  },
  {
    src: `https://github-readme-streak-stats.herokuapp.com/?user=${GH_USER}&theme=radical&background=0d0d14&hide_border=true&ring=a855f7&fire=ec4899&currStreakLabel=06b6d4`,
    alt: "GitHub Streak",
    wide: true,
  },
  {
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GH_USER}&layout=compact&theme=radical&bg_color=0d0d14&hide_border=true&title_color=a855f7&text_color=94a3b8`,
    alt: "Top Languages",
    wide: false,
  },
];

function StatCard({ src, alt, wide, delay }: { src: string; alt: string; wide: boolean; delay: number }) {
  const [error, setError] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`glass-card p-3 overflow-hidden hover:scale-[1.02] transition-transform duration-200 ${
        wide ? "col-span-2 md:col-span-1" : ""
      }`}
      initial={reduced ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {error ? (
        <div className="flex flex-col items-center justify-center h-40 gap-3">
          <div className="text-4xl">📊</div>
          <div className="text-slate-500 text-sm text-center">
            {alt}
            <br />
            <a
              href={`https://github.com/${GH_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-text text-xs"
            >
              @{GH_USER}
            </a>
          </div>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full rounded-lg"
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
    </motion.div>
  );
}

export default function GitHubStats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black font-heading gradient-text inline-block">
            {t("github.title")}
          </h2>
          <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
          <p className="mt-4 text-slate-500 text-sm">
            <a
              href={`https://github.com/${GH_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-text font-semibold hover:opacity-80 transition-opacity"
            >
              github.com/{GH_USER}
            </a>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
          {statsCards.map((card, i) => (
            <StatCard key={card.alt} {...card} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
