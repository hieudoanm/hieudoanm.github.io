# Projects

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/projects_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-projects-latest/SHA256SUMS.txt

## About

Projects — minimal Atlassian Trello / Kanban board.

## Features

## Boards

- Board dashboard with grid of boards
- Create/edit/delete boards
- Demo boards seed data
- Board background colors
- Star/favorite boards

## Lists & Cards

- Board view with Kanban lists
- Add/rename/delete lists
- Add/edit/delete cards within lists
- Drag-and-drop cards between lists
- Drag-and-drop to reorder lists
- Card labels (colored dots)
- Card count per list badge
- Collapse/expand lists

## Card Detail

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

## Filtering & Search

- Filter bar (label, member, due date, priority)
- Saved filter presets (per board, stored in localStorage)
- Board search with highlighted results (Q / F shortcuts)
- Due date drag-to-reschedule in calendar

## Organization & Views

- Label management (10 colors)
- List view (compact table with sortable columns)
- Calendar view (monthly grid with due dates)
- Timeline view (Gantt-style bars)

## Collaboration

- Activity feed per board with relative timestamps
- Activity export (CSV download)
- Notifications (mentions, due dates, assignments) with unread badge
- Member roles (admin, member, viewer) — viewers are read-only
- Board sharing (mock link + copy, edit permission toggle)

## UX & Platform

- Responsive layout
- Skeleton loading states
- Tauri desktop app build (bundling configured; signing not yet)
- iOS/Android native shells (Tauri mobile entry point wired)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
