# Chess

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/chess_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-chess-latest/SHA256SUMS.txt

## About

Chess — minimal chess.com / lichess.org, powered by `@chess/ts`.

## Features

## Board & Gameplay

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

## Analysis

- Multi-line analysis — best move and top alternatives
- Evaluation graph plotted over the game's moves
- Position setup mode (empty board, add/remove pieces, then FEN)
- Move classification: book, best, good, inaccuracy, mistake, blunder
- Accuracy % and game summary (best/worst moves)
- Missed win / missed mate hints
- Hanging-piece and loose-endgame blunder checks
- Study view — comments and annotation support in PGN

## Training

- Tactics trainer — puzzle queue scaled to the user's rating
- Endgame trainer — basic mates (KQ, KR, KBB, KBN vs K), tablebase positions
- Checkmate-in-N drills
- Opening trainer — spaced repetition over the ECO browser data
- Coordinates trainer — find and name squares fast
- Perft / move-division validator (available in `@chess/ts`)

## Library

- PGN library with local persistence (import/export/delete)
- Opening explorer with win-rate stats (local ECO + lichess db)
- Search games by player, opening, or ECO code
- Import from Lichess / Chess.com (archive or PGN download)
- Shareable game links (encoded PGN)

## Variants & Clocks

- Variants — crazyhouse, three-check, horde (bughouse not yet)
- Chess clock — 8 presets, Fischer/Bronstein delays, custom minutes + delay
- Custom presets with fixed delay and asymmetric per-side times
- Move-count control (moves-to-go flag) for controls like 40/90
- Sound alerts — flag fall, low-time warning, tick toggle
- Move-time log with time-usage chart
- Fullscreen over-the-board clock mode

## Stats & Pairing

- Chess Elo — FIDE rating change + performance rating calculators
- Chess Stats — Chess.com lookup, percentile vs all players and titles
- Pairing tools — round-robin / Swiss pairing and tiebreaks (Buchholz, etc.)

## Shell

- Landing page with tool cards
- Project setup (Next.js 16, TypeScript, Tailwind, DaisyUI, Jest, Playwright)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
