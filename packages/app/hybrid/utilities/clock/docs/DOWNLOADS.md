# Clock

> A minimal time-utilities app that never loses a beat — pomodoro, watchface,
> world clock, timer, and stopwatch in one place. Runs everywhere your time
> matters: phone, tablet, laptop, and desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────────┐
│        ┌───────┐        World Clock          │
│     ┌──┤   ╷   ├──┐   ┌────────────────┐     │
│     │  └──┤   ├──┘  │   │ Hanoi    09:42 │    │
│   ──┼─────┤   ├─────┼── ▸ Tokyo    11:42 │    │
│     │  ┌──┤   ├──┐  │   │ London   03:42 │    │
│     └──┤   ╵   ├──┘   │ New York 22:42   │    │
│        └───────┘       └────────────────┘     │
│         09:42:37   ▸ Pomodoro 24:13           │
└──────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-utilities-clock-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your device — Android phones install the `.apk`, and
Linux/macOS/Windows grab their native package below.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                             | Note             |
| --- | -------- | ------ | ------------ | ------------ | ----------------------------------------- | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]           | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹          | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-appimage] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]           |                  |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²          | Apple Silicon    |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]           |                  |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-clock-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-clock-latest/app-universal-release.aab
[download-appimage]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-clock-latest/clock_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-clock-latest/clock_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-clock-latest/clock_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-clock-latest/clock_x64.msi

<br>

¹ `.aab` is for uploading to the Google Play Store — use the `.apk` to install
directly. ² `.dmg` is built for Apple Silicon.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-clock-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/utilities/clock
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

## First Run

Per-platform launch tips:

- **macOS** — right-click the `.dmg` then **Open** to bypass Gatekeeper the
  first time, or find the app bundle inside.
- **Linux** — make it runnable: `chmod +x clock_amd64.AppImage` then
  double-click.
- **Windows** — SmartScreen may warn; choose **More info → Run anyway**.
- **Android** — if Play Protect warns, tap **Install anyway**.

---

## About

Time, perfectly in your pocket. Clock is a minimal time-utilities app that packs
a pomodoro, analog/digital watchface, world clock with live weather, timer, and
stopwatch into one fast, offline-capable tool you can open on any screen.

---

## Features

Five time tools plus a polished platform layer, all in one app.

### 🍅 Pomodoro

- Work/break cycles with 3 presets (25/5, 50/10, 15/3)
- SVG circular progress indicator
- WebAudio beep for alerts
- State persisted to localStorage

### 🕰️ Watchface

- Real-time analog/digital display
- Dot and minimal modes
- Smooth animation via requestAnimationFrame

### 🌍 World Clock

- 14 timezone cities
- Open-Meteo weather integration (TanStack React Query)
- Search and favorites
- Favorites persisted to localStorage

### ⏲️ Timer

- 6 duration presets
- Countdown with pause/resume
- Audio alert on completion
- Centisecond precision

### ⏱️ Stopwatch

- Lap tracking with split/diff calculations
- Centisecond precision via requestAnimationFrame

### 📱 Platform

- PWA installable with offline support
- Tauri desktop app (bundling configured; signing not yet)
- nothing theme (black, white, red)

---

## First run

---

## Next steps

- [CONTRIBUTING](CONTRIBUTING) — set up the dev environment and start tinkering.
- [ROADMAP](ROADMAP) — see what's coming next on the roadmap.

---

## License

See [LICENSE](LICENSE).
