# Football Squad Manager — Roadmap

## Phase 1 — Core squad management

- [x] Formation catalogue for 11-, 7-, and 5-a-side (e.g. 4-4-2, 4-3-3)
- [x] Pitch rendering with positional markers
- [x] Squad roster with add/remove players
- [x] Assign players to positions via the picker
- [x] `localStorage` persistence
- [x] Unit tests (lib + components) with coverage ≥ 90%
- [x] e2e smoke tests
- [ ] Visual regression snapshots in e2e

## Phase 2 — Team management

- [x] Multiple named squads (save/load/switch)
- [x] Player editing (name, number, role)
- [x] Duplicate-number detection
- [x] Assign a preferred position per player

## Phase 3 — Tactics

- [x] Swap players between positions on the pitch
- [x] Drag-and-drop reordering of positions
- [x] Team stats (formation strength, position coverage)
- [x] Export/import squads as JSON
- [x] Export/import squads as CSV

## Phase 4 — Packaging

- [x] Tauri desktop wrapper (`src-tauri`)
- [x] Installer and download pages (`/downloads`, `DownloadsTemplate`)

## Phase 5 — Presentation

- [x] Export the lineup as an image (PNG)
- [x] Print-friendly lineup view
- [x] Share a lineup as a URL (encoded state)

## Phase 6 — Matchday

- [x] Mark starters vs. substitutes (bench toggle in the roster)
- [x] Bench list rendered below the pitch (bench section in the picker)
- [x] In-match substitution flow (swap a starter off the pitch)
- [x] Match clock and formation reminders (matchday panel)

## Phase 7 — Squad depth

- [x] Player notes (fitness, availability, comments)
- [x] Captain / vice-captain assignment
- [x] Sort roster by role, number, or name
- [x] Player search and filter
