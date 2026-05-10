"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { Zap, Briefcase, Brain, TrendingUp } from "lucide-react";

const statsData = [
  {
    value: 25,
    suffix: "+",
    labelKey: "stats.apis",
    icon: Zap,
  },
  {
    value: 5,
    suffix: "",
    labelKey: "stats.internships",
    icon: Briefcase,
  },
  {
    value: 89,
    suffix: "%",
    labelKey: "stats.accuracy",
    icon: Brain,
  },
  {
    value: 30,
    suffix: "%",
    labelKey: "stats.performance",
    icon: TrendingUp,
  },
];

export default function Stats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section className="py-24 px-4 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black font-heading gradient-text inline-block">
            {t("stats.title")}
          </h2>
          <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {statsData.map(({ value, suffix, labelKey, icon: Icon }, i) => (
            <motion.div
              key={labelKey}
              className="gradient-border-card p-6 text-center group hover:scale-[1.05] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              initial={reduced ? {} : { opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-white/[0.07] border border-white/[0.08] flex items-center justify-center text-slate-300">
                <Icon size={22} strokeWidth={1.5} />
              </div>

              <div className="text-4xl font-black font-heading text-white mb-2">
                {isInView && !reduced ? (
                  <CountUp
                    end={value}
                    duration={2.5}
                    suffix={suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                ) : (
                  `${value}${suffix}`
                )}
              </div>
              <p className="text-slate-400 text-xs font-medium leading-tight">
                {t(labelKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
