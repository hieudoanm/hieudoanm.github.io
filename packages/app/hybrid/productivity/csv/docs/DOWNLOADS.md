# CSV

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/app-universal-release.apk
[download-aab]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/app-universal-release.aab
[download-app-image]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/csv_amd64.AppImage
[download-deb]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/csv_amd64.deb
[download-dmg]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/csv_aarch64.dmg
[download-msi]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/csv_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/SHA256SUMS.txt

## About

CSV — minimal Excel / Google Sheets.

## Features

## Grid

- Sticky-header spreadsheet grid (column letters + row numbers)
- Click / double-click / keyboard cell editing
- Keyboard navigation (arrows, Tab, Enter, F2, Delete)
- Add / delete rows and columns
- Multiple sheets per file (`.xlsx`-style tabs) — add / remove / rename / switch
- Column width / row height resizing
- Freeze panes (rows / columns / both)
- Cell comments (hover indicator + popover)
- Range label in status bar (e.g. `A1:B2`)
- Cell ranges and multi-cell selection (drag + Shift+arrows)
- Copy / paste between cells (clipboard, TSV-delimited)

## Data & Formulas

- Formula support (`=SUM(A1:B2)`, `=AVG`, `=COUNT`, ...) with ranges
- Number formatting and alignment
- Auto-fill drag handle (numeric series, copy, tiling)
- Find & replace across the grid (Ctrl+F, match highlighting)
- Sort and filter rows (A→Z / Z→A, per-column filter bar)
- Status bar (active cell + grid size)

## Import / Export

- Import CSV from file
- TSV import + CSV/TSV auto-detection
- Export CSV download
- Export as `.csv`, `.tsv`, `.json`, `.html`, `.xml`, `.xlsx`

## Persistence & UX

- localStorage persistence
- Legacy `csv-editor:grid` → `csv-editor:workbook` data migration
- Undo / redo history
- Keyboard shortcuts panel (Ctrl+K)
- Dark / light theme toggle (persisted)
- PWA / offline support (service worker + manifest)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
