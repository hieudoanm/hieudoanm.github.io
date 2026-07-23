# Projects — Kanban Board

## Table of Contents

- [Projects — Kanban Board](#projects--kanban-board)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Business Features](#business-features)
        - [Boards](#boards)
        - [Lists](#lists)
        - [Cards](#cards)
        - [Card Detail](#card-detail)
        - [Labels \& Tags](#labels--tags)
        - [Checklists](#checklists)
        - [Due Dates \& Calendar](#due-dates--calendar)
        - [Members \& Assignments](#members--assignments)
        - [Views](#views)
        - [Activity \& Notifications](#activity--notifications)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [Drag \& Drop](#drag--drop)
        - [Navigation \& Routing](#navigation--routing)
        - [Code Quality](#code-quality)
        - [Keyboard Shortcuts](#keyboard-shortcuts)
        - [Page Transitions](#page-transitions)
        - [Offline Support](#offline-support)
        - [Accessibility](#accessibility)
  - [Design](#design)
    - [UX for Mobile](#ux-for-mobile)
  - [Roadmap](#roadmap)
    - [Product Roadmap](#product-roadmap)
      - [Phase 1 — Core UI](#phase-1--core-ui)
      - [Phase 2 — Enhanced UX](#phase-2--enhanced-ux)
      - [Phase 3 — Card Management](#phase-3--card-management)
      - [Phase 4 — Organization](#phase-4--organization)
      - [Phase 5 — Views \& Filtering](#phase-5--views--filtering)
      - [Phase 6 — Collaboration](#phase-6--collaboration)
      - [Phase 7 — Platform \& Integration](#phase-7--platform--integration)

---

## Overview

### Tech Stack

1. **pnpm** (always pin dependencies version)
2. **ESLint** (with next)
3. **Prettier** (with tailwindcss)
4. **Jest** (coverage >= 80%)
5. **Playwright** (coverage all page level)
6. **Next.js 16** (App Router, static export)
7. **TypeScript 6** (strict mode)
8. **Tailwind CSS 4** + **DaisyUI 5** (32 themes, dark default)
9. **Tauri 2** (desktop shell)
10. **Mock data** with IndexedDB persistence

### Pages

| #   | Route                  | Page          | Key Features                                          |
| --- | ---------------------- | ------------- | ----------------------------------------------------- |
| 1   | `/`                    | Dashboard     | All boards, recent activity, quick filters            |
| 2   | `/board/[id]`          | Board View    | Kanban lists, drag-and-drop cards, board header       |
| 3   | `/board/[id]/list`     | List View     | Compact table view of all cards in a board            |
| 4   | `/board/[id]/cal`      | Calendar View | Cards plotted on monthly calendar by due date         |
| 5   | `/board/[id]/timeline` | Timeline View | Gantt-style timeline with start/end dates             |
| 6   | `/card/[id]`           | Card Detail   | Full card view with description, checklists, activity |
| 7   | `/settings`            | Settings      | Theme, default view, notification prefs               |
| 8   | `/profile`             | Profile       | User info, avatar                                     |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages
  components/
    atoms/            # CardBadge, LabelChip, DueDateBadge, Avatar
    molecules/        # CardItem, ListItem, ChecklistItem, ActivityEntry
    organisms/        # Sidebar, BoardHeader, KanbanBoard, CalendarGrid
    templates/        # BoardTemplate, SettingsTemplate
    RouteGuard.tsx    # Auth route protection
  data/               # Mock boards, lists, cards, members
  hooks/              # useDragDrop, useBoard, useCard, useCalendar
  lib/                # IndexedDB wrapper (db.ts)
  providers/          # DataProvider, Providers, ToastProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces
  utils/              # formatDate, groupByDate, sortCards
src-tauri/            # Tauri desktop (Rust)
e2e/                  # Playwright E2E tests
```

---

## Development

### Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `input`, etc.)
- Dark theme as default
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms to molecules to organisms to templates
- `console.*` with `[Module]` prefix for structured debug logging
- `console.*` stripped in production via `compiler.removeConsole`
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` env var (default 800ms)

### Features

#### Business Features

##### Boards

- **Board grid**: Cards showing board name, list count, card count, background
  color, last activity
- **Create board**: Modal with name, background color picker (6 presets +
  custom), optional template (Blank, Project, Personal, Event)
- **Edit board**: Rename, change background, archive
- **Delete board**: Confirmation modal with type-to-confirm
- **Star board**: Pin frequently used boards to top of dashboard
- **Board background**: Solid color or gradient preset per board
- **Board templates**: Pre-populated lists and cards (Kanban, Scrum, Personal,
  Event Planning)

##### Lists

- **Kanban columns**: Horizontally scrollable lists (To Do, In Progress,
  Review, Done)
- **Create list**: Plus button at end of lists with inline name input
- **Rename list**: Double-click list title to edit
- **Delete list**: Menu option with confirmation; cards move to archive
- **Move list**: Drag list header to reorder columns
- **Copy list**: Duplicate list with all cards
- **List card count**: Badge showing number of cards per list
- **Collapse list**: Minimize to header-only; toggle to expand
- **Archive all cards**: Menu option to archive all cards in a list

##### Cards

- **Card item**: Title, label badges, due date badge, member avatars,
  checklist progress bar, attachment count
- **Create card**: Plus button at bottom of list; inline title input; Enter
  to create and open detail
- **Drag-and-drop**: Drag card between lists; visual placeholder at target;
  haptic feedback on drop
- **Quick edit**: Pencil icon on card opens inline title edit
- **Card labels**: Colored label chips; max 6 shown before "+N more"
- **Copy card**: Duplicate with "(Copy)" suffix
- **Move card**: Menu option to select target list
- **Archive card**: Move to archive; restore from board menu

##### Card Detail

- **Title**: Editable at top of detail modal
- **Description**: Textarea with markdown support; placeholder until first edit
- **Labels**: Add/remove colored labels; click to toggle
- **Checklists**: Add checklists with items; progress bar; check/uncheck;
  add/delete items
- **Due date**: Date picker; overdue (red), due soon (yellow), completed
  (green) indicators
- **Members**: Assign mock team members; avatar list
- **Attachments**: Attach files (mock: icon, name, size)
- **Activity**: Chronological feed of all changes
- **Comment**: Text comments with timestamp and author avatar
- **Cover image**: Set card cover from color or thumbnail
- **Priority**: Low / Medium / High / Urgent badge

##### Labels & Tags

- **Color labels**: 10 predefined colors
- **Label names**: Custom text per color (Bug, Feature, Urgent, etc.)
- **Filter by label**: Click label to filter board
- **Label management**: Create, rename, delete in board settings

##### Checklists

- **Add checklist**: Named checklist with item list
- **Check/uncheck items**: Click checkbox; strike-through on checked
- **Progress bar**: Visual completion percentage
- **Add item**: Inline input at bottom of checklist
- **Delete item**: X button on each item
- **Reorder items**: Drag to reorder within checklist

##### Due Dates & Calendar

- **Set due date**: Date picker with optional time
- **Overdue**: Red badge when due date passed
- **Due soon**: Yellow badge when due within 24 hours
- **Completed**: Green badge when all checklists done
- **Calendar view**: Monthly grid showing cards by due date
- **Timeline view**: Gantt-style bars showing start-end date ranges

##### Members & Assignments

- **Mock members**: 6 team members with avatar, name, email
- **Assign member**: Multi-select from member list
- **Member filter**: Filter board by assigned member
- **Unassigned**: Filter for cards with no assignee

##### Views

- **Kanban view**: Default drag-and-drop board
- **List view**: Compact table with sortable columns
- **Calendar view**: Monthly grid with card titles on due dates
- **Timeline view**: Horizontal Gantt bars
- **Filter bar**: Filter by label, member, due date, priority, completion
- **Search**: Real-time text search across all card titles and descriptions

##### Activity & Notifications

- **Activity feed**: Per-board chronological activity log
- **Notifications**: Bell icon with unread count; mentions, due dates,
  assignments
- **Notification filter**: All / Mentions / Due Dates / Assignments
- **Mark as read**: Click to mark individual notifications

#### Technical Features

##### Data & Persistence

- **IndexedDB storage**: Boards, lists, cards, labels, members, checklists,
  activity, settings in `projects-db`
- **Seed on first load**: Demo boards (Project Alpha, Personal Tasks, Event
  Planning) with pre-populated lists and cards
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
- **Optimistic UI**: Card moves apply instantly; persist in background
- **CRUD operations**: Full create/read/update/delete for all entities

##### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle with visual theme picker
- **Skeleton loading**: Board skeleton with list and card placeholders
- **Toast notifications**: Auto-dismiss with success/error/info variants
- **Responsive layout**: Full Kanban on desktop; single list on mobile

##### Drag & Drop

- **Card drag-and-drop**: Drag card between lists with visual placeholder
- **List drag-and-drop**: Reorder by dragging headers
- **Item reorder**: Drag checklist items within a list
- **Touch support**: Long-press to initiate drag on mobile
- **Drop animation**: Smooth card transition to new position

##### Navigation & Routing

- **Route groups**: `(board)`, `(settings)` for code organization
- **Dynamic routes**: `/board/[id]`, `/card/[id]`
- **Back navigation**: Consistent back button on sub-pages

##### Code Quality

- **Arrow functions**: All function declarations use arrow syntax
- **Debug logging**: `[Module]` prefix; stripped from production
- **Testing**: Jest (unit) + Playwright (E2E) framework ready
- **Atomic design**: atoms to molecules to organisms to templates

##### Keyboard Shortcuts

- **N**: Add new card to first list
- **Q**: Quick filter (open search)
- **F**: Toggle filter panel
- **Ctrl+Z / Ctrl+Shift+Z**: Undo/redo card move
- **Escape**: Close card detail
- **Enter**: Open selected card

##### Page Transitions

- **Framer Motion**: Fade + slide-up variants (opacity 0 to 1, y 12 to 0,
  200ms ease-out)

##### Offline Support

- **OfflineBanner**: Listens to online/offline events
- **Cached boards**: All data in IndexedDB; fully functional offline
- **PWA manifest**: Standalone display, portrait orientation

##### Accessibility

- **Focus-visible**: Global focus-visible:outline-primary
- **ARIA labels**: Board, lists, cards, drag handles
- **Keyboard navigation**: Full board and card navigation
- **Screen reader**: Card position and list changes announced

---

## Design

### UX for Mobile

- **Single list view** on mobile; swipe left/right to switch lists
- **Card detail** as full-screen modal on mobile
- **Touch drag**: Long-press to initiate card drag
- **Bottom action bar**: Add card, filter, view switch shortcuts
- Minimum 44px tap targets for all interactive elements
- **Haptic feedback** on drag-and-drop completion
- **Dark mode default** (`data-theme="night"`)
- Board backgrounds configurable per board

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI

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

#### Phase 2 — Enhanced UX

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

#### Phase 3 — Card Management

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

#### Phase 4 — Organization

> Structure: labels, archive, templates

- [ ] Label management (10 colors)
- [ ] Filter board by label
- [ ] Archive cards and lists
- [ ] Restore from archive
- [ ] Board templates
- [ ] Copy list with cards
- [ ] Sort cards within list
- [ ] Star/favorite boards

#### Phase 5 — Views & Filtering

> Perspectives: list, calendar, timeline, filters

- [ ] List view (compact table with sortable columns)
- [ ] Calendar view (monthly grid with due dates)
- [ ] Timeline view (Gantt-style bars)
- [ ] Filter bar (label, member, due date, priority)
- [ ] Saved filter presets
- [ ] Board search with highlighted results
- [ ] Due date drag-to-reschedule in calendar

#### Phase 6 — Collaboration

> Team: activity, notifications, comments

- [ ] Activity feed per board
- [ ] Notifications (mentions, due dates, assignments)
- [ ] Card comments with timestamps
- [ ] Member roles (admin, member, viewer)
- [ ] Board sharing (mock)
- [ ] Mention users in comments (@username)
- [ ] Activity export

#### Phase 7 — Platform & Integration

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
