# Video

> A minimal CapCut-style video editor that runs everywhere — phone, tablet,
> laptop, and desktop. Trim clips, tweak playback speed, and publish polished
> video from any screen.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![video screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/video/home.png)

---

## Latest release

- **Version:** `app-hybrid-graphics-design-video-latest` — updates ship
  continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-video-latest/video.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-video-latest/video.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-video-latest/video.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-video-latest/video.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-video-latest/video.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-video-latest/video.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-video-latest/video.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-video-latest/video.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-video-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/graphics-design/video
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A stripped-down video editor with playback speed control and a clean theme
picker — CapCut stripped to the essentials, running natively on every device you
own.

---

## Features

### 📱 Platform

- 32 DaisyUI themes with dark default
- Tauri desktop app build (bundling configured; signing not yet)
- iOS/Android native shells (Tauri mobile entry point wired)

### ▶️ Playback

- Playback speed control (0.5x, 1x, 1.5x, 2x) — processing tool, not a player
  control

---

## Next steps

- Want to contribute? Check the [CONTRIBUTING](CONTRIBUTING) guide.
- Curious what's coming? See the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
