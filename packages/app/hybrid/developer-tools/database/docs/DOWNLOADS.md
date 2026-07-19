# Database

> A tiny DBeaver / pgAdmin you can throw in your pocket — browse tables, run
> queries, and design schemas on your phone, tablet, laptop, or desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────────┐
│  DATABASE                ⚙  👤     │
├──────────┬──────────────────────────┤
│ Schema   │  SELECT * FROM users     │
│ ──────── │  WHERE active = true;    │
│ 📁 Tables│  ─────────────────────   │
│  customers│  id │ name   │ email   │
│  orders   │  1  │ Alice  │ a@…     │
│  products │  2  │ Bob    │ b@…     │
│ 📁 Views │  (2 rows, 3 ms)         │
└──────────┴──────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-developer-tools-database-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform and you're good to go.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-database-latest/database.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-database-latest/database.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-database-latest/database.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-database-latest/database.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-database-latest/database.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-database-latest/database.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-database-latest/database.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-database-latest/database.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-database-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/developer-tools/database
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A pocket-sized SQL studio — browse schemas, write queries, inspect ER diagrams,
and manage SQLite databases right from your phone or desktop.

---

## Features

From connection management to ER diagrams, this one covers the full database
workflow.

### 🔗 Connections & Schema

- Connection list with add/delete
- Edit existing connection
- Schema browser tree view
- Schema search filter (table filter in sidebar, Ctrl+K to focus)
- Mock database seed data (customers, orders, products tables)

### ✏️ Query Editor

- SQL query editor with syntax highlighting
- Execute query with loading state
- Keyboard shortcuts (Ctrl+Enter execute, Ctrl+Shift+Enter format, Ctrl+/
  comment)
- SQL pretty-print / format (clauses, parens, function calls)
- SQL keyword auto-complete (Ctrl+Space; keywords + tables + columns)
- Query history with re-run (IndexedDB persistence)
- Query bookmarks with folders
- Selected-text execution (Ctrl+Enter runs the selection when present)
- Error highlighting with line numbers (gutter marks the failing line red)
- Query execution time tracking (sql.js path, elapsed ms in status bar)
- Explain query plan (real `EXPLAIN QUERY PLAN` via sql.js)

### 📋 Results

- Results table with sorting and pagination
- Results export (CSV, JSON, Markdown, SQL INSERT)
- Data viewer with browse/paginate
- Inline cell editing (double-click to edit, Enter/blur commits, Esc cancels)
- Add/delete rows
- Column-level filtering (per-column filter inputs, combined with global search)
- Copy row as SQL INSERT / JSON (per-row menu)
- Multiple result tabs (each query/explain opens a tab)

### 🎨 Table Designer

- Table designer (add/remove columns, types, PK / NOT NULL constraints)
- Live CREATE TABLE preview (updates as you type)
- Foreign key editor (per-column FK table/column selects)
- Export database as SQL dump
- Export table as CSV / JSON / SQL INSERT

### 📥 Import

- Import CSV wizard (file select, delimiter, column mapping, preview)
- Import JSON (paste/array, map to table, execute)
- Batch import with progress indicator (500-row chunks)
- Import validation and error reporting (per-row warnings)

### 🧠 Schema Intelligence

- Schema Library (`/posts`: 10 classic schemas with hand-written markdown)
- ER diagram with tables and relationships (live, from the open database)
- Zoom/pan on ER diagram (scroll to zoom at cursor, drag to pan, fit / zoom
  buttons)
- Highlight related tables on hover
- Database statistics (table sizes, row counts)
- Storage breakdown chart (per-table size share stacked bar + list)
- Index usage statistics (mock)
- Export ER diagram as PNG/SVG

### 🔴 Redis (planned)

Mock in-browser Redis engine, consistent with the offline-first SQLite path. See
`docs/ROADMAP.md` Phase 8.

- Redis connections (host/port, DB index, username/password, TLS toggle,
  read-only)
- Redis command line (raw redis-cli-style commands with syntax highlighting and
  command autocomplete)
- Keyspace browser (pattern filter, key type badges, TTL/expiry, memory
  estimate)
- Data type viewer/editor (string, hash, list, set, sorted set, stream)
- Redis monitor & stats (mock: memory used, hit/miss ratio, connected clients,
  commands/sec)
- Redis import/export (JSON dump, RDB-style export)

### 🖥️ UX & Platform

- Responsive layout (collapsible sidebar)
- Resizable panel dividers (sidebar drag handle, 160–480px)
- Collapsible sidebar
- Page transition animations (CSS keyframes via `app/template.tsx`)
- Skeleton loading states
- Tauri desktop app build (bundling configured; signing/updater not yet)

---

# First run

- **macOS:** Right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x database.AppImage && ./database.AppImage`
- **Windows SmartScreen:** Click **More info → Run anyway** if prompted.
- **Android Play Protect:** Tap **Install anyway** if the warning appears.

---

## First run

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and how
  to run tests.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).
