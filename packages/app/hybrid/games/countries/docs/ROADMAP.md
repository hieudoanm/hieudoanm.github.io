# Roadmap

## Phase 1 — Core

> Foundation: scaffold, shared country dataset, first game — **done**

- [x] App scaffold (Next.js + Tauri) with dark theme
- [x] Home page with game card grid
- [x] Route groups: `(games)` and `(info)`
- [x] Shared country dataset (`games/_shared/countries.ts`)
- [x] Wordle game (country answers, daily puzzle, physical + on-screen keyboard)
- [x] Connections game (authored puzzles, mistakes, one-away hints)
- [x] About / Downloads / Version info pages
- [x] Unit tests (Jest, 80% coverage threshold)
- [ ] E2E tests (Playwright, Chromium)

## Phase 2 — Polish

> UX improvements, persistence, feedback

- [ ] Guess/tile flip animations
- [ ] Streak tracking and statistics per game (IndexedDB via `idb`)
- [ ] Share results (emoji grid for Wordle, colored squares for Connections)
- [ ] Hard mode (Wordle: revealed hints must be reused)
- [ ] Practice mode with random (non-daily) puzzles and answer reveal
- [ ] Keyboard navigation improvements and focus management
- [ ] Sound effects for guesses and win state

## Phase 3 — More Games

> Expand the geography game library

- [x] Flag quiz — Flag Guesser (name the country from its flag) and Emoji
      Guesser (pick the flag for a country)
- [x] Country trivia — Higher or Lower (population comparison)
- [x] Border Guesser (which country does this one border?)
- [x] Continents Sort (drag countries into their continents)
- [ ] Capital cities quiz
- [ ] Globe/Map guess (GeoGuessr-style distance hints)
- [ ] Daily challenge combining all games

## Phase 4 — Content & Localization

- [ ] Larger dataset: ISO codes, continents, capitals, flags (SVG)
- [ ] Multi-language support (Vietnamese, Japanese, Chinese)
- [ ] Puzzle editor for custom Connections groups
- [ ] Import/export puzzle definitions via URL

## Phase 5 — Platform & Ecosystem

> Desktop, mobile, community

- [ ] Enable Tauri bundling (`bundle.active`) and desktop builds
- [ ] Android shell (Tauri Mobile)
- [ ] iOS shell
- [ ] Leaderboard (mock)
- [ ] Community features (share solutions, friend streaks)
