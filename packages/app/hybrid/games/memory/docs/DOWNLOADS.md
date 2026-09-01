# Memory Games

> Four brain-training games — match cards, memorise Pi digits, sharpen working
> memory with N-Back, and test progressive recall. Play on phone, tablet,
> laptop, or desktop, fully offline.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────┐
│  🧠 Memory Games                │
│  ──────────────────────────────  │
│  ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 🐱  │ │ 🐶  │ │ 🐱  │       │
│  └─────┘ └─────┘ └─────┘       │
│  ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 🐸  │ │ 🐶  │ │ 🐸  │       │
│  └─────┘ └─────┘ └─────┘       │
│  ──────────────────────────────  │
│  Moves: 5  |  Pairs: 4/6       │
│  Time: 00:32                     │
└──────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-games-memory-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note              |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ----------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly  |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]            | For store upload  |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install  |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                   |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]            | Apple Silicon     |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                   |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-memory-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-memory-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-memory-latest/memory_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-memory-latest/memory_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-memory-latest/memory_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-memory-latest/memory_x64.msi

<br>

## First run

- **macOS:** Right-click the `.dmg` and select *Open* to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x memory_amd64.AppImage && ./memory_amd64.AppImage`
- **Windows SmartScreen:** Click *More info → Run anyway* if SmartScreen flags the installer.
- **Android Play Protect:** If Play Protect blocks the install, tap *Install anyway*.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-memory-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/games/memory
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Four brain-training games in one offline-first app — match emoji pairs, memorise
digits of Pi, train working memory with N-Back, and push your recall further
with progressive digit challenges. Runs on any device.

---

## Features

Brain-training games that sharpen memory, focus, and recall.

### 🎴 Memory Match
- Classic card-matching game with emoji pairs
- Multiple emoji categories to choose from
- Configurable grid size: 2-6 rows, 4-6 columns
- Move counter and timer track performance
- Matched pairs shown with progress indicator
- Cards flip with animation delays (400ms match, 800ms mismatch)
- Board locks during flip animations to prevent rapid clicks
- Win detection with final score display (moves + time)

### 🔢 Pi
- Memorize and recall digits of Pi in sequence
- Two modes: Practice (browse digits) and Game (type from memory)
- Scrolling digit viewport with highlighted current position
- On-screen numpad for touch input
- High score persistence across sessions (localStorage)
- Keyboard shortcuts: arrow keys (navigate), 0-9/. (type digits)
- Visual feedback: green flash (correct), red flash (mistake)

### 🧩 N-Back
- Cognitive training exercise for working memory
- 3x3 grid with letters appearing in sequence
- Configurable n-back level: 1, 2, or 3
- 20 stimuli per round with 1500ms display + 500ms gap
- Player responds: Match (A key) or No Match (L key)
- Scoring: hits, misses, false alarms, accuracy percentage
- Results screen with accuracy feedback (>70% = "Great!")
- 30% target probability for balanced difficulty

### 📝 Recall
- Progressive difficulty: level N shows N digits
- Memorization time scales with digit count (650ms/digit, 1.2-6s range)
- Live countdown timer during show phase
- Text input with optional mask toggle (show/hide digits)
- Chunked number display for readability (e.g., `1,234,567`)
- Mistake highlighting: correct digits in default, wrong digits in red
- High streak tracking across sessions (localStorage)
- Level resets to 1 on incorrect answer

### 🔄 Shared Features
- Responsive layout (desktop and mobile)
- Dark theme by default (`nothing` theme)
- Sticky header with navigation links
- "How to Play" instructions for each game
- Keyboard shortcuts for all games (Esc to close)
- Game card grid on home page with descriptions
- Error boundaries (not-found, error, global-error)
- Page transition animations
- Service worker for offline caching

### 📱 Platform & UX
- Static export for offline-first PWA support
- Service worker caches all pages for offline play
- Tauri desktop app build (bundling configured; signing not yet)
- PWA manifest for installability

---

## First run

---

## Next steps

- **Want to contribute?** Check [CONTRIBUTING](CONTRIBUTING) for setup and dev commands.
- **Curious what's coming?** Read the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).