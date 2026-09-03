# 8-Bit Games

> Classic arcade and puzzle games with retro pixel-art style — mazes, snake, and
> dino running. Play on your phone, tablet, laptop, or desktop, fully offline.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ▓ ╔═══╗       ▓     ▓     ▓  │
│  ▓ ║   ║   ▓   ▓ ▓▓▓ ▓ ▓▓▓ ▓  │
│  ▓ ║   ▓▓▓ ▓▓▓ ▓   ▓ ▓   ▓ ▓  │
│  ▓ ║       ▓   ▓▓▓ ▓ ▓▓▓ ▓ ▓  │
│  ▓ ▓▓▓ ▓▓▓ ▓ ▓▓▓   ▓     ▓ ▓  │
│  ▓   ▓   ▓ ▓   ▓▓▓ ▓▓▓ ▓▓▓ ▓  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  Score: 128  Best: 256          │
└──────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-games-8-bit-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-8-bit-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-8-bit-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-8-bit-latest/8-bit_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-8-bit-latest/8-bit_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-8-bit-latest/8-bit_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-8-bit-latest/8-bit_x64.msi

<br>

¹ Android `.aab` — upload to Google Play or sideload via bundletool.

² macOS `.dmg` — Apple Silicon build (M1/M2/M3/M4).

## First run

- **macOS:** Right-click the `.dmg` and select _Open_ to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x 8-bit_amd64.AppImage && ./8-bit_amd64.AppImage`
- **Windows SmartScreen:** Click _More info → Run anyway_ if SmartScreen flags
  the installer.
- **Android Play Protect:** If Play Protect blocks the install, tap _Install
  anyway_.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-8-bit-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/games/8-bit
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Retro pixel-art games with a strict black, white, and red palette — generate
mazes, slither as a snake, or sprint past cacti as a dino. Three games, one
keyboard, zero internet.

---

## Features

Retro 8-bit arcade and puzzle games with a tight pixel-art aesthetic.

### 🔲 Maze

- Generate a random perfect maze on a 5×5 to 20×20 grid
- Recursive-backtracker algorithm carves passages via DFS
- BFS solver animates the shortest path from top-left to bottom-right
- Canvas-rendered with colour-coded cells: blue (start), green (path), red (end)
- Adjustable size slider
- Keyboard shortcuts: R (new maze), S (solve), Esc (close)

### 🐍 Snake

- Classic snake on a 12×12 grid
- Arrow keys steer; eating food grows the snake and adds a point
- Hitting a wall or your own body ends the game
- Speed slider (1–5) adjusts tick rate from 180ms to 60ms
- Space/P toggles pause
- Score tracking and game-over detection
- Head and food are colour-coded on a responsive grid

### 🦕 DinoRun

- Infinite runner on a 320×320 canvas
- Dino auto-runs and gains speed over time (up to 10×)
- Jump over cacti, rocks, and birds (Space / click / ArrowUp)
- AABB collision detection with forgiving 6px hitbox shrink
- Night sky with twinkling stars, drifting clouds, and moon
- Score (frames/10) and best score tracking
- Press R to restart after game over

### 🔄 Shared Features

- "How to Play" instructions modal for each game with visual examples
- Responsive layout (desktop and mobile)
- Dark theme by default (dracula), light theme option (bumblebee)
- Sticky header with theme toggle
- Back navigation to home page via Escape key
- Game card grid on home page with descriptions
- Bilingual game names (English + Japanese)

### 📱 Platform & UX

- Static export for offline-first PWA support
- Service worker caches all pages for offline play
- Tauri desktop app build (bundling configured; signing not yet)
- PWA manifest for installability

---

## First run

---

## Next steps

- **Want to contribute?** Check [CONTRIBUTING](CONTRIBUTING) for setup and dev
  commands.
- **Curious what's coming?** Read the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
