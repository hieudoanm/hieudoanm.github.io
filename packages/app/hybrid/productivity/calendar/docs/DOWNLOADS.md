# Calendar

> Your events, visualized seven ways — from daily cards to yearly heatmaps.
> Runs on phone, tablet, laptop, and desktop so you never lose track of what
> matters.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────┐
│  ◀  2025  📅  ▶    [3-Day ▾] [⚙]   │
├──────────────────────────────────────┤
│  Mon   Tue   Wed   Thu   Fri  Sat  Sun │
│                    1     2     3    4    5 │
│   ·     ·     ·     ·     ·    ·    ·  │
│   6     7     8     9    10   11   12 │
│   ·     ·     ·     ·     ·    ·    ·  │
│  ...                                  │
├──────────────────────────────────────┤
│  TODAY: Team standup 10:00           │
│  🟡 Holiday  🔵 Meeting  🟢 Personal │
└──────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-productivity-calendar-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Calendar runs on macOS, Windows, Linux, and Android — pick the right build for
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

[download-apk]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-calendar-latest/calendar.apk
[download-aab]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-calendar-latest/calendar.aab
[download-app-image]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-calendar-latest/calendar.AppImage
[download-deb]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-calendar-latest/calendar.deb
[download-rpm]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-calendar-latest/calendar.rpm
[download-dmg]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-calendar-latest/calendar.dmg
[download-msi]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-calendar-latest/calendar.msi
[download-exe]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-calendar-latest/calendar.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/productivity/calendar
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A multi-view event calendar with GitHub-style activity visualization that puts
300+ events at your fingertips — from holiday to cultural to seasonal — across
daily, weekly, monthly, quarterly, half-year, and yearly views.

---

## Features

### 📅 Calendar Views

7 calendar views to visualise your data from different perspectives:

#### 3-Day View

Yesterday, today, and tomorrow in card format. Quick glance at upcoming events.

#### Daily View

Full-year grid with GitHub-style activity dots. Each day is a cell in a 52×7 grid
(weeks × weekdays). Shows event intensity with dot colour.

#### Weekly View

Month-by-month grid where each row is a week. See how events cluster by week
across the year.

#### Monthly View

12-month dot grid. Each month is a row, each day is a dot. Quickly identify
busy periods across the year.

#### Quarterly View

Four quarterly rows showing event distribution. Each row covers one quarter
(13 weeks). Good for high-level trend analysis.

#### Half View

Two half-year rows. Each row covers 26 weeks. Ideal for spotting seasonal
patterns.

#### Yearly View

12-month overview with category labels. Shows event counts per month with
visual bars.

### 🧭 Navigation

- **Year selector** — cycle through years with arrow buttons
- **View switcher** — dropdown to change between all 7 views
- **Weekday filter** — toggle individual weekdays on/off in Daily/Weekly views
- **Month navigation** — prev/next arrows in Monthly calendar

### 📊 Data

- 300+ events across multiple categories (holiday, cultural, seasonal, international)
- Events grouped by month and year for efficient lookup
- Date-based filtering with helper functions

### 📄 Additional Pages

- **About** — project description and tech stack
- **Downloads** — installation instructions for all platforms
- **Version** — changelog and version history

---

# First run

A few things to know before your first launch:

- **macOS** — right-click the `.dmg` and choose _Open_ the first time to bypass
  the Gatekeeper "unidentified developer" prompt, then drag Calendar to
  _Applications_.
- **Linux** — make the AppImage executable first:
  `chmod +x calendar.AppImage`, then run it.
- **Windows** — Windows SmartScreen may show an "unknown publisher" warning;
  choose _More info → Run anyway_. The `.msi` installs Calendar into the Start
  menu.

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
