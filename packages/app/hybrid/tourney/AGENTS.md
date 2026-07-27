# Tourney

Tournament management app — create, manage, and track competitions across
multiple formats.

## Table of Contents

- [Tourney](#tourney)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Business Features](#business-features)
        - [Tournament Management](#tournament-management)
        - [Formats](#formats)
        - [Participants](#participants)
        - [Matches](#matches)
        - [Bracket Visualization](#bracket-visualization)
        - [Standings \& Rankings](#standings--rankings)
        - [Scheduling](#scheduling)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [Navigation \& Routing](#navigation--routing)
        - [Bracket Rendering](#bracket-rendering)
        - [Code Quality](#code-quality)
        - [Keyboard Shortcuts](#keyboard-shortcuts)
        - [Page Transitions](#page-transitions)
        - [Offline Support](#offline-support)
        - [Accessibility](#accessibility)
        - [Tournament Engine](#tournament-engine)
  - [Design](#design)
    - [UX for Mobile](#ux-for-mobile)
      - [Layout](#layout)
      - [Touch Targets](#touch-targets)
      - [Forms](#forms)
      - [Navigation Patterns](#navigation-patterns)
      - [Feedback](#feedback)
      - [Lists \& Scrolling](#lists--scrolling)
      - [Modals](#modals)
      - [Theming](#theming)
  - [Roadmap](#roadmap)
    - [Phase 1 — Core UI (Foundation)](#phase-1--core-ui-foundation)
    - [Phase 2 — Tournament Formats (Core Logic)](#phase-2--tournament-formats-core-logic)
    - [Phase 3 — Bracket \& Matches (Visualization)](#phase-3--bracket--matches-visualization)
    - [Phase 4 — Standings \& Rankings (Data)](#phase-4--standings--rankings-data)
    - [Phase 5 — Participants \& Management (Organization)](#phase-5--participants--management-organization)
    - [Phase 6 — Export \& Data Portability](#phase-6--export--data-portability)
    - [Phase 7 — Advanced Features (Intelligence)](#phase-7--advanced-features-intelligence)
    - [Phase 8 — Platform \& Integration (Ecosystem)](#phase-8--platform--integration-ecosystem)

## Overview

### Tech Stack

| Layer           | Tool                       |
| --------------- | -------------------------- |
| Package Manager | pnpm 11.17.0               |
| Linter          | ESLint 10                  |
| Formatter       | Prettier 3                 |
| Unit Tests      | Jest 30                    |
| E2E Tests       | Playwright 1               |
| Framework       | Next.js 16 (App Router)    |
| Language        | TypeScript 6               |
| Styling         | Tailwind CSS 4 + DaisyUI 5 |
| Desktop         | Tauri 2                    |
| Data            | Mock data with IndexedDB   |

### Pages

| #   | Route           | Page              | Key Features                                                 |
| --- | --------------- | ----------------- | ------------------------------------------------------------ |
| 1   | `/`             | Dashboard         | Tournament list, search, filter by status/format, create new |
| 2   | `/create`       | Create Tournament | Name, format selection, participants, rules, schedule        |
| 3   | `/tournament`   | Tournament Detail | Overview, bracket/standings, matches, settings (via `?id=`)  |
| 4   | `/bracket`      | Bracket View      | Visual bracket for elimination formats (via `?id=`)          |
| 5   | `/standings`    | Standings         | Rankings, points, win/loss records (via `?id=`)              |
| 6   | `/matches`      | Match List        | All matches, results, scheduling (via `?id=`)                |
| 7   | `/participants` | Participants      | Team/player list, seeding, registration (via `?id=`)         |
| 8   | `/match`        | Match Detail      | Score entry, match history, notes (via `?id=`)               |
| 9   | `/settings`     | Settings          | Theme, notifications, default format                         |
| 10  | `/profile`      | Profile           | User info, tournament history                                |
| 11  | `/version`      | Version           | App version info                                             |

### File Structure

```txt
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── bracket/
│   ├── create/
│   ├── match/
│   ├── matches/
│   ├── participants/
│   ├── settings/
│   ├── profile/
│   ├── standings/
│   ├── tournament/
│   └── version/
├── components/
│   ├── atoms/              # Smallest building blocks
│   ├── molecules/          # Groups of atoms
│   ├── organisms/          # Complex UI sections
│   └── templates/          # Page-level layouts
├── data/                   # Mock data, seed data
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, helpers
├── providers/              # React Context providers
├── styles/                 # Global CSS, Tailwind config
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## Development

### Key Conventions

1. **Arrow functions** — `const Component: FC<Props> = ({ prop }) => (...)`
2. **Explicit types** — All props, state, and return types annotated
3. **Path aliases** — `@/*` maps to `src/*`
4. **DaisyUI classes** — Use DaisyUI utility classes over raw Tailwind where
   possible
5. **Dark theme default** — `data-theme="night"` on `<html>`
6. **Prettier** — Run `pnpm run format` before commit (includes
   `prettier-plugin-tailwindcss`)
7. **Atomic design** — Components organized by size: atoms → molecules →
   organisms → templates
8. **Console logging** — `console.log('[Tourney]', ...)` in development,
   stripped in production via `compiler.removeConsole`
9. **Mock delay** — Simulate network latency with `NEXT_PUBLIC_MOCK_DELAY`
   (default 800ms)

### Features

#### Business Features

##### Tournament Management

- Create tournaments with name, description, format, dates, and rules
- Edit tournament settings after creation
- Delete/cancel tournaments
- Tournament statuses: Draft, Upcoming, In Progress, Completed, Cancelled

##### Formats

- **Single Elimination** — Knockout bracket, one loss eliminates
- **Double Elimination** — Winners bracket + losers bracket, must lose twice to
  exit
- **Round Robin** — Every participant plays every other participant
- **Swiss System** — Paired rounds based on similar records, no elimination
- **Group Stage + Knockout** — Participants divided into groups, top advance to
  elimination bracket
- **League** — Season-based with home/away matches, points system

##### Participants

- Add/remove teams or individual players
- Seeding (manual or automatic based on rating)
- Group assignment for Group Stage format
- Participant profiles with stats

##### Matches

- Create matches with participants, date/time, venue
- Enter scores and results
- Match statuses: Scheduled, In Progress, Completed, Postponed, Walkover
- Head-to-head history

##### Bracket Visualization

- Interactive bracket tree for elimination formats
- Round progression display
- Click to view match details
- Auto-advance winners

##### Standings & Rankings

- Points-based standings (configurable per format)
- Tiebreaker rules (head-to-head, goal difference, etc.)
- Live updates as results are entered

##### Scheduling

- Calendar view for upcoming matches
- Drag-and-drop rescheduling
- Conflict detection
- Round/phase scheduling

#### Technical Features

##### Data & Persistence

- IndexedDB via `idb` for offline-first storage
- Mock data layer with configurable delay (`NEXT_PUBLIC_MOCK_DELAY`)
- Auto-save draft tournaments
- Export/import tournament data (JSON)

##### UI & Theming

- 32 DaisyUI themes with dark mode default
- Responsive design (mobile-first)
- Consistent spacing and typography via base HTML styles
- Page transitions with Framer Motion

##### Navigation & Routing

- Bottom navigation on mobile (Dashboard, Create, Profile)
- Breadcrumb navigation in tournament detail
- Back button support
- Deep linking to specific matches/brackets

##### Bracket Rendering

- Canvas-based bracket drawing for complex tournaments
- SVG fallback for simple brackets
- Zoom and pan for large brackets
- Print-friendly bracket export

##### Code Quality

- ESLint + Prettier enforced in CI
- TypeScript strict mode
- Jest unit tests for bracket generation, standings calculation
- Playwright E2E tests for tournament creation flow

##### Keyboard Shortcuts

- `Ctrl/Cmd + N` — New tournament
- `Ctrl/Cmd + S` — Save current form
- `Escape` — Close modal/drawer
- Arrow keys — Navigate bracket

##### Page Transitions

- Framer Motion `AnimatePresence` for route changes
- Fade + slide transitions
- Loading skeletons during transitions

##### Offline Support

- Service worker for static assets
- Queue score submissions when offline
- Sync indicator in header
- Conflict resolution on reconnect

##### Accessibility

- ARIA labels on interactive elements
- Keyboard navigation for bracket
- Screen reader announcements for score updates
- Focus management in modals

##### Tournament Engine

- Bracket generation algorithms for all 6 formats
- Round scheduling with conflict detection
- Standing calculation with tiebreakers
- Random pairing for Swiss System
- Group balancing for Group Stage

## Design

### UX for Mobile

#### Layout

- Single column layout on mobile (< 768px)
- Two column on tablet (768px - 1024px)
- Three column on desktop (> 1024px)
- Safe area padding for notched devices

#### Touch Targets

- Minimum 44px for all interactive elements
- 48px for primary actions (buttons, links)
- Adequate spacing between tappable items (8px minimum)

#### Forms

- Large input fields (48px height minimum)
- Select dropdowns instead of radio buttons on mobile
- Floating action button for primary action
- Inline validation with clear error messages

#### Navigation Patterns

- Bottom navigation bar on mobile
- Sidebar navigation on desktop
- Tab navigation within tournament detail
- Swipe between bracket rounds

#### Feedback

- Toast notifications for actions (create, update, delete)
- Loading spinners for async operations
- Pull-to-refresh on tournament list
- Optimistic updates for score entries

#### Lists & Scrolling

- Virtualized lists for tournaments with many matches
- Infinite scroll for match history
- Sticky headers for standings tables
- Swipe actions on match items (edit, reschedule)

#### Modals

- Bottom sheet on mobile for actions
- Centered modal on desktop
- Confirmation dialogs for destructive actions
- Form modals for quick edits

#### Theming

- Dark mode default (`data-theme="night"`)
- Theme switcher in settings
- Bracket colors adapt to theme
- Status colors consistent across themes

## Roadmap

> **No sign-in / sign-up required.** All data stored locally in IndexedDB. Works
> offline. Export anytime to CSV or SQLite.

### Phase 1 — Core UI (Foundation)

- [x] Project setup (Next.js, TypeScript, Tailwind, DaisyUI)
- [x] IndexedDB data layer (tournaments, participants, matches)
- [x] Dashboard page with tournament list
- [x] Create tournament form (name, format, dates)
- [x] Tournament detail page (overview tab)
- [x] Basic navigation (bottom nav, breadcrumbs)
- [x] Settings page with theme switcher
- [x] Profile page (local stats, no auth)
- [x] Version page

### Phase 2 — Tournament Formats (Core Logic)

- [x] Single Elimination bracket generation
- [x] Double Elimination bracket generation
- [x] Round Robin schedule generation
- [x] Swiss System pairing algorithm
- [x] Group Stage + Knockout flow
- [x] League standings calculation
- [x] Format-specific tournament detail views

### Phase 3 — Bracket & Matches (Visualization)

- [x] Interactive bracket component
- [x] Match detail page with score entry
- [x] Bracket navigation (rounds, matches)
- [ ] Auto-advance winners
- [ ] Match scheduling with calendar view
- [ ] Reschedule matches (drag-and-drop)
- [ ] Bracket export (PNG, PDF)

### Phase 4 — Standings & Rankings (Data)

- [x] Standings table component
- [x] Points calculation per format
- [x] Tiebreaker rules (head-to-head, goal difference)
- [x] Live standings updates
- [ ] Historical standings snapshots
- [x] Participant stats (wins, losses, draws)
- [ ] Leaderboard across tournaments

### Phase 5 — Participants & Management (Organization)

- [x] Participant registration flow (no account needed)
- [ ] Seeding system (manual, rating-based, random)
- [ ] Group assignment for Group Stage
- [ ] Team/player profiles
- [ ] Tournament templates (save/load configurations)
- [ ] Batch import participants (CSV)
- [ ] Tournament cloning

### Phase 6 — Export & Data Portability

- [x] Export tournaments to CSV (participants, matches, standings)
- [x] Export tournaments to SQLite database
- [ ] Import from CSV (participants, matches)
- [x] Import from SQLite
- [x] Full backup/restore (all data as JSON)
- [x] Share tournament as portable file

### Phase 7 — Advanced Features (Intelligence)

- [x] Smart scheduling (minimize conflicts)
- [x] Predictive standings (simulate remaining matches)
- [x] Tournament analytics (average match duration, upsets)
- [ ] Notification system (match reminders, results)
- [x] Share tournament (public link, embed)
- [ ] Live score updates (WebSocket simulation)

### Phase 8 — Platform & Integration (Ecosystem)

- [ ] Tauri desktop app
- [ ] Android APK
- [ ] iOS build
- [ ] Push notifications
- [ ] Calendar integration (Google Calendar, Apple Calendar)
- [x] PWA support (installable, offline-first)
