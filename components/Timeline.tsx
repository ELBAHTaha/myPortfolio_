"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";

const entries = [
  { id: "job1", bullets: 2 },
  { id: "job2", bullets: 2 },
  { id: "job3", bullets: 2 },
  { id: "job4", bullets: 1 },
  { id: "job5", bullets: 2 },
  { id: "job6", bullets: 1 },
];

function TimelineEntry({
  entry,
  index,
  isInView,
}: {
  entry: (typeof entries)[0];
  index: number;
  isInView: boolean;
}) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const isLeft = index % 2 === 0;

  const bulletArr = Array.from({ length: entry.bullets }, (_, i) =>
    t(`experience.${entry.id}Bullet${i + 1}`)
  );

  return (
    <div className="relative grid md:grid-cols-2 gap-6 md:gap-12 mb-10">
      {/* Left slot */}
      <motion.div
        className={`${isLeft ? "md:block" : "md:block"} order-2 md:order-none`}
        initial={reduced ? {} : { opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.08 }}
      >
        {isLeft && (
          <Card entry={entry} t={t} bulletArr={bulletArr} />
        )}
        {!isLeft && <div className="hidden md:block" />}
      </motion.div>

      {/* Right slot */}
      <motion.div
        className="order-1 md:order-none"
        initial={reduced ? {} : { opacity: 0, x: isLeft ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.08 }}
      >
        {!isLeft && <Card entry={entry} t={t} bulletArr={bulletArr} />}
        {isLeft && <div className="hidden md:block" />}
      </motion.div>

      {/* Center dot — only on md+ */}
      <div className="absolute hidden md:flex left-1/2 top-5 -translate-x-1/2 z-10 items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-blue-600/80 ring-4 ring-[#0a0a0f]" />
      </div>
    </div>
  );
}

function Card({
  entry,
  t,
  bulletArr,
}: {
  entry: (typeof entries)[0];
  t: (k: string) => string;
  bulletArr: string[];
}) {
  const location = t(`experience.${entry.id}Location`);

  return (
    <div className="glass-card p-5 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/8 text-slate-400 font-mono">
            {t(`experience.${entry.id}Date`)}
          </span>
        </div>
        {location && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={10} />
            {location}
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold font-heading mt-2 text-white">
        {t(`experience.${entry.id}Company`)}
      </h3>
      <p className="text-sm text-slate-400 font-medium mb-3">
        {t(`experience.${entry.id}Role`)}
      </p>
      <ul className="space-y-1.5">
        {bulletArr.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Timeline() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="py-24 px-4 bg-white/[0.01]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black font-heading gradient-text inline-block">
            {t("experience.title")}
          </h2>
          <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <motion.div
              className="timeline-line w-full h-full rounded-full"
              initial={reduced ? {} : { scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {entries.map((entry, i) => (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
