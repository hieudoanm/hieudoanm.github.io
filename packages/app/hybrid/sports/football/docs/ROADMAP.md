# Football Squad Manager — Roadmap

## Phase 1 — Core squad management

- [x] Formation catalogue for 11-, 7-, and 5-a-side (e.g. 4-4-2, 4-3-3)
- [x] Pitch rendering with positional markers
- [x] Squad roster with add/remove players
- [x] Assign players to positions via the picker
- [x] `localStorage` persistence
- [x] Unit tests (lib + components) with coverage ≥ 90%
- [x] e2e smoke tests

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

## Phase 8 — Planning

- [x] Multiple formation presets per squad
- [x] Mirror the pitch for the second half
- [x] Multiple saved lineups per squad (Plan A / Plan B)
- [x] Drag a whole line (defence / midfield / attack) in one move
- [x] Position-coverage heatmap that suggests a formation switch

## Phase 9 — Matchday depth

- [x] Score tracking with quick goal increments
- [x] Goal / card / event log with a timeline tied to the clock
- [x] Added-time (stoppage) tracking per half
- [x] Half-time whistle that pauses the clock and mirrors the pitch
- [x] Max-substitutions limit (e.g. 5) with warnings
- [x] Match state (score, clock, events) persisted to `localStorage`

## Phase 10 — Data & presentation

- [x] Team color and kit assignment rendered on the pitch
- [x] Import a roster pasted as `name, number, role` lines
- [x] Export only starters or only the bench as CSV/JSON
- [x] Printable team sheet with opponent and date header

## Phase 11 — Collaboration

- [x] Share URLs stamped with a squad version
- [x] Shared-squad history for one-click reopen of recent links
- [x] Share a URL that encodes only the active lineup

## Phase 12 — Desktop

- [x] Open / save squad files (`.squad.json`) via the native file dialog
- [x] Deep-link handling that opens a shared squad URL in the desktop app

## Phase 13 — Quality

- [x] Matchday e2e flow coverage
- [x] Visual regression snapshots in e2e

## Phase 14 — Match reports & season stats

- [ ] Post-match report: half-time + full-time score, event timeline, subs used
- [ ] Print / export the match report as PDF or PNG
- [ ] Match archive: save finished matches with their score and events
- [ ] Per-player stats across the archive (appearances, minutes, goals, cards)
- [ ] Formation and lineup win/loss record across archived matches

## Phase 15 — Availability & roster depth

- [ ] Availability RSVP per player (in / out / doubtful) on a per-match basis
- [ ] Player fitness rating field, shown in the roster and picker
- [ ] Bench sorted by availability before a match
- [ ] Structured notes (injury, suspension) that auto-warn in the picker

## Phase 16 — Backup, restore & sync

- [ ] One-click full backup / restore (squad library + match archive) as
      `.squad.json`
- [ ] Restore-point snapshots of the library before destructive edits
- [ ] Cloud sync for multi-device use (self-hosted or managed storage)

## Phase 17 — Tactics & presentation

- [ ] Draw annotations on the pitch (arrows, set-piece routines) exportable to
      PNG
- [ ] QR code beside share URLs (pairs with desktop deep-linking)
- [ ] Calendar event (iCal) for the next match from the team sheet

## Phase 18 — UX & platform

- [ ] PWA: installable and offline-capable (service worker + manifest)
- [ ] Undo / redo for roster and pitch edits
- [ ] Keyboard shortcuts (swap, bench toggle, clock start)
- [ ] More match-sheet fields: venue, referee, weather
- [ ] i18n groundwork (extract UI strings)
