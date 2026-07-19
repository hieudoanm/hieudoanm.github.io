# Roadmap

## Phase 1 — Core

> Foundation: scaffold, four games, shared infrastructure — **done**

- [x] App scaffold (Next.js + Tauri) with dark theme
- [x] Home page with game card grid
- [x] Route groups: `(games)` and `(info)`
- [x] Header with navigation
- [x] Memory Match game (card matching with emoji categories)
- [x] Pi game (digit memorization with practice/game modes)
- [x] N-Back game (dual n-back cognitive test)
- [x] Recall game (progressive digit recall)
- [x] Error boundaries (not-found, error, global-error)
- [x] Page transition animations
- [x] Service worker for offline caching
- [x] PWA manifest

## Phase 2 — Polish

> UX improvements, persistence, animations

- [x] High score persistence (localStorage) for Pi and Recall
- [x] Configurable grid sizes for Memory Match
- [x] Emoji category selection for Memory Match
- [x] On-screen numpad for Pi game (touch support)
- [x] Mask toggle for Recall input
- [ ] Difficulty selection for N-Back (4-back, 5-back)
- [ ] Sound effects for game events (match, correct, mistake)
- [ ] Animation transitions between games (Framer Motion via `motion`)
- [ ] Mobile touch gesture support
- [ ] Dark/light theme toggle persistence

## Phase 3 — More Games

> Expand the memory game library

- [ ] Simon — sequence memory with colours and sounds
- [ ] Spot the Difference — visual comparison memory
- [ ] Word Memory — remember and recall word lists
- [ ] Pattern Memory — remember and reproduce visual patterns
- [ ] Face-Name Association — remember faces and names
- [ ] Shopping List — remember items in order
- [ ] Trail Making — connect numbered dots from memory
- [ ] Stroop Test — colour-word interference task

## Phase 4 — Advanced Features

> Expert modes, sharing, accessibility

- [ ] Daily challenge (seeded by date)
- [ ] Game sharing via URL (encoded game state)
- [ ] Adaptive difficulty (adjusts based on performance)
- [ ] Session history and progress charts
- [ ] Accessibility: screen reader support, high contrast mode
- [ ] Keyboard shortcuts modal
- [ ] Multi-language support (Japanese, English, Chinese)
- [ ] Cognitive load metrics (response time analysis)

## Phase 5 — Platform & Ecosystem

> Desktop, mobile, community

- [ ] Tauri desktop build and signing
- [ ] Android shell (Tauri Mobile)
- [ ] iOS shell
- [ ] Brain training streak widget
- [ ] Community features (share scores, leaderboards)
