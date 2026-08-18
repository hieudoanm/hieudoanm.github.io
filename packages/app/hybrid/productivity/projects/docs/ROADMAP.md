# Roadmap

## Phase 1 — Core UI

> Foundation: boards, lists, cards, drag-and-drop

- [x] Board dashboard with grid of boards
- [x] Create/edit/delete boards
- [x] Board view with Kanban lists
- [x] Add/rename/delete lists
- [x] Add/edit/delete cards within lists
- [x] Drag-and-drop cards between lists
- [x] Drag-and-drop to reorder lists
- [x] Card labels (colored dots)
- [x] Demo boards seed data
- [x] Responsive layout

## Phase 2 — Enhanced UX

> Polish: animations, keyboard shortcuts, search

- [x] Drag-and-drop animations and placeholders
- [x] Touch drag support (long-press on mobile)
- [x] Keyboard shortcuts (N, Q, F)
- [x] Search across all card titles
- [x] Card count per list badge
- [x] Collapse/expand lists
- [x] Page transition animations (Framer Motion)
- [x] Skeleton loading states
- [x] Board background colors

## Phase 3 — Card Management

> Detail: descriptions, checklists, due dates, members

- [x] Card detail modal with description editor
- [x] Checklists with progress bar
- [x] Due date picker with indicators
- [x] Member assignment with avatars
- [x] Card attachments (mock)
- [x] Card comments with timestamps
- [x] Card cover images
- [x] Card priority levels
- [x] Copy and move card actions

## Phase 4 — Organization

> Structure: labels, archive, templates

- [x] Label management (10 colors)
- [x] Filter board by label
- [x] Archive cards and lists
- [x] Restore from archive
- [x] Board templates
- [x] Copy list with cards
- [x] Sort cards within list
- [x] Star/favorite boards

## Phase 5 — Views & Filtering

> Perspectives: list, calendar, timeline, filters

- [x] List view (compact table with sortable columns)
- [x] Calendar view (monthly grid with due dates)
- [x] Timeline view (Gantt-style bars)
- [x] Filter bar (label, member, due date, priority)
- [x] Saved filter presets
- [x] Board search with highlighted results
- [x] Due date drag-to-reschedule in calendar

## Phase 6 — Collaboration

> Team: activity, notifications, comments

- [x] Activity feed per board (store + seed exist, now rendered)
- [x] Notifications (mentions, due dates, assignments)
- [x] Card comments with timestamps
- [x] Member roles (admin, member, viewer)
- [x] Board sharing (mock)
- [x] Mention users in comments (@username)
- [x] Activity export

## Phase 7 — Platform & Integration

> Ecosystem: native, API, automation

- [x] Tauri desktop app build (bundling configured; signing not yet)
- [x] iOS/Android native shells (Tauri mobile entry point wired)
- [ ] API for external integrations (mock REST endpoints)
- [ ] Webhook support (mock: POST on card move)
- [ ] Email notifications (mock)
- [ ] Import from Trello/Linear CSV
- [ ] Gantt chart dependencies (mock: card A blocks card B)
- [ ] Custom fields per card
- [ ] Automation rules (if card moved to Done, check all items)
