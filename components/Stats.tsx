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
    gradient: "from-blue-600 to-sky-500",
    shadow: "hover:shadow-blue-500/30",
    iconBg: "from-blue-600 to-sky-500",
  },
  {
    value: 5,
    suffix: "",
    labelKey: "stats.internships",
    icon: Briefcase,
    gradient: "from-cyan-600 to-blue-600",
    shadow: "hover:shadow-cyan-500/30",
    iconBg: "from-cyan-600 to-blue-600",
  },
  {
    value: 89,
    suffix: "%",
    labelKey: "stats.accuracy",
    icon: Brain,
    gradient: "from-emerald-600 to-teal-600",
    shadow: "hover:shadow-emerald-500/30",
    iconBg: "from-emerald-600 to-teal-600",
  },
  {
    value: 30,
    suffix: "%",
    labelKey: "stats.performance",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-600",
    shadow: "hover:shadow-orange-500/30",
    iconBg: "from-orange-500 to-red-600",
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
          <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {statsData.map(({ value, suffix, labelKey, icon: Icon, gradient, shadow, iconBg }, i) => (
            <motion.div
              key={labelKey}
              className={`gradient-border-card p-6 text-center group hover:scale-[1.05] transition-all duration-300 hover:shadow-2xl ${shadow}`}
              initial={reduced ? {} : { opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className={`mx-auto mb-4 w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-lg`}
              >
                <Icon size={22} className="text-white" strokeWidth={2} />
              </div>

              <div
                className={`text-4xl font-black font-heading bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}
              >
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
