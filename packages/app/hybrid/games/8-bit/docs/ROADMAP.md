# Roadmap

## Phase 1 — Core

> Foundation: scaffold, three games, shared infrastructure — **done**

- [x] App scaffold (Next.js + Tauri) with dark theme
- [x] Home page with game card grid
- [x] Route group: `(games)`
- [x] Shared `GameInstructions` modal component
- [x] Shared `gameData` registry (titles, instructions, visualizations)
- [x] Maze game (canvas, recursive-backtracker, BFS solver)
- [x] Snake game (grid, tick loop, direction controls)
- [x] DinoRun game (canvas, requestAnimationFrame, physics)

## Phase 2 — Polish

> UX improvements, persistence, animations

- [x] Theme toggle (dracula / bumblebee)
- [x] "How to Play" instructions modal for each game
- [x] Responsive layout (desktop and mobile)
- [x] Keyboard shortcuts for all games
- [ ] Score persistence and best times (IndexedDB via `idb`)
- [ ] Difficulty selection for all games
- [ ] Animation transitions between games (Framer Motion via `motion`)
- [ ] Sound effects for game events
- [ ] Mobile touch gestures
- [ ] Dark/light theme toggle persistence

## Phase 3 — More Games

> Expand the 8-bit game library

- [ ] Tetris — classic falling-block puzzle
- [ ] Breakout — paddle and brick breaker
- [ ] Pong — two-player or vs AI
- [ ] Flappy Bird — tap to fly through pipes
- [ ] Space Invaders — shoot descending aliens
- [ ] Pac-Man — navigate maze, eat dots, avoid ghosts
- [ ] Asteroids — rotate and thrust through asteroid field
- [ ] Galaga — fixed shooter with wave progression

## Phase 4 — Advanced Features

> Expert modes, sharing, accessibility

- [ ] Daily challenge (seeded by date)
- [ ] Game sharing via URL (encoded game state)
- [ ] Print puzzle as PDF
- [ ] Accessibility: screen reader support, high contrast mode
- [ ] Keyboard shortcuts modal
- [ ] High score leaderboard (local storage)
- [ ] Multi-language support (Japanese, English, Chinese)

## Phase 5 — Platform & Ecosystem

> Desktop, mobile, community

- [ ] Tauri desktop build and signing
- [ ] Android shell (Tauri Mobile)
- [ ] iOS shell
- [ ] Game of the day widget
- [ ] Community features (share replays)
