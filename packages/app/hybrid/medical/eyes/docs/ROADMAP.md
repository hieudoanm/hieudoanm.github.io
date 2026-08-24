# Eyes — Roadmap

Visual acuity screening charts (Snellen, LogMAR, Tumbling E) for quick
vision checks anywhere. One Next.js codebase (static export) shipped as a web
app (PWA) and desktop app (Tauri). Migrated out of the `utilities/docs`
monolith into a self-contained app under `packages/app/hybrid/medical/eyes`.

---

## Table of Contents

- [Eyes — Roadmap](#eyes--roadmap)
  - [Table of Contents](#table-of-contents)
  - [Techstack](#techstack)
  - [Phase 0 — Foundations](#phase-0--foundations)
  - [Phase 1 — Home & Navigation](#phase-1--home--navigation)
  - [Phase 2 — Snellen Chart (MVP)](#phase-2--snellen-chart-mvp)
  - [Phase 3 — LogMAR Chart](#phase-3--logmar-chart)
  - [Phase 4 — Tumbling E Chart](#phase-4--tumbling-e-chart)
  - [Phase 5 — Info Pages & PWA](#phase-5--info-pages--pwa)
  - [Phase 6 — Testing & Quality Gates](#phase-6--testing--quality-gates)
  - [Phase 7 — Release Engineering](#phase-7--release-engineering)
  - [Phase 8 — Clinical Extras](#phase-8--clinical-extras)
  - [Decisions](#decisions)

---

## Techstack

1. UI: Next.js (`output: 'export'`), React, TailwindCSS + DaisyUI
2. Shell: Tauri (desktop: macOS/Linux; mobile not shipped yet)
3. Chart logic: pure TypeScript in each chart's `utils/` (`Math.random`-
   driven optotype randomisation); Rust is stock plugin wiring only
4. Storage: none — screening sessions are ephemeral by design
5. Package: self-contained `@hieudoanm.github.io/eyes` app under
   `packages/app/hybrid/medical/eyes`

---

## Phase 0 — Foundations

1. [x] Scaffold extracted from `brainbow` conventions (package, Tauri shell,
       styles, atoms, hooks, providers, templates)
2. [x] Next.js static export config validated against Tauri's `dist`
       expectations
3. [x] Tauri desktop shell boots and loads the exported Next.js build
       (identifier `io.github.hieudoanm.eyes`; updater endpoint + pubkey
       configured; `createUpdaterArtifacts` defaults to `false` so plain builds
       need no signing key — see `docs/PACKAGING.md`)
4. [x] App icon set generated and wired into `tauri.conf.json`, favicon, and
       PWA manifest icons
5. [x] CI: lint, typecheck, build web export, build Tauri desktop artifact

---

## Phase 1 — Home & Navigation

1. [x] Card grid home listing all three charts with icons + descriptions
2. [x] Fullscreen chart routes (`/snellen/`, `/logmar/`, `/tumbling-e/`) opened
       from home; close returns to `/`
3. [x] Error shells: 404 / 403 / 401 / 500 templates plus loading state
4. [x] Dark `nothing` theme with monospace-friendly base styles

---

## Phase 2 — Snellen Chart (MVP)

1. [x] Ten lines from 20/200 down to 20/10 (1 → 10 letters per line,
       `CDEFHKLNOPRSTUV` pool)
2. [x] Per-session letter randomisation via pure `generateChart()` util
3. [x] Reveal/hide answers per line
4. [x] Dot navigator for direct line jumps + Prev/Next buttons
5. [x] Arrow-key navigation via window `keydown` handler
6. [x] First/last line bounds disable navigation at the ends

---

## Phase 3 — LogMAR Chart

1. [x] Fourteen lines from 1.0 down to -0.3 logMAR with Snellen equivalents
       (20/200 → 20/10) and per-line scores
2. [x] Five letters per line drawn from the `CDEFHKNPRSVZ` pool
3. [x] Same modal UX: navigation, reveal/hide, keyboard support

---

## Phase 4 — Tumbling E Chart

1. [x] Ten lines from 20/200 down to 20/10 (1 → 10 optotypes per line)
2. [x] E randomised across four rotations (right / down / left / up) per
       position for literacy-independent screening
3. [x] Direction legend rendered alongside the optotype row

---

## Phase 5 — Info Pages & PWA

1. [x] `/about/`, `/downloads/`, `/version/` pages on shared templates
2. [x] Version page with copy-to-clipboard feedback
3. [x] PWA manifest + icons; service worker caching the shell and all chart
       routes for offline use
4. [x] Offline badge via `useOffline`

---

## Phase 6 — Testing & Quality Gates

1. [x] Unit tests for every chart util, template, hook, provider, and route
       (≥80% global coverage enforced in `jest.config.ts`)
2. [x] Playwright e2e coverage of home → Snellen → close flow plus 404
       (`e2e/home.spec.ts`)
3. [x] Lint + format gates (`eslint`, `prettier-plugin-tailwindcss`)
4. [x] `console.*` stripped in production via `compiler.removeConsole`

---

## Phase 7 — Release Engineering

1. [ ] macOS notarization pipeline (Developer ID + notarytool credentials in
       CI) — see `docs/PACKAGING.md`
2. [ ] Signed release builds with `createUpdaterArtifacts: true` publishing
       `.sig` bundles + `latest.json` to the updater endpoint
3. [ ] `app-hybrid-eyes-latest` release tag populated with the exact artifact
       filenames referenced by `/downloads/`
4. [ ] Windows installer (NSIS/MSI) with code-signing
5. [ ] Android/iOS builds via Tauri Mobile

---

## Phase 8 — Clinical Extras

1. [ ] Near-vision card (reading acuity at 35–40 cm)
2. [ ] Duochrome (red-green) test for refinement of spherical endpoint
3. [ ] Contrast sensitivity chart (e.g. Pelli-Robson style)
4. [ ] Pediatric LEA symbols / HOTV matching mode
5. [ ] Configurable testing distance calibration (3 m / 4 m / 6 m / 20 ft) with
       automatic size scaling
6. [ ] Session summary screen: last reachable line per eye, timestamped
7. [ ] Result export (CSV/JSON) for record keeping
8. [ ] Multi-language UI

---

## Decisions

Resolved product decisions:

1. **Target users**: anyone needing a quick visual acuity check — school
   screenings, field clinics, self-checks — not a replacement for a
   refractionist's exam. Every info surface carries the appropriate disclaimer.
2. **Ephemeral sessions by design**: no results are stored or transmitted.
   Charts regenerate on every mount so no session data exists to leak. Result
   persistence only enters with an explicit opt-in feature (Phase 8).
3. **Three charts, one interaction model**: all charts share the same modal
   navigation (line stepping, reveal/hide, arrow keys) so learning one teaches
   all.
4. **Pure-TypeScript chart logic**: randomisation stays in testable `utils/`
   functions; no Rust involvement beyond the standard plugin shell keeps web
   and desktop behaviour identical.
5. **Desktop-first packaging**: macOS (Apple Silicon) and Linux (`.AppImage` /
   `.deb`) ship first because they cover the clinic-desktop use case; Windows
   signing and mobile builds are tracked in Phase 7.
6. **Offline-only by design**: no backend is used or needed. The service
   worker makes the full screening experience available offline after the
   first visit.
