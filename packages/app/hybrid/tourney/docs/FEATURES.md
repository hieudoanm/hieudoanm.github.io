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
- Automatic group-to-knockout advancement (top 2 per group via standings)
- League standings calculation
- Format-specific tournament detail views
- Interactive bracket component
- Match detail page with score entry
- Bracket navigation (rounds, matches)
- Auto-advance winners
- Best-of-N matches (bo3/bo5) with set-by-set score entry
- Sets-based match scoring (2-0 / 2-1) and penalty-shootout decisions
- Walkover / forfeit handling (advance opponent, blank scores)
- Third-place play-off (single elimination, group-stage knockout)
- Points calculation per format
- Tiebreaker priority list configurable per tournament (points, wins, goal
  difference, head-to-head, points scored)

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
