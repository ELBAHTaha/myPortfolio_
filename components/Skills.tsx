"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const skillBars = [
  { name: "Java", level: 90 },
  { name: "Spring Boot", level: 88 },
  { name: "PostgreSQL / SQL", level: 85 },
  { name: "Python", level: 82 },
  { name: "TypeScript / JavaScript", level: 80 },
  { name: "React / Next.js", level: 78 },
  { name: "Docker / CI-CD", level: 72 },
  { name: "TensorFlow / ML", level: 70 },
];

const techCategories = [
  {
    icon: "🖥",
    key: "skills.backend",
    pills: ["Spring Boot", "Laravel", "NestJS", "REST APIs", "Microservices", "JWT", "WebSocket"],
  },
  {
    icon: "🎨",
    key: "skills.frontend",
    pills: ["React", "Next.js", "HTML5", "CSS3"],
  },
  {
    icon: "🗄",
    key: "skills.dataML",
    pills: ["PostgreSQL", "Redis", "TensorFlow", "scikit-learn", "LLM APIs"],
  },
  {
    icon: "⚙",
    key: "skills.devops",
    pills: ["Docker", "GitHub Actions", "CI/CD", "AWS EC2/S3", "Git"],
  },
  {
    icon: "💬",
    key: "skills.languages",
    pills: ["Java", "Python", "TypeScript", "JavaScript", "SQL"],
  },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-slate-200 text-sm font-semibold">{name}</span>
        <span className="text-slate-500 text-sm font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-white/8 rounded-full overflow-visible relative">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-700 to-indigo-600"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={reduced ? {} : { duration: 1.1, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="py-24 px-4 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black font-heading gradient-text inline-block">
            {t("skills.title")}
          </h2>
          <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skill bars */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {skillBars.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </motion.div>

          {/* Tech pill cloud */}
          <motion.div
            className="flex flex-col gap-6"
            initial={reduced ? {} : { opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {techCategories.map((cat, i) => (
              <motion.div
                key={cat.key}
                className="glass-card p-5"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    {t(cat.key)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.pills.map((pill) => (
                    <span
                      key={pill}
                      className="px-3 py-1.5 rounded-full text-xs font-medium cursor-default bg-white/[0.05] text-slate-400 border border-white/[0.08] hover:text-slate-200 hover:border-white/[0.16] transition-colors duration-200"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
