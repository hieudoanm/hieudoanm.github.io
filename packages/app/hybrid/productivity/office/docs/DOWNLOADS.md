# Office

> A suite of productivity tools — Calendar, CSV, Markdown, and Tasks.
> Runs on phone, tablet, laptop, and desktop so you never lose track of what
> matters.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![calendar screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/calendar/home.png)

---

## Latest release

- **Version:** `app-hybrid-productivity-office-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Office runs on macOS, Windows, Linux, and Android — pick the right build for
your platform.

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

[download-apk]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-office-latest/office.apk
[download-aab]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-office-latest/office.aab
[download-app-image]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-office-latest/office.AppImage
[download-deb]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-office-latest/office.deb
[download-rpm]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-office-latest/office.rpm
[download-dmg]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-office-latest/office.dmg
[download-msi]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-office-latest/office.msi
[download-exe]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-office-latest/office.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/productivity/office
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A privacy-first, offline-first office suite. Four productivity sub-apps — a
multi-view event **Calendar**, a **CSV** spreadsheet editor, a **Markdown**
knowledge base, and a **Tasks** kanban board — plus lightweight lite versions of
each. Data lives in your browser (localStorage / IndexedDB), so everything
works offline and never leaves your device.

---

## Features

### 📅 Calendar

A multi-view event calendar with GitHub-style activity visualization that puts
300+ events at your fingertips — from holiday to cultural to seasonal — across
daily, weekly, monthly, quarterly, half-year, and yearly views.

### 📊 CSV

A minimal spreadsheet editor for CSV files with formula support, filters,
comments, sheets, and export.

### ✍️ Markdown

An Obsidian-style markdown knowledge base with live preview, TOC, word counts,
graph view, and your own notes bundled as content.

### ✅ Tasks

A kanban board for planning and tracking work — sidebar with board search and
member switcher, four views (Kanban, List, Calendar, Timeline), labels,
assignees, priorities, due dates, and an archive. Persisted to IndexedDB.

### ⚡ Lite versions

Lightweight variants of every sub-app under `/lite/` — a monthly calendar, a
quick table editor, a markdown editor with live preview, and a Google
Tasks-style to-do list.

### 🧭 Calendar Navigation

- **Year selector** — cycle through years with arrow buttons
- **View switcher** — dropdown to change between all 7 views
- **Weekday filter** — toggle individual weekdays on/off in Daily/Weekly views
- **Month navigation** — prev/next arrows in Monthly calendar

### 📄 Additional Pages

- **About** — project description and tech stack
- **Downloads** — installation instructions for all platforms
- **Version** — changelog and version history

---

## Comparison — Google Workspace & Microsoft Office

A simple feature mapping between the sub-apps in this Office suite and their
counterparts in Google Workspace and Microsoft Office. An app that does not
exist shows `X`.

### Apps in Office

| Office        | Google Workspace | Microsoft Office           |
| ------------- | ---------------- | -------------------------- |
| Calendar      | Google Calendar  | Microsoft Outlook Calendar |
| CSV           | Google Sheets    | Microsoft Excel            |
| Markdown      | Google Docs      | Microsoft Word             |
| Tasks         | Google Tasks     | Microsoft To Do            |

### Lite Variants

Each full sub-app ships a lite variant under `/lite/`:

| Office (lite) | Google Workspace | Microsoft Office                |
| ------------- | ---------------- | ------------------------------- |
| Lite Calendar | Google Calendar  | Microsoft Outlook Calendar      |
| Lite CSV      | Google Sheets    | Microsoft Excel                 |
| Lite Markdown | Google Docs      | Microsoft Word                  |
| Lite Tasks    | Google Tasks     | Microsoft To Do                 |

### Common office services not covered

| Google Workspace | Microsoft Office             | Office   |
| ---------------- | ---------------------------- | -------- |
| Google Docs      | Microsoft Word               | Markdown |
| Google Sheets    | Microsoft Excel              | CSV      |
| Google Slides    | Microsoft PowerPoint         | X        |
| Google Calendar  | Microsoft (Outlook) Calendar | Calendar |
| Google Gmail     | Microsoft Outlook            | X        |
| Google Drive     | Microsoft OneDrive           | X        |
| Google Meet      | Microsoft Teams              | X        |
| Google Keep      | Microsoft OneNote            | X        |
| Google Tasks     | Microsoft To Do              | Tasks    |
| Google Forms     | Microsoft Forms              | X        |
| Google Sites     | Microsoft SharePoint         | X        |
| Google Chat      | Microsoft Teams (Chat)       | X        |

Rows where our Office app is `X` indicate services that do not exist in this
suite yet.

---

## First run

A few things to know before your first launch:

- **macOS** — right-click the `.dmg` and choose _Open_ the first time to bypass
  the Gatekeeper "unidentified developer" prompt, then drag Office to
  _Applications_.
- **Linux** — make the AppImage executable first:
  `chmod +x office.AppImage`, then run it.
- **Windows** — Windows SmartScreen may show an "unknown publisher" warning;
  choose _More info → Run anyway_. The `.msi` installs Calendar into the Start
  menu.

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
