# Architecture

## Goals

- Visual acuity **screening charts** — Snellen, LogMAR, and Tumbling E — in one
  offline-capable app
- Hybrid app that runs as a **web app** (browser) and **desktop app** (Tauri)
- Static export for offline-first PWA support
- Chart randomisation as pure TypeScript functions — no backend, no native code
  beyond the Tauri shell
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer           | Technology                         |
| --------------- | ---------------------------------- |
| Framework       | Next.js 16 (App Router, Turbopack) |
| Language        | TypeScript 6 (strict)              |
| Styling         | Tailwind CSS 4 + DaisyUI 5         |
| Icons           | react-icons (Pi set, Phosphor)     |
| Desktop         | Tauri 2 (Rust shell, no commands)  |
| Testing         | Jest + Playwright                  |
| Linting         | ESLint 10 + Prettier               |
| Package Manager | pnpm                               |

## Directory Structure

```txt
src/
├── app/              # App Router pages and layouts (+ info routes)
├── components/       # Atomic design components
│   ├── atoms/        # Smallest building blocks (Button, Badge, OfflineBadge)
│   ├── charts/       # Self-contained charts (SnellenChart, LogMARChart,
│   │                 # TumblingEChart) each with utils/ + __tests__/
│   └── templates/    # Page-level layouts (HomeTemplate, AboutTemplate,
│                     # DownloadsTemplate, VersionTemplate, ErrorTemplate)
├── hooks/            # Custom React hooks (useOffline, useSWRegister, useUpdater)
├── lib/native/       # isTauri detection + notification helpers
├── providers/        # Context providers (SWProvider, NativeProvider)
├── styles/           # Global CSS (Tailwind base layer, themes)
public/               # manifest.json, sw.js, icons
e2e/                  # Playwright specs
src-tauri/            # Tauri shell (updater + dialog + notification plugins)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  HomeTemplate, info templates
├─────────────────────────────────────────┤
│  Charts (components/charts/)            │  Fullscreen chart modals
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  Button, Badge, OfflineBadge
├─────────────────────────────────────────┤
│  Hooks (hooks/)                         │  useOffline, useUpdater
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  SWProvider, NativeProvider
└─────────────────────────────────────────┘
```

## Routing

Flat routes only — no dynamic `[id]` or `[slug]` segments.

| Route          | Page     | Client | Purpose                                |
| -------------- | -------- | ------ | -------------------------------------- |
| `/`            | page.tsx | Yes    | Home: grid of chart cards              |
| `/snellen/`    | page.tsx | Yes    | Fullscreen Snellen chart modal         |
| `/logmar/`     | page.tsx | Yes    | Fullscreen LogMAR chart modal          |
| `/tumbling-e/` | page.tsx | Yes    | Fullscreen Tumbling E chart modal      |
| `/about/`      | page.tsx | No     | AboutTemplate                          |
| `/downloads/`  | page.tsx | No     | DownloadsTemplate (release links)      |
| `/version/`    | page.tsx | No     | VersionTemplate (build version + copy) |

Chart pages render their chart inside a modal; every chart receives an
`onClose: () => void` prop wired to `router.push('/')`.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** where interactivity lives (`page.tsx`, chart pages)
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` — current line index and revealed-flag live
  inside each chart component
- **Custom hooks** (`useOffline`, `useSWRegister`, `useUpdater`) encapsulate
  platform concerns
- **Context providers** wrap the app in `layout.tsx` (`SWProvider`,
  `NativeProvider`)
- No global store — charts own their state and reset on mount

## Data Flow

1. The home page renders a card per chart; clicking navigates to the route
2. Each chart generates its optotypes on mount via its pure `generateChart()`
   util (`Math.random`-based, mockable in tests)
3. Navigation (Prev/Next buttons, dot navigator, arrow keys) moves through the
   line array and hides the revealed answer on every move
4. Closing the modal calls `onClose` → `router.push('/')`
5. Nothing persists — screening sessions are ephemeral by design

## Chart Logic Conventions

- Optotype pools and line tables live in each chart's `constants.ts` (Snellen:
  ten lines 20/200 → 20/10 over `CDEFHKLNOPRSTUV`; LogMAR: fourteen lines 1.0 →
  -0.3 with Snellen equivalents over `CDEFHKNPRSVZ`; Tumbling E: ten lines
  20/200 → 20/10 over four rotations)
- Randomisation helpers (`randomLetters`, `randomDirections`) are pure functions
  in `utils/` — zero UI imports, unit-tested directly
- Line sizing uses Tailwind arbitrary `text-[…]rem` values scaled for a
  fullscreen modal

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`, etc.)
- **Dark theme** via the shared `nothing` theme (`data-theme="nothing"` on
  `<html>`) — charts stay readable in dim exam rooms
- **Global base styles** in `src/styles/base.css`
- **Themes** in `src/styles/themes.css`

## Icons

- **react-icons** Phosphor set (`react-icons/pi`) for domain icons — e.g.
  `PiEye`, `PiChartLine`, `PiArrowsOutCardinal`
- Shared templates use Feather (`react-icons/fi`) for chrome icons
- Icons accept `className` for sizing

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- Charts regenerate only on mount — no re-render churn while navigating lines
- `removeConsole` strips `console.*` in production
- Service worker (`sw.js`) caches `/`, `/snellen/`, `/logmar/`, `/tumbling-e/`
  for offline use
- PWA manifest for installability

## Native Boundaries

- **Desktop (Tauri)**: auto-update checks, system dialogs, notifications — via
  the official `tauri-plugin-updater`, `tauri-plugin-dialog`, and
  `tauri-plugin-notification` plugins
- **No custom Rust commands** — the Rust side is stock plugin wiring (`lib.rs`),
  so the web export behaves identically to the desktop app
- Feature detection in `lib/native` decides whether a call reaches Tauri IPC
