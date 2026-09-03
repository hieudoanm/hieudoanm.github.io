# CSV

> A minimal Excel / Google Sheets that runs entirely offline — formulas, multiple
> sheets, and import/export without the bloat. Works on your phone, tablet,
> laptop, and desktop so your data is always at hand.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────────────┐
│ 📊 CSV Editor      [Import] [Export] [Undo] [⚙]  │
├──────────────────────────────────────────────────┤
│   │  A       │  B        │  C        │  D        │
│───┼──────────┼───────────┼───────────┼───────────│
│ 1 │ Name     │ Revenue   │ Cost      │ Profit    │
│ 2 │ Q1       │ 12000     │ 8000      │ =C2-D2    │
│ 3 │ Q2       │ 15000     │ 9500      │ =C3-D3    │
│ 4 │ Q3       │ 18200     │ 10100     │ =C4-D4    │
│ 5 │ Q4       │ 21000     │ 11200     │ =C5-D5    │
├──────────────────────────────────────────────────┤
│ Sheet1 │ Sheet2 │ +    │  Status: Ready  │ SUM: … │
└──────────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-productivity-csv-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note               |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ------------------ |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly   |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload ¹ |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install   |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                    |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon ²    |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                    |

[download-apk]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/app-universal-release.apk
[download-aab]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/app-universal-release.aab
[download-app-image]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/csv_amd64.AppImage
[download-deb]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/csv_amd64.deb
[download-dmg]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/csv_aarch64.dmg
[download-msi]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/csv_x64.msi

<br>

¹ The `.aab` bundle is for Google Play store upload — sideload the `.apk`
instead.

² The `.dmg` is a universal Apple Silicon binary.

## First run

- **macOS** — right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux** — `chmod +x csv_amd64.AppImage && ./csv_amd64.AppImage`.
- **Windows** — SmartScreen may warn; click **More info → Run anyway**.
- **Android** — Play Protect may block; tap **Install anyway**.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-csv-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/productivity/csv
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A minimal Excel / Google Sheets replacement that runs entirely offline —
formulas, multiple sheets, drag-and-drop editing, and import/export to CSV, TSV,
JSON, HTML, XML, and XLSX without the bloat.

---

## Features

### 📊 Grid

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

### 🔢 Data & Formulas

- Formula support (`=SUM(A1:B2)`, `=AVG`, `=COUNT`, ...) with ranges
- Number formatting and alignment
- Auto-fill drag handle (numeric series, copy, tiling)
- Find & replace across the grid (Ctrl+F, match highlighting)
- Sort and filter rows (A→Z / Z→A, per-column filter bar)
- Status bar (active cell + grid size)

### 📤 Import / Export

- Import CSV from file
- TSV import + CSV/TSV auto-detection
- Export CSV download
- Export as `.csv`, `.tsv`, `.json`, `.html`, `.xml`, `.xlsx`

### 💾 Persistence & UX

- localStorage persistence
- Legacy `csv-editor:grid` → `csv-editor:workbook` data migration
- Undo / redo history
- Keyboard shortcuts panel (Ctrl+K)
- Dark / light theme toggle (persisted)
- PWA / offline support (service worker + manifest)

---

## First run

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
