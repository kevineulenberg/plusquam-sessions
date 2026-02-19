# Changelog — Plusquam Sessions Landing Page

All notable changes to this project, in reverse chronological order.

---

## [0.4.0] — 2026-02-19 · SMTP & Vercel Fix

### Added
- `vercel.json` with rewrite rules — **critical fix** that routes `/api/*` to the serverless function instead of the React SPA
- `api/submit.js` env var guard: fails fast with a descriptive JSON response if any SMTP variable is missing (includes an `envCheck` map for debugging in Vercel logs)

### Fixed
- Added `tls: { rejectUnauthorized: false }` to nodemailer transport — required by most shared-hosting SMTP providers (Hetzner, Ionos, etc.)
- Added explicit connection timeouts (`connectionTimeout: 10000`, `greetingTimeout: 10000`, `socketTimeout: 15000`) to prevent silent failures within Vercel's function execution window
- Error response now returns the actual error message instead of a generic string, making debugging in Vercel Function Logs much easier

---

## [0.3.0] — 2026-02-19 · SMTP Integration

### Added
- `api/submit.js` — Vercel Serverless Function using `nodemailer` to send form submissions via SMTP
- `.env.example` — template with all 7 required environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_TO`)
- `nodemailer` installed as a project dependency

### Changed
- `SubmissionForm.jsx` — fully controlled form with `useState`; now POSTs JSON to `/api/submit`
- Added loading state (spinner + disabled fields to prevent double-submit)
- Added success screen with `CheckCircle` icon and confirmation message
- Added inline error display with `AlertCircle` icon and the actual server error message

---

## [0.2.0] — 2026-02-19 · Content & UX Polish

### Changed
- **Categories** — expanded from 5 to 9 topic cards with new names and descriptions:
  - *The Real Journey* · *Wins & Fails* · *Marketing That Actually Worked* · *The Sales Conversation* · *Design Decisions* · *AI & Automation* · *The Stack Behind It* · *Deep Expertise* · *Let's Build Something*
  - Section renamed from "Five Pillars of Insight" → "Find your angle."
  - Added `01`–`09` monospace badge to each card
- **Preferred Month** — replaced `<input type="date">` with a dropdown showing the next 6 months (dynamically generated via `useMemo`), starting from the current month
- **Footer** — "Contact Organizers" button replaced with "See our network" anchor linking to `https://plusquam.studio` (opens in new tab)

---

## [0.1.1] — 2026-02-19 · Performance

### Changed
- `WebGLBackground.jsx` — added `IntersectionObserver` to pause the `requestAnimationFrame` loop when the hero section scrolls out of the viewport (zero GPU cost below the fold)
- Canvas position changed from `fixed` → `absolute` and moved from `App.jsx` into `Hero.jsx`, scoped by the hero's `overflow-hidden` boundary

---

## [0.1.0] — 2026-02-19 · Initial Build

### Added
- Vite + React project scaffold
- Tailwind CSS v4 with custom design tokens:
  - `--color-background: #050505`
  - `--color-plusquam-purple: #A855F7`
- `WebGLBackground.jsx` — WebGL fragment shader (fBm domain-warping) aurora animation in Plusquam purple palette, rendered at 0.5× resolution for performance
- `Hero.jsx` — fullscreen hero with Framer Motion entrance animation; "Plusquam Sessions." headline pulsates its `textShadow` glow in a 3-second loop
- `About.jsx` — two-column layout with glassmorphism feature cards
- `Categories.jsx` — responsive 3-column grid of topic cards
- `SubmissionForm.jsx` — 6-field form inside a glassmorphism card
- `FAQ.jsx` — scroll-animated FAQ cards
- `Footer.jsx` — minimal footer with "Back to top" scroll and network link
- `postcss.config.js` with `@tailwindcss/postcss` (required for Tailwind v4)

---

## Environment Variables Reference

| Variable | Description | Example |
|---|---|---|
| `SMTP_HOST` | SMTP server hostname | `smtp.postmarkapp.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_SECURE` | `true` for SSL (port 465), else `false` | `false` |
| `SMTP_USER` | SMTP login username | `user@example.com` |
| `SMTP_PASS` | SMTP password | `secret` |
| `SMTP_FROM` | Sender address shown in received mail | `sessions@plusquam.studio` |
| `SMTP_TO` | Recipient for all form submissions | `team@plusquam.studio` |
