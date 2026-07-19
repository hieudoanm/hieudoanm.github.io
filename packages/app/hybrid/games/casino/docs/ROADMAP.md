# Roadmap

## Phase 1 — Core

> Foundation: scaffold, shared card module, first games — **done**

- [x] App scaffold (Next.js + Tauri) with dark theme
- [x] Home page with game card grid
- [x] Route groups: `(games)` and `(info)`
- [x] Shared playing-card module (`games/_shared/cards.ts`)
- [x] Baccarat (six-deck shoe, full third-card rules)
- [x] Card Counter (Hi-Lo counting trainer)
- [x] Poker Odds (Monte Carlo equity calculator)
- [x] Over Under Seven (two-dice betting)
- [x] Slot Machine (three reels, six symbols)
- [x] Roulette, Craps, War, Keno, Hi-Lo
- [x] About / Downloads / Version info pages
- [x] Unit tests (Jest, 80% coverage threshold — currently 93%+)

## Phase 2 — Polish

> UX improvements, persistence, feedback

- [ ] Reel spin and dice roll animations
- [ ] Chip denominations and adjustable bet sizes
- [ ] Streak tracking and statistics per game (IndexedDB via `idb`)
- [ ] Sound effects for wins, losses, and big payouts
- [ ] Keyboard shortcuts for deal/spin/roll

## Phase 3 — More Games

> Expand the casino library

- [ ] Blackjack with basic-strategy hints
- [ ] Video Poker (Jacks or Better paytable)
- [ ] Sic Bo (three-dice betting board)
- [ ] Pai Gow Poker
- [ ] Daily challenge combining all games

## Phase 4 — Content & Localization

- [ ] Multi-language support (Vietnamese, Japanese, Chinese)
- [ ] Strategy cards (basic strategy, craps odds reference)
- [ ] Responsible-gaming resources page

## Phase 5 — Platform & Ecosystem

> Desktop, mobile, community

- [ ] Enable Tauri bundling (`bundle.active`) and desktop builds
- [ ] Android shell (Tauri Mobile)
- [ ] iOS shell
- [ ] Leaderboard (mock)
- [ ] Community features (share big wins, friend streaks)
