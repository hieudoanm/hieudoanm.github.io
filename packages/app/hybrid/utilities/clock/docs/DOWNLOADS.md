# Clock

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                             |
| -------- | ------ | ------------ | ------------ | ----------------------------------------- |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]           |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹          |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-appimage] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]           |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²          |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]           |

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

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-clock-latest/SHA256SUMS.txt

## About

Clock — minimal time utilities app.

## Features

## Pomodoro

- Work/break cycles with 3 presets (25/5, 50/10, 15/3)
- SVG circular progress indicator
- WebAudio beep for alerts
- State persisted to localStorage

## Watchface

- Real-time analog/digital display
- Dot and minimal modes
- Smooth animation via requestAnimationFrame

## World Clock

- 14 timezone cities
- Open-Meteo weather integration (TanStack React Query)
- Search and favorites
- Favorites persisted to localStorage

## Timer

- 6 duration presets
- Countdown with pause/resume
- Audio alert on completion
- Centisecond precision

## Stopwatch

- Lap tracking with split/diff calculations
- Centisecond precision via requestAnimationFrame

## Platform

- PWA installable with offline support
- Tauri desktop app (bundling configured; signing not yet)
- nothing theme (black, white, red)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
