# Features

> Tournaments — minimal Swiss manager for tournament organization.

## Foundation

- Project setup (Next.js, TypeScript, Tailwind, DaisyUI)
- IndexedDB data layer (tournaments, participants, matches)
- Dashboard page with tournament list
- Create tournament form (name, format, dates)
- Tournament detail page (overview tab)
- Basic navigation (bottom nav, breadcrumbs)
- Settings page with theme switcher
- Profile page (local stats, no auth)
- Version page

## Formats

- Single Elimination bracket generation
- Double Elimination bracket generation
- Round Robin schedule generation
- Swiss System pairing algorithm
- Group Stage + Knockout flow
- League standings calculation
- Format-specific tournament detail views
- Interactive bracket component
- Match detail page with score entry
- Bracket navigation (rounds, matches)
- Auto-advance winners
- Points calculation per format
- Tiebreaker rules (head-to-head, goal difference)

## Scheduling

- Match scheduling with calendar view
- Reschedule matches (drag-and-drop)
- Smart scheduling (minimize conflicts)

## Standings & Stats

- Standings table component
- Live standings updates
- Historical standings snapshots
- Participant stats (wins, losses, draws)
- Leaderboard across tournaments
- Predictive standings (simulate remaining matches)
- Tournament analytics (average match duration, upsets)

## Participants

- Participant registration flow (no account needed)
- Seeding system (manual, rating-based, random)
- Group assignment for Group Stage
- Team/player profiles
- Batch import participants (CSV)

## Templates & Sharing

- Tournament templates (save/load configurations)
- Tournament cloning
- Export tournaments to CSV (participants, matches, standings)
- Export tournaments to SQLite database
- Import from CSV (participants, matches)
- Full backup/restore (all data as JSON)
- Share tournament as portable file
- Bracket export (PNG, PDF)

## Platform

- Tauri desktop app
- PWA support (installable, offline-first)

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
