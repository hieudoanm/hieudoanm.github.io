# Memory Games

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]            |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]            |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

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

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-memory-latest/SHA256SUMS.txt

## About

Memory Games — brain training and cognitive challenges. Four games: Memory Match
(card pairing), Pi (digit memorization), N-Back (working memory test), and
Recall (progressive digit recall).

## Features

## Games

### Memory Match (記憶マッチ / Memory Match)

- Classic card-matching game with emoji pairs
- Multiple emoji categories to choose from
- Configurable grid size: 2-6 rows, 4-6 columns
- Move counter and timer track performance
- Matched pairs shown with progress indicator
- Cards flip with animation delays (400ms match, 800ms mismatch)
- Board locks during flip animations to prevent rapid clicks
- Win detection with final score display (moves + time)

### Pi (円周率 / Pi Digit Memorization)

- Memorize and recall digits of Pi in sequence
- Two modes: Practice (browse digits) and Game (type from memory)
- Scrolling digit viewport with highlighted current position
- On-screen numpad for touch input
- High score persistence across sessions (localStorage)
- Keyboard shortcuts: arrow keys (navigate), 0-9/. (type digits)
- Visual feedback: green flash (correct), red flash (mistake)

### N-Back (Nバック / Dual N-Back)

- Cognitive training exercise for working memory
- 3x3 grid with letters appearing in sequence
- Configurable n-back level: 1, 2, or 3
- 20 stimuli per round with 1500ms display + 500ms gap
- Player responds: Match (A key) or No Match (L key)
- Scoring: hits, misses, false alarms, accuracy percentage
- Results screen with accuracy feedback (>70% = "Great!")
- 30% target probability for balanced difficulty

### Recall (数字再生 / Progressive Digit Recall)

- Progressive difficulty: level N shows N digits
- Memorization time scales with digit count (650ms/digit, 1.2-6s range)
- Live countdown timer during show phase
- Text input with optional mask toggle (show/hide digits)
- Chunked number display for readability (e.g., `1,234,567`)
- Mistake highlighting: correct digits in default, wrong digits in red
- High streak tracking across sessions (localStorage)
- Level resets to 1 on incorrect answer

## Shared Features

- Responsive layout (desktop and mobile)
- Dark theme by default (`nothing` theme)
- Sticky header with navigation links
- "How to Play" instructions for each game
- Keyboard shortcuts for all games (Esc to close)
- Game card grid on home page with descriptions
- Error boundaries (not-found, error, global-error)
- Page transition animations
- Service worker for offline caching

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
