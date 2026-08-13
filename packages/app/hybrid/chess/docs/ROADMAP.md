# Roadmap

> Minimal, local-first chess toolbox. No sign-in. Data stays on device. Rules
> and engine math live in `@chess/ts`; each tool is a thin, testable layer on
> top of that module.

## Phase 1 — Core Tools (Shipped)

> Four tools behind `/`, each a self-contained component with unit tests.

- [x] Project setup (Next.js 16, TypeScript, Tailwind, DaisyUI, Jest,
      Playwright)
- [x] **Chess Board** — explore + play-vs-Stockfish, Chess960, FEN/PGN, PNG/GIF
      export, ECO openings browser
- [x] **Chess Clock** — 8 presets, Fischer/Bronstein delays, custom minutes +
      increment, undo, winner detection
- [x] **Chess Elo** — FIDE rating change + performance rating calculators
- [x] **Chess Stats** — Chess.com lookup, percentile vs all players and titles
- [x] Landing page with tool cards

## Phase 2 — Board Essentials (Shipped)

> Gap-fill the board: every chess app's board should flip, highlight, and
> navigate through a game.

- [x] Flip board orientation (play as Black or mirror)
- [x] Show legal moves for the selected piece
- [x] Move list in SAN with undo/redo and jump-to-move
- [x] Pick a side / handicap (White, Black, random, material odds)
- [x] Engine strength control (depth / Elo slider) instead of fixed depth 15
- [x] Multi-line analysis — show the best move and top alternatives
- [x] Evaluation graph plotted over the game's moves
- [x] Position setup mode (empty board, add/remove pieces, then FEN)
- [x] Board themes and piece sets
- [x] Coordinates on/off
- [x] Keyboard move entry and navigation (e.g. `e4`, arrows, Ctrl+Z)
- [x] Share position / game as a URL (lichess-style link)

## Phase 3 — Game Review (Shipped)

> Post-game insight: classify moves, report accuracy, and point out missed
> opportunities.

- [x] Standalone analysis of any PGN (both sides, engine on demand)
- [x] Move classification: book, best, good, inaccuracy, mistake, blunder
- [x] Accuracy % and game summary (best/worst moves)
- [x] Missed win / missed mate hints
- [x] Hanging-piece and loose-endgame blunder checks

## Phase 4 — Trainers (Shipped)

> Practice tools built on `@chess/ts` search + perft and the ECO dataset.

- [x] Tactics trainer — puzzle queue scaled to the user's rating
- [x] Endgame trainer — basic mates (KQ, KR, KBB, KBN vs K), tablebase positions
- [x] Checkmate-in-N drills
- [x] Opening trainer — spaced repetition over the ECO browser data
- [x] Coordinates trainer — find and name squares fast
- [x] Perft / move-division validator (already available in `@chess/ts`)
- [ ] Play vs computer with adaptive strength (auto-match rating)
- [x] Variants — crazyhouse, three-check, horde (bughouse not yet)

## Phase 5 — Game Library (Shipped)

> Save, browse, and reuse games.

- [x] PGN library with local persistence (import/export/delete)
- [x] Opening explorer with win-rate stats (local ECO + lichess db)
- [x] Search games by player, opening, or ECO code
- [x] Import from Lichess / Chess.com (archive or PGN download)
- [x] Study view — comments and annotation support in PGN
- [x] Shareable game links (encoded PGN)

## Phase 6 — Clock & OTB (Shipped)

> Make the clock tournament-ready and pair it with pairing utilities.

- [x] Custom presets with fixed delay and asymmetric per-side times
- [x] Move-count control (moves-to-go flag) for controls like 40/90
- [x] Sound alerts — flag fall, low-time warning, tick toggle
- [x] Move-time log with time-usage chart
- [x] Fullscreen over-the-board clock mode
- [x] Pairing tools — round-robin / Swiss pairing and tiebreaks (Buchholz,
      Sonneborn-Berger)

## Phase 7 — Ratings & Stats Depth

- [ ] More rating systems — USCF, Glicko-2, DWZ (lib support in `@chess/ts`,
      not wired into UI)
- [ ] Expected score and win probability display in Elo
- [ ] K-factor presets (FIDE, USCF, age, games)
- [ ] Rating history chart
- [ ] More formats (daily, puzzles) and Lichess profile support in Stats
- [ ] Fetch a player's recent games (chess.com archives API)

## Phase 8 — Platform & Polish

> Ship it everywhere and make it pleasant to use.

- [ ] Tauri desktop build (bundle, icons, release pipeline)
- [ ] PWA — offline, installable (manifest + service worker not yet shipped)
- [ ] Settings persistence (theme, board theme, clock default) in local storage
- [ ] Sound effects on the board (move, capture, check, game end)
- [ ] Accessibility — keyboard navigation, ARIA, colorblind-safe board
- [ ] E2E coverage with Playwright (currently empty)
- [ ] Export gallery — share any FEN as image / GIF at configurable sizes
