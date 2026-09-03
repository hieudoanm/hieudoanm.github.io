# History

> Timeline-based history games — place events in chronological order, race
> against the clock, and learn the past by ordering it yourself. Runs
> everywhere: phone, tablet, laptop, desktop.

![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────── History ────────────────┐
│  📅 Through the Years                   │
│                                         │
│  ──●──────●────●───────●──────●─────►  │
│    1776   1789  1804   1865   1969      │
│                                         │
│  American   French   end of   Moon      │
│  Indep.     Revol.   Slavery  Landing   │
│                                         │
│  Score: 820  🔥 Streak: 5  ⏱️ 12.4s    │
│  [Place event here ▼]                   │
└─────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-education-history-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 2   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            | System package   |
| 3   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]            | Apple Silicon    |
| 4   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |

[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/history_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/history_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/history_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/history_x64.msi

<br>

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/education/history
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A timeline game that makes history stick — drag events into chronological order
across 15 decks and 6 continents. Fun, competitive, and runs on any device.

---

## Features

Order events, beat the clock, and master history.

### 🔨 Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/history`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `history` theme (light default) with
  `history-dark` toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

### 🏠 Home & Navigation

- Card grid listing the tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

### 🗺️ Through the Years

- Timeline-based history game: place historical events in chronological order
- 4 game modes: Practice (unlimited), Classic (20 events), Endless (first
  mistake ends), Hardcore (one life)
- 15 deck options across 6 continents (World, Egypt, US, China, India, Iraq,
  Vietnam, Greece, Italy, UK, South Africa, Mexico, Japan, France, Germany)
- Combo scoring system: 3-streak x2, 5-streak x3, 10-streak x5
- Speed bonus: up to +50 points for quick placement
- Hint system: century → decade → neighbouring event reveal
- Browse mode: compact (by century) or spread (year-by-year) view
- Compare mode: side-by-side deck comparison
- Game over stats: score, accuracy, correct count, best streak
- Responsive timeline: click-to-place with reveal animation
- BC year support (negative years sorted correctly)

---

# First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag the
  app to your Applications folder.
- **Linux (AppImage):** `chmod +x history_amd64.AppImage` then run it — no
  install needed.
- **Windows:** SmartScreen may flag the `.msi` — click "More info" → "Run
  anyway".

---

## First run

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](LICENSE).
