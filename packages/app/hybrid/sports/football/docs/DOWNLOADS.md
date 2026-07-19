# Football

> A formation and squad management tool for football teams that runs everywhere
> — phone, tablet, laptop, and desktop. Build lineups, track matchday events,
> and share your XI from any screen.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────┐
│         ╔═══════════╗           │
│         ║  4-3-3     ║          │
│         ║  ○  ○  ○   ║          │
│         ║  ○  ○  ○   ║          │
│         ║  ○  ○  ○   ║          │
│         ║     ○       ║          │
│         ╚═══════════╝           │
│  roster │ tactics │ matchday    │
└─────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-sports-football-latest` — updates ship continuously.
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
| 4   | Linux    | Fedora | amd64        | 40.+         | [Download `.rpm`][download-rpm]            |                  |
| 5   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 6   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 7   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |
| 8   | Windows  |        | x64          | 10.+         | [Download `.exe`][download-exe]            | Portable         |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-football-latest/football.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-football-latest/football.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-football-latest/football.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-football-latest/football.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-football-latest/football.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-football-latest/football.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-football-latest/football.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-football-latest/football.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-sports-football-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/sports/football
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A squad and tactics manager with an interactive pitch, drag-and-drop
substitutions, and match-day clock — a football bench that fits in your pocket
and runs on every device you own.

---

## Features

### ⚽ Pitch & Formations

- Formation catalogue for 11-, 7-, and 5-a-side teams (e.g. 4-4-2, 4-3-3, 3-5-2,
  5-3-2, 2-2, etc.)
- 11-a-side formations grouped by defensive line (Back 4, Back 3, Back 5)
- Interactive pitch with positional markers, grouped by line (GK / defence /
  midfield / attack)
- Switch formation size and formation from the selector
- Store multiple formation presets per squad and switch between them
- Mirror the pitch for the second half (rotate/side-swap)

### 👥 Squad Management

- Multiple named squads: save, switch, rename, duplicate, and remove
- Add and remove players (name, shirt number, role)
- Edit players inline in the roster (name, shirt number, role, preferred
  position)
- Duplicate shirt-number detection: blocks conflicting adds/edits and warns in
  the roster
- Assign a preferred position per player; unassigned players auto-place there
- Assign players to positions via the position picker (checkbox-based)
- Auto-places a new player into a matching empty position when one exists
- `localStorage` persistence across reloads
- Example squads (e.g. Liverpool 2019-2020, Barcelona 2008-2009, Manchester City
  2022-2023) loadable onto the pitch
- Team color and kit assignment per squad, rendered on the pitch

### 🧠 Tactics

- Swap players between two positions from the picker (choose target position +
  swap)
- Drag-and-drop reordering of positions: drag a player marker onto another
  position to swap
- Team stats panel: formation strength, position coverage per role, filled/total
  positions, unassigned players
- Position-coverage heatmap that suggests a formation switch for the current
  roster
- Multiple saved lineups per squad (Plan A / Plan B) with one-click switching
- Drag a whole line (defence / midfield / attack) to shift positions in one move

### 📁 Data Exchange

- Export squad as CSV
- Import squad from CSV (players only)
- Export squad as JSON (players, formation, assignments)
- Import squad from JSON (replaces players, formation, and assignments)
- Downloads use a filename derived from the squad name
- Export only starters or only the bench as CSV/JSON
- Import a roster pasted as `name, number, role` lines
- Printable team sheet with opponent and date header

### 🎮 Matchday

- Mark starters vs. substitutes with a bench toggle in the roster
- Bench list rendered below the pitch in the picker
- In-match substitution flow: bring a bench player on for a starter (and swap
  back)
- Match clock: 90 minutes plus half-time, with start/pause/reset and phase
  display
- Added-time (stoppage) tracking per half
- Score tracking with quick goal increments
- Goal / card / event log with a timeline tied to the clock
- Half-time whistle that pauses the clock and mirrors the pitch for the second
  half
- Max-substitutions limit (e.g. 5) with warnings when exceeded
- Match state (score, clock, events) persisted to `localStorage`
- Formation reminders: warns about empty positions, unassigned players, and
  available bench players

### 🖼️ Presentation & Collaboration

- Export the lineup as an image (PNG)
- Print-friendly lineup view
- Share a lineup as a URL (encoded state), stamped with a squad version
- Shared-squad history for one-click reopen of recent links
- Share a URL that encodes only the active lineup, not the whole library

### 🖥️ Desktop

- Open / save squad files (`.squad.json`) via the native file dialog
- Deep-link handling that opens a shared squad URL in the desktop app via the
  `football://` scheme (e.g. `football://squad?squad=<encoded>`)

### 🛠️ Tooling & Quality

- Unit tests (lib + components) with coverage ≥ 90% (statements, branches,
  functions, lines)
- Playwright e2e smoke tests covering the core flows
- Visual regression snapshots in e2e
- TypeScript with strict mode, ESLint, Prettier

---

## Next steps

- Want to contribute? Check the [CONTRIBUTING](CONTRIBUTING) guide.
- Curious what's coming? See the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
