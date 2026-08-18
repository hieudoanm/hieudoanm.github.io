# Architecture

## Goals

- **Validated self-report scales** — eight psychometric instruments (BDI-II,
  BFI, DAS, ECR-R, GAD-7, PHQ-9, RCI-R, SWLS) in one offline-capable app
- Hybrid app that runs as a **web app** (browser) and **desktop app** (Tauri)
- Static export for offline-first PWA support
- Scoring logic as pure TypeScript functions — no backend, no native code
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
│   ├── scales/       # Self-contained scales (BeckDepressionInventory,
│   │                 # BigFiveInventory, …) each with constants.ts,
│   │                 # utils.ts, types.ts + __tests__/
│   └── templates/    # Page-level layouts (HomeTemplate, AboutTemplate,
│                     # DownloadsTemplate, VersionTemplate, ErrorTemplate,
│                     # ToolTemplate)
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
│  Templates (components/templates/)      │  HomeTemplate, ToolTemplate,
│                                         │  info templates
├─────────────────────────────────────────┤
│  Scales (components/scales/)            │  Wizard UIs + ResultsStep
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  Button, Badge, OfflineBadge
├─────────────────────────────────────────┤
│  Hooks (hooks/)                         │  useOffline, useUpdater
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  SWProvider, NativeProvider
└─────────────────────────────────────────┘
```

## Routing

Flat routes only — one route per scale, named after the instrument.

| Route                                        | Page     | Client | Purpose                              |
| -------------------------------------------- | -------- | ------ | ------------------------------------ |
| `/`                                          | page.tsx | Yes    | Home: grid of scale cards            |
| `/beck-depression-inventory/`                | page.tsx | Yes    | Beck Depression Inventory (BDI-II)   |
| `/big-five-inventory/`                       | page.tsx | Yes    | Big Five Inventory (BFI)             |
| `/dyadic-adjustment-scale/`                  | page.tsx | Yes    | Dyadic Adjustment Scale (DAS)        |
| `/experiences-in-close-relationships/`       | page.tsx | Yes    | Experiences in Close Relationships   |
| `/generalized-anxiety-disorder/`             | page.tsx | Yes    | GAD-7                                |
| `/patient-health-questionnaire/`             | page.tsx | Yes    | PHQ-9                                |
| `/relationship-closeness-inventory/`         | page.tsx | Yes    | Relationship Closeness Inventory     |
| `/satisfaction-with-life/`                   | page.tsx | Yes    | Satisfaction With Life Scale (SWLS)  |
| `/about/`                                    | page.tsx | No     | AboutTemplate                        |
| `/downloads/`                                | page.tsx | No     | DownloadsTemplate (release links)    |
| `/version/`                                  | page.tsx | No     | VersionTemplate (build version)      |

Each scale page renders its scale inside `ToolTemplate`, which owns the
fullscreen modal shell; closing returns to `/`.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** where interactivity lives (`page.tsx`, scale pages)
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` — current step, responses, and time entries
  live inside each scale component
- **Custom hooks** (`useOffline`, `useSWRegister`, `useUpdater`) encapsulate
  platform concerns
- **Context providers** wrap the app in `layout.tsx` (`SWProvider`,
  `NativeProvider`)
- No global store — scales own their state and reset on mount

## Data Flow

1. The home page renders a card per scale; clicking navigates to the route
2. The scale renders inside `ToolTemplate` as a wizard: intro step → item
   steps (with progress bar) → `ResultsStep`
3. Responses are collected into a plain array; scoring happens through pure
   functions in the scale's `utils.ts`
4. `ResultsStep` displays the score, band interpretations (and subscale /
   factor breakdowns where applicable), plus the screening disclaimer
5. Closing the modal returns to `/`; nothing persists — sessions are
   ephemeral by design

## Scoring Conventions

- Item texts, response options, and reverse-keying metadata live in each
  scale's `constants.ts`
- All scoring lives in pure functions in `utils.ts` (or `utils/scale.ts`):
  `compute<Scale>Score`, `<scale>FactorLevel`, `interpret…` — zero DOM types,
  unit-tested directly
- Reverse-keyed instruments (BFI, ECR-R, DAS, RCI-R influence) flip scores
  against the option maximum before aggregation
- Interpretation bands follow the published manuals: BDI-II 21 bands over
  0–63, GAD-7 bands at 5/10/15, SWLS seven bands over 5–35, ECR-R attachment
  quadrants split at the 4.0 midpoint, DAS four subscales totalling ≤151
- Safety-relevant items (BDI-II item 9, PHQ-9 item 9) surface an explicit
  crisis-resources alert in `ResultsStep`

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`,
  `progress`)
- **Dark theme** via the shared `nothing` theme (`data-theme="nothing"` on
  `<html>`)
- **Global base styles** in `src/styles/base.css`
- **Themes** in `src/styles/themes.css`

## Icons

- **react-icons** Phosphor set (`react-icons/pi`) for domain icons on the
  home grid
- Shared templates use Feather (`react-icons/fi`) for chrome icons
- Icons accept `className` for sizing

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- Scores recompute only when responses change — no polling or timers beyond
  the RCI-R time-entry fields
- `removeConsole` strips `console.*` in production
- Service worker caches the shell and scale routes for offline use
- PWA manifest for installability

## Native Boundaries

- **Desktop (Tauri)**: auto-update checks, system dialogs, notifications — via
  the official `tauri-plugin-updater`, `tauri-plugin-dialog`, and
  `tauri-plugin-notification` plugins
- **No custom Rust commands** — the Rust side is stock plugin wiring
  (`lib.rs`), so the web export behaves identically to the desktop app
- Feature detection in `lib/native` decides whether a call reaches Tauri IPC
