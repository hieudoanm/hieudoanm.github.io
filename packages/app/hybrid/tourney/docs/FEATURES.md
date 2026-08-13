# Features & Design

> Feature catalogue and UX guidelines for Tourney. For the phased build roadmap
> with progress tracking, see [ROADMAP.md](./ROADMAP.md).

## Business Features

### Tournament Management

- Create tournaments with name, description, format, dates, and rules
- Edit tournament settings after creation
- Delete/cancel tournaments
- Tournament statuses: Draft, Upcoming, In Progress, Completed, Cancelled

### Formats

- **Single Elimination** — Knockout bracket, one loss eliminates
- **Double Elimination** — Winners bracket + losers bracket, must lose twice to
  exit
- **Round Robin** — Every participant plays every other participant
- **Swiss System** — Paired rounds based on similar records, no elimination
- **Group Stage + Knockout** — Participants divided into groups, top advance to
  elimination bracket
- **League** — Season-based with home/away matches, points system

### Participants

- Add/remove teams or individual players
- Seeding (manual, rating-based, or random)
- Group assignment for Group Stage format
- Participant profiles with stats

### Matches

- Create matches with participants, date/time, venue
- Enter scores and results
- Match statuses: Scheduled, In Progress, Completed, Postponed, Walkover
- Head-to-head history

### Bracket Visualization

- Interactive bracket tree for elimination formats
- Round progression display
- Click to view match details
- Auto-advance winners

### Standings & Rankings

- Points-based standings (configurable per format)
- Tiebreaker rules (head-to-head, goal difference, etc.)
- Live updates as results are entered

### Scheduling

- Calendar view for upcoming matches
- Drag-and-drop rescheduling
- Conflict detection
- Round/phase scheduling

## Technical Features

### Data & Persistence

- IndexedDB via `idb` for offline-first storage
- Mock data layer with configurable delay (`NEXT_PUBLIC_MOCK_DELAY`)
- Auto-save draft tournaments
- Export/import tournament data (JSON)

### UI & Theming

- 32 DaisyUI themes with dark mode default
- Responsive design (mobile-first)
- Consistent spacing and typography via base HTML styles
- Page transitions with Framer Motion

### Navigation & Routing

- Bottom navigation on mobile (Dashboard, Create, Profile)
- Breadcrumb navigation in tournament detail
- Back button support
- Deep linking to specific matches/brackets

### Bracket Rendering

- Canvas-based bracket drawing for complex tournaments
- SVG fallback for simple brackets
- Zoom and pan for large brackets
- Print-friendly bracket export

### Code Quality

- ESLint + Prettier enforced in CI
- TypeScript strict mode
- Jest unit tests for bracket generation, standings calculation
- Playwright E2E tests for tournament creation flow

### Keyboard Shortcuts

- `Ctrl/Cmd + N` — New tournament
- `Ctrl/Cmd + S` — Save current form
- `Escape` — Close modal/drawer
- Arrow keys — Navigate bracket

### Page Transitions

- Framer Motion `AnimatePresence` for route changes
- Fade + slide transitions
- Loading skeletons during transitions

### Offline Support

- Service worker for static assets
- Queue score submissions when offline
- Sync indicator in header
- Conflict resolution on reconnect

### Accessibility

- ARIA labels on interactive elements
- Keyboard navigation for bracket
- Screen reader announcements for score updates
- Focus management in modals

### Tournament Engine

- Bracket generation algorithms for all 6 formats
- Round scheduling with conflict detection
- Standing calculation with tiebreakers
- Random pairing for Swiss System
- Group balancing for Group Stage

## Design — UX for Mobile

### Layout

- Single column layout on mobile (< 768px)
- Two column on tablet (768px - 1024px)
- Three column on desktop (> 1024px)
- Safe area padding for notched devices

### Touch Targets

- Minimum 44px for all interactive elements
- 48px for primary actions (buttons, links)
- Adequate spacing between tappable items (8px minimum)

### Forms

- Large input fields (48px height minimum)
- Select dropdowns instead of radio buttons on mobile
- Floating action button for primary action
- Inline validation with clear error messages

### Navigation Patterns

- Bottom navigation bar on mobile
- Sidebar navigation on desktop
- Tab navigation within tournament detail
- Swipe between bracket rounds

### Feedback

- Toast notifications for actions (create, update, delete)
- Loading spinners for async operations
- Pull-to-refresh on tournament list
- Optimistic updates for score entries

### Lists & Scrolling

- Virtualized lists for tournaments with many matches
- Infinite scroll for match history
- Sticky headers for standings tables
- Swipe actions on match items (edit, reschedule)

### Modals

- Bottom sheet on mobile for actions
- Centered modal on desktop
- Confirmation dialogs for destructive actions
- Form modals for quick edits

### Theming

- Dark mode default (`data-theme="night"`)
- Theme switcher in settings
- Bracket colors adapt to theme
- Status colors consistent across themes
