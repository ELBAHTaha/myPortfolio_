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

Single-page Next.js 15 portfolio. The only route is `app/page.tsx`, which renders all sections in order: `Navbar → Hero → About → Skills → Projects → Timeline → Stats → Contact → Footer`.

Every component in `components/` is a client component (`"use client"`). There are no server components outside of the root layout.

### Internationalisation

`context/LanguageContext.tsx` is the i18n hub. It:
- Creates a scoped `i18next` instance (not the global singleton) and initialises it with the JSON bundles from `locales/en.json` and `locales/fr.json`.
- Exposes `useLanguage()` (current language + setter) and wraps the tree in `I18nextProvider` so components can call `useTranslation()`.
- Persists the selected language to `localStorage` under the key `portfolio-lang`.

Translation keys live in `locales/{en,fr,ar}.json`. Arabic strings exist in the JSON files but the UI currently only switches between `en` and `fr` — `LanguageSwitcher.tsx` only renders those two options.

When adding a new translatable string, add the key to **all three** locale files.

### Animations

All animated components use `useReducedMotion()` from Framer Motion and short-circuit to `{}` (no animation) when the user has reduced-motion enabled. Follow this pattern for any new animated element.

`ParticleBackground` is loaded with `next/dynamic` + `ssr: false` (canvas cannot render on the server) and also skips initialisation when `prefers-reduced-motion` is set.

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
- `en` → `/TahaElBahCVeng.pdf`
- `fr` → `/Taha_ElBah_CVfr%20(1).pdf`

Both PDFs must exist in `public/`.

### Styling

Tailwind is the primary styling mechanism. Utility classes like `glass`, `glass-card`, `gradient-text`, `gradient-text-cyan`, and `mesh-bg` are defined in `app/globals.css` (not in `tailwind.config.ts`).

Fonts are loaded via `next/font/google` in the root layout:
- `--font-space-grotesk` → `font-heading`
- `--font-inter` → `font-body`

### GitHub stats

`components/GitHubStats.tsx` embeds external badge images from `github-readme-stats.vercel.app` and `github-readme-streak-stats.herokuapp.com`. These domains are allow-listed in `next.config.js`. The component renders a fallback UI when images fail to load.
