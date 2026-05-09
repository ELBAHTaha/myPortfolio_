"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: "project1",
    gradient: "from-blue-600 to-sky-500",
    glow: "group-hover:shadow-blue-500/30",
    badge: "🟢 Live",
    tags: ["Spring Boot", "PostgreSQL", "JWT", "RBAC", "REST API"],
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: "project2",
    gradient: "from-cyan-600 to-blue-700",
    glow: "group-hover:shadow-cyan-500/30",
    badge: "🤖 ML",
    tags: ["TypeScript", "Python", "SQL", "ML", "React"],
    liveUrl: null,
    githubUrl: "https://github.com/ELBAHTaha",
  },
  {
    id: "project3",
    gradient: "from-emerald-600 to-teal-600",
    glow: "group-hover:shadow-emerald-500/30",
    badge: "🌐 Live",
    tags: ["Laravel", "React", "WooCommerce API", "CI/CD", "Hostinger"],
    liveUrl: "https://innoland.ma",
    githubUrl: null,
  },
  {
    id: "project4",
    gradient: "from-orange-500 to-red-600",
    glow: "group-hover:shadow-orange-500/30",
    badge: "📂 Open Source",
    tags: ["TypeScript", "Laravel", "React", "MySQL"],
    liveUrl: null,
    githubUrl: "https://github.com/ELBAHTaha",
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black font-heading gradient-text inline-block">
            {t("projects.title")}
          </h2>
          <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-500" />
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={`gradient-border-card group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl ${project.glow}`}
              initial={reduced ? {} : { opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Header banner */}
              <div
                className={`h-2 w-full rounded-t-2xl bg-gradient-to-r ${project.gradient}`}
              />

              <div className="p-6">
                {/* Badge + title */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      {project.badge}
                    </span>
                    <h3 className="text-lg font-bold font-heading text-white mt-1 leading-tight">
                      {t(`projects.${project.id}Title`)}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {t(`projects.${project.id}Desc`)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/6 text-slate-400 text-xs font-medium border border-white/8"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r ${project.gradient} text-white text-xs font-bold hover:opacity-90 transition-opacity`}
                    >
                      <ExternalLink size={12} />
                      {t("projects.liveDemo")}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full glass border border-white/10 text-slate-300 text-xs font-bold hover:text-white hover:border-white/20 transition-colors"
                    >
                      <Github size={12} />
                      {t("projects.github")}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
