# Features

> Eyes — visual acuity screening charts (Snellen, LogMAR, Tumbling E) as a
> hybrid web/desktop app.

## Project Foundation

- Monorepo scaffold following the `brainbow` app conventions
  (`packages/app/hybrid/medical/eyes`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `nothing` theme, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact

## Home & Navigation

- Card grid listing all three charts with icons and descriptions
- Fullscreen chart routes opened from home; closing returns to `/`
- Error shells: 404 / 403 / 401 / 500 templates plus loading state
- Offline badge driven by `useOffline`

## Snellen Chart (`/snellen/`)

- Ten lines from **20/200** down to **20/10** (1 → 10 Sloan-style letters per
  line from the `CDEFHKLNOPRSTUV` pool)
- Letters randomised on every mount — no memorised chart
- Answers hidden until revealed; reveal toggles per line
- Dot navigator for direct line jumps + Prev/Next buttons
- Arrow-key navigation through a window `keydown` handler
- First/last line bounds disable navigation at the ends

## LogMAR Chart (`/logmar/`)

- Fourteen lines from **1.0** down to **-0.3 logMAR** with Snellen equivalents
  (20/200 → 20/10) and per-line scores
- Five letters per line drawn from the `CDEFHKNPRSVZ` pool, randomised per
  session
- Same modal UX: line navigation, reveal/hide, keyboard support

## Tumbling E Chart (`/tumbling-e/`)

- Ten lines from **20/200** down to **20/10** (1 → 10 optotypes per line)
- Letter E randomised across four rotations (right / down / left / up) per
  position — suitable for illiterate or non-Latin-script patients
- Direction legend rendered with the optotype row

## Info Pages & PWA

- `/about/` — purpose, charts overview, disclaimer
- `/downloads/` — desktop release links (Linux `.AppImage` / `.deb`, macOS
  `.dmg`)
- `/version/` — build version display with copy-to-clipboard feedback
- Installable PWA: manifest + icons generated from the Tauri icon set
- Service worker caches the shell and all chart routes for offline screening

## Desktop (Tauri)

- Auto-update checks via `tauri-plugin-updater`
- Native dialogs via `tauri-plugin-dialog`
- Notifications via `tauri-plugin-notification`

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
