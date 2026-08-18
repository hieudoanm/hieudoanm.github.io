# 8-Bit Games

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

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

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-8-bit-latest/SHA256SUMS.txt

## About

8-Bit Games — classic arcade and puzzle games with retro pixel-art style. Three
games: Maze (pathfinding puzzle), Snake (classic arcade), and DinoRun (infinite
runner).

## Features

## Games

### Maze (迷路 / Labyrinth)

- Generate a random perfect maze on a 5×5 to 20×20 grid
- Recursive-backtracker algorithm carves passages via DFS
- BFS solver animates the shortest path from top-left to bottom-right
- Canvas-rendered with colour-coded cells: blue (start), green (path), red (end)
- Adjustable size slider
- Keyboard shortcuts: R (new maze), S (solve), Esc (close)

### Snake (スネーク / Serpent)

- Classic snake on a 12×12 grid
- Arrow keys steer; eating food grows the snake and adds a point
- Hitting a wall or your own body ends the game
- Speed slider (1–5) adjusts tick rate from 180ms to 60ms
- Space/P toggles pause
- Score tracking and game-over detection
- Head and food are colour-coded on a responsive grid

### DinoRun (ディノロッター / Dino Runner)

- Infinite runner on a 320×320 canvas
- Dino auto-runs and gains speed over time (up to 10×)
- Jump over cacti, rocks, and birds (Space / click / ArrowUp)
- AABB collision detection with forgiving 6px hitbox shrink
- Night sky with twinkling stars, drifting clouds, and moon
- Score (frames/10) and best score tracking
- Press R to restart after game over

## Shared Features

- "How to Play" instructions modal for each game with visual examples
- Responsive layout (desktop and mobile)
- Dark theme by default (dracula), light theme option (bumblebee)
- Sticky header with theme toggle
- Back navigation to home page via Escape key
- Game card grid on home page with descriptions
- Bilingual game names (English + Japanese)

## Platform & UX

- Static export for offline-first PWA support
- Service worker caches all pages for offline play
- Tauri desktop app build (bundling configured; signing not yet)
- PWA manifest for installability

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
