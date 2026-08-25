# Psychology — Roadmap

Validated self-report psychological scales for screening and self-reflection —
BDI-II, BFI, DAS, ECR-R, GAD-7, PHQ-9, RCI-R, SWLS. One Next.js codebase (static
export) shipped as a web app (PWA) and desktop app (Tauri). Migrated out of the
`utilities/docs` monolith into a self-contained app under
`packages/app/hybrid/medical/psychology`.

---

## Table of Contents

- [Psychology — Roadmap](#psychology--roadmap)
  - [Table of Contents](#table-of-contents)
  - [Techstack](#techstack)
  - [Phase 0 — Foundations](#phase-0--foundations)
  - [Phase 1 — Home & Navigation](#phase-1--home--navigation)
  - [Phase 2 — Screening Scales (MVP)](#phase-2--screening-scales-mvp)
  - [Phase 3 — Trait & Relationship Instruments](#phase-3--trait--relationship-instruments)
  - [Phase 4 — Info Pages & PWA](#phase-4--info-pages--pwa)
  - [Phase 5 — Testing & Quality Gates](#phase-5--testing--quality-gates)
  - [Phase 6 — Release Engineering](#phase-6--release-engineering)
  - [Phase 7 — Instrument Expansion](#phase-7--instrument-expansion)
  - [Decisions](#decisions)

---

## Techstack

1. UI: Next.js (`output: 'export'`), React, TailwindCSS + DaisyUI
2. Shell: Tauri (desktop: macOS/Linux; mobile not shipped yet)
3. Scoring logic: pure TypeScript in each scale's `utils.ts`
   (`Math.random`-free, deterministic); Rust is stock plugin wiring only
4. Storage: none — sessions are ephemeral by design
5. Package: self-contained `@hieudoanm.github.io/psychology` app under
   `packages/app/hybrid/medical/psychology`

---

## Phase 0 — Foundations

1. [x] Scaffold extracted from `brainbow` conventions (package, Tauri shell,
       styles, atoms, hooks, providers, templates)
2. [x] Next.js static export config validated against Tauri's `dist`
       expectations
3. [x] Tauri desktop shell boots and loads the exported Next.js build
       (identifier `io.github.hieudoanm.psychology`; updater endpoint + pubkey
       configured; `createUpdaterArtifacts` defaults to `false` so plain builds
       need no signing key — see `docs/PACKAGING.md`)
4. [x] App icon set generated and wired into `tauri.conf.json`, favicon, and PWA
       manifest icons
5. [x] CI: lint, typecheck, build web export, build Tauri desktop artifact

---

## Phase 1 — Home & Navigation

1. [x] Card grid home listing all eight scales with icons + descriptions
2. [x] Scale routes opened from home inside the shared `ToolTemplate` modal;
       close returns to `/`
3. [x] Error shells: 404 / 403 / 401 / 500 templates plus loading state
4. [x] Dark `nothing` theme with monospace-friendly base styles

---

## Phase 2 — Screening Scales (MVP)

1. [x] **GAD-7** — 7 items, severity bands at 5/10/15, clinical-threshold flag
       at 10 (`/generalized-anxiety-disorder/`)
2. [x] **PHQ-9** — 9 items, published severity bands, item 9 crisis alert
       (`/patient-health-questionnaire/`)
3. [x] **BDI-II** — 21 items over three steps, 21 severity bands, item 9 crisis
       alert (`/beck-depression-inventory/`)
4. [x] Shared wizard UX: intro step → item steps with progress bar → results
       step with screening disclaimer
5. [x] Crisis-resources alert path in `ResultsStep` for safety-relevant items

---

## Phase 3 — Trait & Relationship Instruments

1. [x] **BFI** — 44 items, five factor scores, reverse-keyed items, per-factor
       level interpretation (`/big-five-inventory/`)
2. [x] **DAS** — 32 items, four subscales, total out of 151 with published
       cutoff interpretation (`/dyadic-adjustment-scale/`)
3. [x] **ECR-R** — 36 items, anxiety/avoidance dimensions, attachment-style
       quadrants at the 4.0 midpoint (`/experiences-in-close-relationships/`)
4. [x] **RCI-R** — time entries (hours + minutes), activities checklist,
       influence ratings with reverse keying, plans section
       (`/relationship-closeness-inventory/`)
5. [x] **SWLS** — 5 items, seven bands from extremely dissatisfied to extremely
       satisfied (`/satisfaction-with-life/`)

---

## Phase 4 — Info Pages & PWA

1. [x] `/about/`, `/downloads/`, `/version/` pages on shared templates
2. [x] Version page with copy-to-clipboard feedback
3. [x] PWA manifest + icons; service worker caching the shell and scale routes
       for offline use
4. [x] Offline badge via `useOffline`

---

## Phase 5 — Testing & Quality Gates

1. [x] Unit tests for every scale's scoring utils, wizard components, and
       results step (≥80% global coverage enforced in `jest.config.ts`; actual
       coverage >90% statements / >91% branches)
2. [x] Band-boundary tests for every interpretation function (every edge of
       every published band)
3. [x] Reverse-keying tests including zero-rated reverse items
4. [x] Playwright e2e coverage of home navigation and the 404 route
       (`e2e/home.spec.ts`)
5. [x] Lint + format gates (`eslint`, `prettier-plugin-tailwindcss`)
6. [x] `console.*` stripped in production via `compiler.removeConsole`

---

## Phase 6 — Release Engineering

1. [ ] macOS notarization pipeline (Developer ID + notarytool credentials in CI)
       — see `docs/PACKAGING.md`
2. [ ] Signed release builds with `createUpdaterArtifacts: true` publishing
       `.sig` bundles + `latest.json` to the updater endpoint
3. [ ] `app-hybrid-psychology-latest` release tag populated with the exact
       artifact filenames referenced by `/downloads/`
4. [ ] Windows installer (NSIS/MSI) with code-signing
5. [ ] Android/iOS builds via Tauri Mobile

---

## Phase 7 — Instrument Expansion

1. [ ] State-Trait Anxiety Inventory (STAI)
2. [ ] Perceived Stress Scale (PSS-10)
3. [ ] UCLA Loneliness Scale (ULS-8)
4. [ ] Insomnia Severity Index (ISI)
5. [ ] Session history screen (opt-in, on-device): past completions with
       timestamped scores and score deltas over time
6. [ ] Result export (CSV/JSON) for clinician review or personal records
7. [ ] Multi-language UI starting with Vietnamese translations
8. [ ] Printable/PDF result summaries

---

## Decisions

Resolved product decisions:

1. **Target users**: individuals doing self-screening and self-reflection, plus
   clinicians wanting a quick digital form of paper instruments. Every results
   step carries an explicit disclaimer that self-report scores are not
   diagnoses.
2. **Ephemeral sessions by design**: no responses or scores are stored or
   transmitted. Scales reset on mount so no session data exists to leak.
   Persistence only enters as an explicit opt-in feature (Phase 7).
3. **One interaction model for eight instruments**: every scale uses the same
   wizard shell (intro → item steps with progress bar → results), so learning
   one scale teaches all.
4. **Pure-TypeScript scoring logic**: all scoring stays in testable `utils.ts`
   functions matching published manuals exactly; no Rust involvement beyond the
   standard plugin shell keeps web and desktop behaviour identical.
5. **Safety-first alerts**: safety-relevant items (BDI-II item 9, PHQ-9 item 9)
   always surface crisis resources when scored above zero — this is treated as a
   regression-level requirement, tested explicitly.
6. **Desktop-first packaging**: macOS (Apple Silicon) and Linux (`.AppImage` /
   `.deb`) ship first; Windows signing and mobile builds are tracked in Phase 6.
7. **Offline-only by design**: no backend is used or needed. The service worker
   makes the full experience available offline after the first visit.
