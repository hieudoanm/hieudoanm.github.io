# Tourney

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-tourney-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-tourney-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-tourney-latest/tourney_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-tourney-latest/tourney_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-tourney-latest/tourney_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-tourney-latest/tourney_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-tourney-latest/SHA256SUMS.txt

## About

Tournaments — minimal Swiss manager for tournament organization.

## Features

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

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
