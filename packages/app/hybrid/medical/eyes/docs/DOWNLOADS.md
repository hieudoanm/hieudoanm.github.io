# Eyes

> Visual acuity screening charts — Snellen, LogMAR, and Tumbling E — as a hybrid
> web/desktop app. Randomized, keyboard-friendly, and ready wherever you screen:
> phone, tablet, laptop, and desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────────┐
│  Snellen          20/20      [ Reveal ]      │
│                                              │
│              E F P                            │
│            T O Z L                            │
│           P E C F D                           │
│          L O P T C                            │
│        █ D F C Z █                           │
│                                              │
│   ◀  ───── 10 lines ──────  ▶                │
└──────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-medical-eyes-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your device — Android phones install the `.apk`, and
Linux/macOS/Windows grab their native package below.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Fedora | amd64        | 40.+         | [Download `.rpm`][download-rpm]            |                  |
| 5   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 6   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 7   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |
| 8   | Windows  |        | x64          | 10.+         | [Download `.exe`][download-exe]            | Portable         |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-eyes-latest/eyes.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-eyes-latest/eyes.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-eyes-latest/eyes.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-eyes-latest/eyes.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-eyes-latest/eyes.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-eyes-latest/eyes.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-eyes-latest/eyes.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-eyes-latest/eyes.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-eyes-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/medical/eyes
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

## First Run

Per-platform launch tips:

- **macOS** — right-click the `.dmg` then **Open** to bypass Gatekeeper the
  first time, or find the app bundle inside.
- **Linux** — make it runnable: `chmod +x eyes.AppImage` then double-click.
- **Windows** — SmartScreen may warn; choose **More info → Run anyway**.
- **Android** — if Play Protect warns, tap **Install anyway**.

---

## About

Screening your vision, one randomized line at a time. Eyes brings Snellen,
LogMAR, and Tumbling E acuity charts into a hybrid web/desktop app with
randomized letters, fullscreen routes, and keyboard navigation — so screening is
consistent, never memorized, and works on any screen.

---

## Features

Three clinically familiar charts plus a rock-solid app shell.

### 🧱 Project Foundation

- Monorepo scaffold following the `brainbow` app conventions
  (`packages/app/hybrid/medical/eyes`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `nothing` theme, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact

### 🏠 Home & Navigation

- Card grid listing all three charts with icons and descriptions
- Fullscreen chart routes opened from home; closing returns to `/`
- Error shells: 404 / 403 / 401 / 500 templates plus loading state
- Offline badge driven by `useOffline`

### 👁️ Snellen Chart (`/snellen/`)

- Ten lines from **20/200** down to **20/10** (1 → 10 Sloan-style letters per
  line from the `CDEFHKLNOPRSTUV` pool)
- Letters randomised on every mount — no memorised chart
- Answers hidden until revealed; reveal toggles per line
- Dot navigator for direct line jumps + Prev/Next buttons
- Arrow-key navigation through a window `keydown` handler
- First/last line bounds disable navigation at the ends

### 📏 LogMAR Chart (`/logmar/`)

- Fourteen lines from **1.0** down to **-0.3 logMAR** with Snellen equivalents
  (20/200 → 20/10) and per-line scores
- Five letters per line drawn from the `CDEFHKNPRSVZ` pool, randomised per
  session
- Same modal UX: line navigation, reveal/hide, keyboard support

### 🔠 Tumbling E Chart (`/tumbling-e/`)

- Ten lines from **20/200** down to **20/10** (1 → 10 optotypes per line)
- Letter E randomised across four rotations (right / down / left / up) per
  position — suitable for illiterate or non-Latin-script patients
- Direction legend rendered with the optotype row

### ℹ️ Info Pages & PWA

- `/about/` — purpose, charts overview, disclaimer
- `/downloads/` — desktop release links (Linux `.AppImage` / `.deb`, macOS
  `.dmg`)
- `/version/` — build version display with copy-to-clipboard feedback
- Installable PWA: manifest + icons generated from the Tauri icon set
- Service worker caches the shell and all chart routes for offline screening

### 🖥️ Desktop (Tauri)

- Auto-update checks via `tauri-plugin-updater`
- Native dialogs via `tauri-plugin-dialog`
- Notifications via `tauri-plugin-notification`

---

## First run

---

## Next steps

- [CONTRIBUTING](CONTRIBUTING) — set up the dev environment and start tinkering.
- [ROADMAP](ROADMAP) — see what's coming next on the roadmap.

---

## License

See [LICENSE](LICENSE).
