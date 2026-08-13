# Roadmap

## Phase 1 — Core UI

> Foundation: boards, lists, cards, drag-and-drop

- [x] Board dashboard with grid of boards
- [x] Create/edit/delete boards
- [x] Board view with Kanban lists
- [x] Add/rename/delete lists
- [x] Add/edit/delete cards within lists
- [x] Drag-and-drop cards between lists
- [ ] Drag-and-drop to reorder lists
- [x] Card labels (colored dots)
- [x] Demo boards seed data
- [x] Responsive layout

## Phase 2 — Enhanced UX

> Polish: animations, keyboard shortcuts, search

- [ ] Drag-and-drop animations and placeholders
- [ ] Touch drag support (long-press on mobile)
- [ ] Keyboard shortcuts (N, Q, F)
- [ ] Search across all card titles
- [x] Card count per list badge
- [x] Collapse/expand lists
- [ ] Page transition animations (Framer Motion)
- [x] Skeleton loading states
- [x] Board background colors

## Phase 3 — Card Management

> Detail: descriptions, checklists, due dates, members

- [x] Card detail modal with description editor
- [x] Checklists with progress bar
- [ ] Due date picker with indicators (display only, no picker)
- [x] Member assignment with avatars
- [ ] Card attachments (mock)
- [ ] Card comments with timestamps
- [ ] Card cover images
- [x] Card priority levels
- [x] Copy and move card actions

## Phase 4 — Organization

> Structure: labels, archive, templates

- [x] Label management (10 colors)
- [ ] Filter board by label
- [ ] Archive cards and lists
- [ ] Restore from archive
- [ ] Board templates
- [ ] Copy list with cards
- [ ] Sort cards within list
- [x] Star/favorite boards

## Phase 5 — Views & Filtering

> Perspectives: list, calendar, timeline, filters

- [x] List view (compact table with sortable columns)
- [x] Calendar view (monthly grid with due dates)
- [x] Timeline view (Gantt-style bars)
- [ ] Filter bar (label, member, due date, priority)
- [ ] Saved filter presets
- [ ] Board search with highlighted results
- [ ] Due date drag-to-reschedule in calendar

## Phase 6 — Collaboration

> Team: activity, notifications, comments

- [ ] Activity feed per board (store + seed exist, not rendered)
- [ ] Notifications (mentions, due dates, assignments)
- [ ] Card comments with timestamps
- [ ] Member roles (admin, member, viewer)
- [ ] Board sharing (mock)
- [ ] Mention users in comments (@username)
- [ ] Activity export

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
