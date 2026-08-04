# Roadmap

## Phase 1 — Core UI

> Foundation: boards, lists, cards, drag-and-drop

- [ ] Board dashboard with grid of boards
- [ ] Create/edit/delete boards
- [ ] Board view with Kanban lists
- [ ] Add/rename/delete lists
- [ ] Add/edit/delete cards within lists
- [ ] Drag-and-drop cards between lists
- [ ] Drag-and-drop to reorder lists
- [ ] Card labels (colored dots)
- [ ] Demo boards seed data
- [ ] Responsive layout

## Phase 2 — Enhanced UX

> Polish: animations, keyboard shortcuts, search

- [ ] Drag-and-drop animations and placeholders
- [ ] Touch drag support (long-press on mobile)
- [ ] Keyboard shortcuts (N, Q, F)
- [ ] Search across all card titles
- [ ] Card count per list badge
- [ ] Collapse/expand lists
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states
- [ ] Board background colors

## Phase 3 — Card Management

> Detail: descriptions, checklists, due dates, members

- [ ] Card detail modal with description editor
- [ ] Checklists with progress bar
- [ ] Due date picker with indicators
- [ ] Member assignment with avatars
- [ ] Card attachments (mock)
- [ ] Card comments with timestamps
- [ ] Card cover images
- [ ] Card priority levels
- [ ] Copy and move card actions

## Phase 4 — Organization

> Structure: labels, archive, templates

- [ ] Label management (10 colors)
- [ ] Filter board by label
- [ ] Archive cards and lists
- [ ] Restore from archive
- [ ] Board templates
- [ ] Copy list with cards
- [ ] Sort cards within list
- [ ] Star/favorite boards

## Phase 5 — Views & Filtering

> Perspectives: list, calendar, timeline, filters

- [ ] List view (compact table with sortable columns)
- [ ] Calendar view (monthly grid with due dates)
- [ ] Timeline view (Gantt-style bars)
- [ ] Filter bar (label, member, due date, priority)
- [ ] Saved filter presets
- [ ] Board search with highlighted results
- [ ] Due date drag-to-reschedule in calendar

## Phase 6 — Collaboration

> Team: activity, notifications, comments

- [ ] Activity feed per board
- [ ] Notifications (mentions, due dates, assignments)
- [ ] Card comments with timestamps
- [ ] Member roles (admin, member, viewer)
- [ ] Board sharing (mock)
- [ ] Mention users in comments (@username)
- [ ] Activity export

## Phase 7 — Platform & Integration

> Ecosystem: native, API, automation

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] API for external integrations (mock REST endpoints)
- [ ] Webhook support (mock: POST on card move)
- [ ] Email notifications (mock)
- [ ] Import from Trello/Linear CSV
- [ ] Gantt chart dependencies (mock: card A blocks card B)
- [ ] Custom fields per card
- [ ] Automation rules (if card moved to Done, check all items)
