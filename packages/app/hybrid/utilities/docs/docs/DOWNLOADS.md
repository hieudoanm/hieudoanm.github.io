# Hieu Doan

> The personal docs-style home for Hieu Doan — developer tools, games, and
> medical apps all in one place. Runs everywhere your life does: phone, tablet,
> laptop, and desktop, from a single polished interface.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![docs screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/docs/home.png)

---

## Latest release

- **Version:** `app-hybrid-utilities-docs-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your device — Android phones install the `.apk`, and
Linux/macOS/Windows grab their native package below.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/utilities/docs
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

## First Run

Per-platform launch tips:

- **macOS** — right-click the `.dmg` then **Open** to bypass Gatekeeper the
  first time, or find it bundled with the app.
- **Linux** — make the AppImage runnable: `chmod +x hieudoanm_next.AppImage` and
  double-click it.
- **Windows** — SmartScreen may warn; choose **More info → Run anyway**.
- **Android** — if Play Protect warns, tap **Install anyway**.

---

## About

All your tools, one polished surface. Hieu Doan is a personal documentation and
apps site that packs developer tools, games, and medical apps into a single
docs-style interface you can open on any screen.

---

## Features

Everything lives in one frictionless, docs-first shell.

### 📚 The Docs Site

- Personal documentation and apps site for Hieu Doan, with developer tools,
  games, medical apps, and more — all accessible from a single docs-style
  interface.

### 📱 Everywhere You Are

- Runs on phone, tablet, laptop, and desktop through a shared, installable front
  end.

---

## Next steps

- [CONTRIBUTING](CONTRIBUTING) — set up the dev environment and start tinkering.
- [ROADMAP](ROADMAP) — see what's coming next on the roadmap.

---

## License

See [LICENSE](LICENSE).
