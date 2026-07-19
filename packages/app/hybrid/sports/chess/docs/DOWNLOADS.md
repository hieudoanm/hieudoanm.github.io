# Chess

> A minimal chess.com / lichess.org hybrid that runs everywhere — phone, tablet,
> laptop, and desktop. Play against Stockfish, analyse games, train tactics, and
> run tournaments from any screen.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![chess screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/chess/home.png)

---

## Latest release

- **Version:** `app-hybrid-sports-chess-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform and install directly.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/sports/chess
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A chess workhorse — play, analyse, train, and run tournaments — powered by
`@chess/ts` and running natively on every device you own.

---

## Features

### ♟️ Board & Gameplay

- Chess board — explore + play vs Stockfish, Chess960, FEN/PGN, PNG/GIF
- Flip board orientation (play as Black or mirror)
- Show legal moves for the selected piece
- Move list in SAN with undo/redo and jump-to-move
- Pick a side / handicap (White, Black, random, material odds)
- Engine strength control (depth / Elo slider) instead of fixed depth
- Board themes and piece sets
- Coordinates on/off
- Keyboard move entry and navigation (e.g. `e4`, arrows, Ctrl+Z)
- Share position / game as a URL (lichess-style link)
- Standalone analysis of any PGN (both sides, engine on demand)

### 🔍 Analysis

- Multi-line analysis — best move and top alternatives
- Evaluation graph plotted over the game's moves
- Position setup mode (empty board, add/remove pieces, then FEN)
- Move classification: book, best, good, inaccuracy, mistake, blunder
- Accuracy % and game summary (best/worst moves)
- Missed win / missed mate hints
- Hanging-piece and loose-endgame blunder checks
- Study view — comments and annotation support in PGN

### 🧠 Training

- Tactics trainer — puzzle queue scaled to the user's rating
- Endgame trainer — basic mates (KQ, KR, KBB, KBN vs K), tablebase positions
- Checkmate-in-N drills
- Opening trainer — spaced repetition over the ECO browser data
- Coordinates trainer — find and name squares fast
- Perft / move-division validator (available in `@chess/ts`)

### 📚 Library

- PGN library with local persistence (import/export/delete)
- Opening explorer with win-rate stats (local ECO + lichess db)
- Search games by player, opening, or ECO code
- Import from Lichess / Chess.com (archive or PGN download)
- Shareable game links (encoded PGN)

### 🎲 Variants & Clocks

- Variants — crazyhouse, three-check, horde (bughouse not yet)
- Chess clock — 8 presets, Fischer/Bronstein delays, custom minutes + delay
- Custom presets with fixed delay and asymmetric per-side times
- Move-count control (moves-to-go flag) for controls like 40/90
- Sound alerts — flag fall, low-time warning, tick toggle
- Move-time log with time-usage chart
- Fullscreen over-the-board clock mode

### 📊 Stats & Pairing

- Chess Elo — FIDE rating change + performance rating calculators
- Chess Stats — Chess.com lookup, percentile vs all players and titles
- Pairing tools — round-robin / Swiss pairing and tiebreaks (Buchholz, etc.)

### 🖥️ Shell

- Landing page with tool cards
- Project setup (Next.js 16, TypeScript, Tailwind, DaisyUI, Jest, Playwright)

---

## Next steps

- Want to contribute? Check the [CONTRIBUTING](CONTRIBUTING) guide.
- Curious what's coming? See the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
