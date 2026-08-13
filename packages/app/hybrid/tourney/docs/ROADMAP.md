# Roadmap

> No sign-in / sign-up required. All data stored locally in IndexedDB. Works
> offline. Export anytime to CSV or SQLite.

## Phase 1 — Core UI (Foundation)

- [x] Project setup (Next.js, TypeScript, Tailwind, DaisyUI)
- [x] IndexedDB data layer (tournaments, participants, matches)
- [x] Dashboard page with tournament list
- [x] Create tournament form (name, format, dates)
- [x] Tournament detail page (overview tab)
- [x] Basic navigation (bottom nav, breadcrumbs)
- [x] Settings page with theme switcher
- [x] Profile page (local stats, no auth)
- [x] Version page

## Phase 2 — Tournament Formats (Core Logic)

- [x] Single Elimination bracket generation
- [x] Double Elimination bracket generation
- [x] Round Robin schedule generation
- [x] Swiss System pairing algorithm
- [x] Group Stage + Knockout flow
- [x] League standings calculation
- [x] Format-specific tournament detail views

## Phase 3 — Bracket & Matches (Visualization)

- [x] Interactive bracket component
- [x] Match detail page with score entry
- [x] Bracket navigation (rounds, matches)
- [ ] Auto-advance winners
- [x] Match scheduling with calendar view
- [x] Reschedule matches (drag-and-drop)
- [ ] Bracket export (PNG, PDF)

## Phase 4 — Standings & Rankings (Data)

- [x] Standings table component
- [x] Points calculation per format
- [x] Tiebreaker rules (head-to-head, goal difference)
- [x] Live standings updates
- [x] Historical standings snapshots
- [x] Participant stats (wins, losses, draws)
- [x] Leaderboard across tournaments

## Phase 5 — Participants & Management (Organization)

- [x] Participant registration flow (no account needed)
- [x] Seeding system (manual, rating-based, random)
- [x] Group assignment for Group Stage
- [x] Team/player profiles
- [x] Tournament templates (save/load configurations)
- [x] Batch import participants (CSV)
- [x] Tournament cloning

## Phase 6 — Export & Data Portability

- [x] Export tournaments to CSV (participants, matches, standings)
- [x] Export tournaments to SQLite database
- [x] Import from CSV (participants, matches)
- [x] Import from SQLite
- [x] Full backup/restore (all data as JSON)
- [x] Share tournament as portable file

## Phase 7 — Advanced Features (Intelligence)

- [x] Smart scheduling (minimize conflicts)
- [x] Predictive standings (simulate remaining matches)
- [x] Tournament analytics (average match duration, upsets)
- [ ] Notification system (match reminders, results)
- [x] Share tournament (public link, embed)
- [ ] Live score updates (WebSocket simulation)

## Phase 8 — Platform & Integration (Ecosystem)

- [x] Tauri desktop app
- [ ] Android APK
- [ ] iOS build
- [ ] Push notifications
- [ ] Calendar integration (Google Calendar, Apple Calendar)
- [x] PWA support (installable, offline-first)
