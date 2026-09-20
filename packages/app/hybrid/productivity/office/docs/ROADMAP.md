# Roadmap

## v1.0 — Calendar MVP ✅

- [x] 7 calendar views (3-day, daily, weekly, monthly, quarterly, half, yearly)
- [x] Year navigation with arrow buttons
- [x] View switcher dropdown
- [x] Weekday filter toggle
- [x] Month navigation in monthly view
- [x] Dark/light themes (office-dark, office-light)
- [x] Header with nav links (About, Downloads, Version)
- [x] Tauri desktop config
- [x] PWA manifest
- [x] Jest test suite
- [x] Static export

## v1.1 — Office Suite ✅

- [x] CSV spreadsheet sub-app (full + lite)
- [x] Markdown knowledge base sub-app (full + lite)
- [x] Home hub page with app cards
- [x] Lite hub page
- [x] Auth pages (sign-in, sign-up, profile, password reset)
- [x] Info pages (about, downloads, version)
- [x] Playwright e2e suite

## v1.2 — Tasks ✅

- [x] Kanban board sub-app (`/tasks/`)
- [x] Sidebar with board list, search, member switcher, archive
- [x] 4 board views: Kanban, List, Calendar, Timeline
- [x] Board filter bar (labels, members, priority, due date, presets)
- [x] Card CRUD, drag-and-drop, labels, assignees, cover, due dates
- [x] IndexedDB persistence (`office-db` via idb)
- [x] Lite to-do list (`/lite/tasks/`) — Google Tasks style
- [x] Empty, signed-out, and loading states

## v1.3 — Keynotes ✅

Migrated in from the standalone `keynotes` package.

- [x] Deck gallery with templates and import (`/keynotes/`)
- [x] Template gallery (`/keynotes/templates/`)
- [x] WYSIWYG slide editor with ruler, guides, multi-select, undo/redo, autosave
- [x] Formatting panel: fills, strokes, effects, arrange, group, position
- [x] Content objects: images, media, charts, tables, diagrams, icons, equations
- [x] Entrance / emphasis / exit animations with triggers, timing, motion paths
- [x] Slide master, sections, speaker notes, outline view
- [x] Present mode, presenter view, Q&A, rehearsal summary
- [x] Handouts (`/keynotes/handouts/[id]/`) and print / PDF (`/keynotes/print/[id]/`)
- [x] Export to native JSON, PPTX (mock), HTML, PNG, SVG
- [x] IndexedDB persistence (`office-keynotes-db` via idb)

## v1.4 — Data & Polish

- [ ] Add more event categories
- [ ] Improve event detail modal
- [ ] Keyboard shortcuts for view/year switching
- [ ] Search events by text

## v2.0 — Advanced

- [ ] Multi-calendar support (different colours)
- [ ] Recurring events
- [ ] Reminders and notifications
- [ ] Integration with external calendars (Google, Apple)
- [ ] Collaborative editing / realtime sync
- [ ] Mobile app builds via Tauri Mobile