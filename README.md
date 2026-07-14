# Santosh Kandari — Portfolio

A Next.js 14 + TypeScript + Tailwind portfolio, styled as a browser DevTools
inspector. Nav tabs (`Elements / Sources / Network / Console`) map to
About / Experience / Projects / Contact, each mimicking that DevTools panel's
real UI language.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict mode, `noUncheckedIndexedAccess`)
- Tailwind CSS
- lucide-react icons
- next/font for self-hosted Google Fonts (Space Grotesk, Inter, IBM Plex Mono)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The first build needs internet access to fetch
and self-host the Google Fonts — that's normal and only happens once per
machine/CI cache.

## Project structure

```
app/
  layout.tsx      → fonts, <html>/<body>, SEO metadata
  page.tsx         → assembles sections, owns scroll-spy state
  globals.css      → design tokens + custom classes (box-model, diff lines, etc.)
components/
  Nav.tsx          → devtools tab bar
  Hero.tsx         → name, summary, JSON profile card, box-model stats
  Experience.tsx   → git-diff styled work history
  Projects.tsx     → Network-tab styled project table
  Skills.tsx       → package.json styled skills block
  Contact.tsx      → terminal-styled contact section
  Footer.tsx
  Reveal.tsx       → scroll-reveal wrapper
hooks/
  useReveal.ts     → IntersectionObserver hook behind Reveal
lib/
  data.ts          → all resume content, typed
types/
  index.ts         → shared TypeScript interfaces
```

## Personalizing

All content lives in `lib/data.ts` — edit that one file to update your bio,
experience, projects, or skills without touching any component.

One thing is still a placeholder and should be updated before deploying:

- **Project links** — in `lib/data.ts`, add a real `url` for "Digital
  Bazaar" and "School Dashboard System" if/when they're deployed (they'll
  automatically switch from the "local build" style to the live "200 OK"
  style).

## Deploying

The fastest path is [Vercel](https://vercel.com) (made by the Next.js team):

```bash
npm install -g vercel
vercel
```

Or push this repo to GitHub and import it directly in the Vercel dashboard
for automatic deploys on every push.

## Accessibility & performance notes

- All interactive elements have visible focus rings (`.sk-focus`).
- Animations respect `prefers-reduced-motion`.
- Fonts are self-hosted via `next/font` (no layout shift, no external
  request at runtime).
- Sections use `scroll-mt-14` so the sticky nav doesn't overlap anchored
  content when jumping via the tab bar.
