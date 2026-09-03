# Tourney

> A minimal Swiss-manager tournament organizer that runs everywhere — phone,
> tablet, laptop, and desktop. Create brackets, track standings, and manage
> matches from any screen.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────┐
│  ┌─────────┬──────────┐        │
│  │ Group A │ Group B  │        │
│  │  P  W  D│  P  W  D│        │
│  │ ────────│──────────│        │
│  │ 1  9  3│ 1  9  3 │        │
│  │ 2  6  1│ 2  6  1 │        │
│  └─────────┴──────────┘        │
│  brackets │ schedule │ stats   │
└─────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-sports-tourney-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform and install directly.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |

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

<br>

¹ The `.aab` bundle is for uploading to app stores; install the `.apk` directly
on your device.

² Right-click the `.dmg`, choose **Open**, then drag the app into your
Applications folder.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-tourney-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/sports/tourney
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A tournament organizer packed with every bracket format you can think of —
Swiss, elimination, round-robin — running natively on every device you own.

---

## Features

### 🏗️ Foundation

- Project setup (Next.js, TypeScript, Tailwind, DaisyUI)
- IndexedDB data layer (tournaments, participants, matches)
- Dashboard page with tournament list
- Create tournament form (name, format, dates)
- Tournament detail page (overview tab)
- Basic navigation (bottom nav, breadcrumbs)
- Settings page with theme switcher
- Profile page (local stats, no auth)
- Version page

### 🏆 Formats

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

### 📅 Scheduling

- Match scheduling with calendar view
- Reschedule matches (drag-and-drop)
- Smart scheduling (minimize conflicts)

### 📊 Standings & Stats

- Standings table component
- Live standings updates
- Historical standings snapshots
- Participant stats (wins, losses, draws)
- Leaderboard across tournaments
- Predictive standings (simulate remaining matches)
- Tournament analytics (average match duration, upsets)

### 👥 Participants

- Participant registration flow (no account needed)
- Seeding system (manual, rating-based, random)
- Group assignment for Group Stage
- Team/player profiles
- Batch import participants (CSV)

### 📋 Templates & Sharing

- Tournament templates (save/load configurations)
- Tournament cloning
- Export tournaments to CSV (participants, matches, standings)
- Export tournaments to SQLite database
- Import from CSV (participants, matches)
- Full backup/restore (all data as JSON)
- Share tournament as portable file
- Bracket export (PNG, PDF)

### 🖥️ Platform

- Tauri desktop app
- PWA support (installable, offline-first)

---

## Next steps

- Want to contribute? Check the [CONTRIBUTING](CONTRIBUTING) guide.
- Curious what's coming? See the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
