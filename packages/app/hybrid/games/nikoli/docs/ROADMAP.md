# Roadmap

## Phase 1 — Core

> Foundation: scaffold, first game, shared infrastructure — **done**

- [x] App scaffold (Next.js + Tauri) with dark theme
- [x] Home page with game card grid
- [x] Route groups: `(games)` and `(info)`
- [x] Shared `GameInstructions` modal component
- [x] Shared `gameData` registry (titles, instructions, visualizations)
- [x] Sudoku game (9×9 grid, generation, solving, hints)
- [x] Unit tests (Jest, 80% coverage threshold)
- [x] E2E tests (Playwright, Chromium)

## Phase 2 — More Games

> Port core Nikoli puzzle games — **done**

- [x] Nurikabe (ぬりかべ / Cell Structure — island/stream puzzle)
- [x] Masyu (ましゅ — pearl loop puzzle)
- [x] Shikaku (四角に切れ / Divide by Squares — rectangle division puzzle)
- [x] Fillomino (フィルオミノ — polyomino region puzzle)
- [x] Norinori (のりのり — domino shading puzzle)
- [x] Heyawake (へやわけ — room shading puzzle)
- [x] Each game: types, utils, hook, component
- [x] Undo/redo for all games
- [x] Auto-solve with visualization for all games
- [x] New game generation for all games

## Phase 3 — Polish

> UX improvements, persistence, animations

- [x] About page with Nikoli history and tech info
- [x] Downloads page with platform links
- [x] Version page with build timestamp
- [x] Sticky header with navigation
- [x] NotFoundTemplate for 404 page
- [ ] Puzzle history and best times (IndexedDB via `idb`)
- [ ] Score tracking and statistics per game
- [ ] Difficulty selection for all games (not just Sudoku)
- [ ] Animation transitions between games (Framer Motion via `motion`)
- [ ] Sound effects for cell placement and win state
- [ ] Keyboard navigation for grid cells
- [ ] Mobile touch gestures (long-press for shading)
- [ ] Dark/light theme toggle

## Phase 4 — More Nikoli Games

> Expand the puzzle library with classic Nikoli types

- [ ] Kakuro (カックロ / Cross Sums)
- [ ] Hashiwokakero (橋をかけろ / Bridges)
- [ ] Slitherlink (スリザーリンク / Fences)
- [ ] Hitori (ひとりにしてくれ)
- [ ] Light Up (美術館)
- [ ] Kuromasu (黒マスはどこだ)
- [ ] Numberlink (ナンバーリンク)
- [ ] Tatamibari (タタミバリ)
- [ ] Yajilin (ヤジリン / Arrow Ring)
- [ ] Tentai Show (天体ショー / Galaxies)
- [ ] Ripple Effect (波及効果)
- [ ] Gokigen Naname (ごきげんななめ / Slant)
- [ ] Nonogram / Edel (エデル / Paint by Numbers)

## Phase 5 — Advanced Features

> Expert modes, sharing, accessibility

- [ ] Expert/hard mode with larger grids
- [ ] Daily puzzle challenge (seeded by date)
- [ ] Puzzle sharing via URL (encoded puzzle state)
- [ ] Print puzzle as PDF
- [ ] Accessibility: screen reader support, high contrast mode
- [ ] Keyboard shortcuts modal
- [ ] Puzzle editor (create custom puzzles)
- [ ] Import/export puzzle definitions

## Phase 6 — Platform & Ecosystem

> Desktop, mobile, community

- [ ] Tauri desktop build and signing
- [ ] Android shell (Capacitor or Tauri Mobile)
- [ ] iOS shell
- [ ] Puzzle of the day widget
- [ ] Leaderboard (mock)
- [ ] Puzzle community features (share solutions)
- [ ] Multi-language support (Japanese, English, Chinese)
