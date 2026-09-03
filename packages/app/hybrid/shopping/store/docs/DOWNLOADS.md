# Store

> Apps Store — browse and download all hybrid and native apps. OS detection,
> recommended downloads, and detail pages. Runs everywhere: phone, tablet,
> laptop, desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────── Store ──────────────────────┐
│ 🔍 Search apps...              🌙  │ All │ Hybrid  │
├───────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  🛒 Store │ │  🎵 Music │ │  🧪 Chem  │         │
│  │  Cross-plat│ │  Hybrid   │ │  Hybrid   │         │
│  │  [Download]│ │  [Download]│ │  [Download]│         │
│  └──────────┘ └──────────┘ └──────────┘         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │  🗺️ Hist  │ │  💰 Econ  │ │  🍜 Food  │         │
│  │  Hybrid   │ │  Hybrid   │ │  Hybrid   │         │
│  │  [Download]│ │  [Download]│ │  [Download]│         │
│  └──────────┘ └──────────┘ └──────────┘         │
│                                                   │
│  📱 44 apps · v2.0.0 · © 2024 hieudoanm         │
└───────────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-shopping-store-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

### Downloads

| No  | Platform | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Linux    | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 3   | Linux    | amd64        | 13.+         | [Download `.deb`][download-deb]            | System package   |
| 4   | macOS    | aarch64      | 13.+         | [Download `.dmg`][download-dmg]¹           | Apple Silicon ¹  |
| 5   | Windows  | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-shopping-store-latest/app-universal-release.apk
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-shopping-store-latest/store_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-shopping-store-latest/store_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-shopping-store-latest/store_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-shopping-store-latest/store_x64.msi

<br>

¹ The `.dmg` is built for Apple Silicon (aarch64) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-shopping-store-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/shopping/store
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Your one-stop apps storefront — browse and download apps across all platforms
with OS detection, recommended downloads, and detailed info pages. Fast,
beautiful, and works on anything.

---

## Features

Everything you need to discover, compare, and download apps.

### 🛒 Store Home

- **App Grid** — Responsive grid of app cards with emoji icons, name, and
  description
- **OS Detection** — Auto-detects macOS, Windows, Linux, Android, iOS via
  `navigator.userAgent`
- **Recommended Downloads** — Highlights the best download for the current
  platform
- **Search** — Real-time search with `useDeferredValue` debouncing; matches
  name, description, category
- **Filter Tabs** — Toggle between All / Hybrid / Native app sections with
  counts
- **Nothing Theme** — OLED-black dark theme with red accent (`#000000` +
  `#ff0030`)
- **Today's Date** — Displays current date in the header

### 📱 App Cards

- **Emoji Icons** — Maps Phosphor icon names to emoji for zero-dependency
  rendering
- **Platform Badges** — "Cross-platform" for hybrid apps, OS label for native
  apps
- **View Details** — Links to full detail page (`/app/[slug]`)
- **Quick Download** — One-click download button for the recommended platform
- **Hover Effects** — Scale and shadow on hover for tactile feedback

### 💻 Detail Page

- **App Info** — Full name, description, section badge, platform badges
- **Download Options** — All available downloads with platform labels
- **Recommended Badge** — Highlights the best download for the current OS
- **All Platforms** — Shows all supported platforms with "current" indicator
- **Back Navigation** — Link back to the store home

### 🧭 Navigation

- **Sticky Header** — Fixed top bar with app name, About, and Version links
- **Theme Toggle** — Switch between Nothing (dark) and Winter (light) themes
- **Breadcrumb-style** — Minimal monospace navigation

### ℹ️ Info Pages

- **About** — App name, framework, theme, platform, app count
- **Version** — Changelog with version history

### 📡 Offline & PWA

- **Service Worker** — Cache-first strategy for static assets
- **Manifest** — PWA manifest for installability
- **Offline Indicator** — Shows offline status

### 🚨 Error Handling

- **Error Boundary** — Catches runtime errors with retry button
- **Global Error** — Catches errors outside the app shell
- **404 Page** — Not found with back link
- **403 Page** — Forbidden
- **401 Page** — Unauthorized
- **Loading Spinner** — DaisyUI spinner during navigation

### ⚡ Performance

- **Static Export** — Pure HTML/CSS/JS, no server runtime
- **Pre-rendered Pages** — All 44 app detail pages generated at build time
- **Deferred Search** — `useDeferredValue` prevents input jank
- **Memoized Filtering** — `useMemo` avoids recalculating on every render
- **Client-only Detection** — OS detection wrapped in `useEffect` to prevent
  hydration mismatch

---

# First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag the
  app to your Applications folder.
- **Linux (AppImage):** `chmod +x store_amd64.AppImage` then run it — no install
  needed.
- **Windows:** SmartScreen may flag the `.msi` — click "More info" → "Run
  anyway".
- **Android:** Play Protect may warn about the `.apk` — tap "Install anyway".

---

## First run

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](LICENSE).
