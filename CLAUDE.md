# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Next.js, localhost:3000)
npm run build    # production build
npm start        # serve production build
```

No lint or test scripts are configured.

## Architecture

Single-page Next.js 15 portfolio. The only route is `app/page.tsx`, which renders all sections in order: `Navbar → Hero → About → Timeline → Projects → Skills → Stats → Contact → Footer`. Sections carry numbered editorial markers (`01 About`, `02 Experience`, `03 Projects`, `04 Skills`, `05 Contact`) that match this reading order and the `Navbar` links. (`Timeline` renders the "Experience" section; `Stats` is an unnumbered impact band.)

Every component in `components/` is a client component (`"use client"`). There are no server components outside of the root layout.

The design language is **Editorial Technical** — a print/Swiss-grotesque feel: warm paper ground, near-black ink, a single vermilion accent, hairline rules, numbered section markers, and type-led layouts. Avoid reintroducing gradients, glassmorphism, glows, particle/blob backgrounds, or emoji icons.

### Internationalisation

`context/LanguageContext.tsx` is the i18n hub. It:
- Creates a scoped `i18next` instance (not the global singleton) and initialises it with the JSON bundles from `locales/en.json` and `locales/fr.json`.
- Exposes `useLanguage()` (current language + setter) and wraps the tree in `I18nextProvider` so components can call `useTranslation()`.
- Persists the selected language to `localStorage` under the key `portfolio-lang`.

Translation keys live in `locales/{en,fr,ar}.json`. Arabic strings exist in the JSON files but the UI currently only switches between `en` and `fr` — `LanguageSwitcher.tsx` only renders those two options.

When adding a new translatable string, add the key to **all three** locale files.

### Animations

All animated components use `useReducedMotion()` from Framer Motion and short-circuit to `{}` (no animation) when the user has reduced-motion enabled. Follow this pattern for any new animated element. `globals.css` also collapses transitions/animations under `@media (prefers-reduced-motion: reduce)` and pauses the skills marquee.

Motion is restrained and CSS-first: a staggered page-load reveal in `Hero`, scroll-triggered `useInView` reveals per section, and the CSS marquee ticker in `Skills` (`.marquee` / `.marquee-track`).

### Contact form

`components/Contact.tsx` sends via EmailJS. Credentials are read from environment variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

These are already present in `.env` (committed — they are public browser keys, not secrets).

### CV download

`Hero.tsx` and `Navbar.tsx` both derive the CV link from the active language:
- `en` → `/TahaElBah_Resume_eng.pdf`
- `fr` → `/Taha_ElBah_CVfr%20(1).pdf`

Both PDFs must exist in `public/`.

### Styling

Tailwind is the primary styling mechanism, driven by CSS variables. The design tokens live in `app/globals.css` under `:root` — colour (`--paper`, `--ink`, `--ink-muted`, `--ink-faint`, `--accent`, `--rule`), a fluid type scale (`--step--1`…`--display`), spacing (`--section-y`, `--gutter`, `--maxw`), and motion (`--ease`, `--dur`). These are exposed to Tailwind in `tailwind.config.ts` as `bg-paper`, `text-ink`, `text-accent`, etc.

Key helper classes (in `globals.css`, not the config): `shell` (max-width container), `label` (mono uppercase metadata), `display`/`font-display`, `u-link` / `u-link-static` (animated editorial underline), `rule-t` / `rule-b` (hairlines), `section-marker`, `tnum` (tabular figures), `grain` (paper-noise overlay rendered once in the root layout), and the `marquee` ticker.

Fonts are self-hosted via `next/font/google` in the root layout:
- `--font-display` → Fraunces (high-contrast serif, the identity; `font-display`)
- `--font-body` → Mona Sans (`font-body`)
- `--font-mono` → JetBrains Mono — accent only, for labels/metadata/figures (`font-mono`)

The favicon is `app/icon.svg` (ink square, serif `T`, vermilion dot).
