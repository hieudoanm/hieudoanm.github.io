# Projects

> A minimal Kanban board inspired by Trello — drag cards, label them, assign
> members, and ship work. Runs on your phone, tablet, laptop, and desktop so
> your projects follow you everywhere.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![projects screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/projects/home.png)

---

## Latest release

- **Version:** `app-hybrid-productivity-projects-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your platform.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

## First run

- **macOS** — right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux** — `chmod +x projects.AppImage && ./projects.AppImage`.
- **Windows** — SmartScreen may warn; click **More info → Run anyway**.
- **Android** — Play Protect may block; tap **Install anyway**.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/productivity/projects
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A minimal Kanban board in the spirit of Trello and Atlassian — create boards,
drag cards between lists, assign members, and keep your projects organized
across every device you own.

---

## Features

### 📋 Boards

- Board dashboard with grid of boards
- Create/edit/delete boards
- Demo boards seed data
- Board background colors
- Star/favorite boards

### 📝 Lists & Cards

- Board view with Kanban lists
- Add/rename/delete lists
- Add/edit/delete cards within lists
- Drag-and-drop cards between lists
- Drag-and-drop to reorder lists
- Card labels (colored dots)
- Card count per list badge
- Collapse/expand lists

### 🔍 Card Detail

- Card detail modal with description editor
- Checklists with progress bar
- Due date picker with indicators
- Member assignment with avatars
- Card priority levels
- Card cover images
- Card attachments (mock)
- Card comments with timestamps
- Mention users in comments (@username)
- Copy and move card actions

### 🏷️ Filtering & Search

- Filter bar (label, member, due date, priority)
- Saved filter presets (per board, stored in localStorage)
- Board search with highlighted results (Q / F shortcuts)
- Due date drag-to-reschedule in calendar

### 🗂️ Organization & Views

- Label management (10 colors)
- List view (compact table with sortable columns)
- Calendar view (monthly grid with due dates)
- Timeline view (Gantt-style bars)

### 👥 Collaboration

- Activity feed per board with relative timestamps
- Activity export (CSV download)
- Notifications (mentions, due dates, assignments) with unread badge
- Member roles (admin, member, viewer) — viewers are read-only
- Board sharing (mock link + copy, edit permission toggle)

### 📱 UX & Platform

- Responsive layout
- Skeleton loading states
- Tauri desktop app build (bundling configured; signing not yet)
- iOS/Android native shells (Tauri mobile entry point wired)

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
