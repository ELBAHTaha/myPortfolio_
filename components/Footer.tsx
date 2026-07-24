"use client";

import { useTranslation } from "react-i18next";

const navLinks = ["about", "experience", "projects", "skills", "contact"];
const socials = [
  { label: "GitHub", href: "https://github.com/ELBAHTaha" },
  { label: "LinkedIn", href: "https://linkedin.com/in/tahaelbah" },
  { label: "Email", href: "mailto:tahaelbah@gmail.com" },
];

export default function Footer() {
  const { t } = useTranslation();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-ink">
      <div className="shell py-14 md:py-20 grid grid-cols-12 gap-y-12 gap-x-8">
        {/* Wordmark */}
        <div className="col-span-12 md:col-span-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-ink leading-none cursor-pointer text-left"
            style={{ fontSize: "var(--step-3)" }}
            aria-label="Back to top"
          >
            Taha El Bah
          </button>
          <p className="label text-ink-muted mt-6">{t("footer.built")}</p>
        </div>

        {/* Index */}
        <nav className="col-span-6 md:col-span-3" aria-label="Footer">
          <p className="label text-ink-faint mb-4">Index</p>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((id) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="text-ink-muted hover:text-ink transition-colors duration-200 capitalize cursor-pointer"
                >
                  {t(`nav.${id}`)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Elsewhere */}
        <div className="col-span-6 md:col-span-3">
          <p className="label text-ink-faint mb-4">Elsewhere</p>
          <ul className="flex flex-col gap-2.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-ink u-link"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Baseline */}
      <div className="shell border-t border-rule py-6 flex flex-col sm:flex-row items-baseline justify-between gap-2">
        <span className="font-mono text-[0.7rem] text-ink-muted">
          {t("footer.copyright")}
        </span>
        <span className="font-mono text-[0.7rem] text-ink-muted uppercase tracking-wide">
          Morocco — GMT+1
        </span>
      </div>
    </footer>
  );
}
