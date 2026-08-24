# Roadmap

> Phased roadmap. Shipped items live in `docs/FEATURES.md`.

## Phase 1 — Foundation (shipped)

- [x] Scaffold from psychology conventions, modernised deps
- [x] Custom light/dark themes with FOUC-free bootstrap
- [x] Home hub + ToolTemplate navigation
- [x] PWA shell (manifest + service worker) and error shells
- [x] CI workflow wired to repo release pipeline

## Phase 2 — Core tools (shipped)

- [x] Flashcards: runtime vocabulary fetch, language filter, shuffle, keyboard
      nav
- [x] Dictionary: part-of-speech groups, synonym/antonym navigation
- [x] Sign: webcam recognition with MediaPipe Hands + ONNX inference
- [x] XP/streak progress layer in IndexedDB

## Phase 3 — Learning experience

- [ ] Spaced repetition scheduling for flashcards (SM-2 style intervals)
- [x] Daily streak reminder via native notification
- [ ] Per-language progress stats on the home cards
- [ ] Quiz mode: multiple choice from dictionary entries

## Phase 4 — Sign expansion

- [ ] Two-handed sign support (currently single-hand features only)
- [ ] Phrase-level recognition with sequence models
- [ ] Practice mode with per-letter accuracy history

## Phase 5 — Platform

- [ ] Mobile stores distribution (Play Store / App Store)
- [ ] Sync progress across devices
- [ ] Additional languages beyond English vocabulary dataset
