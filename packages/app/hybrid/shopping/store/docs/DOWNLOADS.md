# Store

## Installation

| Platform | Architecture | Requirements | Download Link                              |
| -------- | ------------ | ------------ | ------------------------------------------ |
| Android  | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Linux    | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    | aarch64      | 13.+         | [Download `.dmg`][download-dmg]¹           |
| Windows  | x64          | 10.+         | [Download `.msi`][download-msi]            |

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

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-shopping-store-latest/SHA256SUMS.txt

## About

Store — browse and download apps across all platforms.

## Features

## Store Home

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

## App Cards

- **Emoji Icons** — Maps Phosphor icon names to emoji for zero-dependency
  rendering
- **Platform Badges** — "Cross-platform" for hybrid apps, OS label for native
  apps
- **View Details** — Links to full detail page (`/app/[slug]`)
- **Quick Download** — One-click download button for the recommended platform
- **Hover Effects** — Scale and shadow on hover for tactile feedback

## Detail Page

- **App Info** — Full name, description, section badge, platform badges
- **Download Options** — All available downloads with platform labels
- **Recommended Badge** — Highlights the best download for the current OS
- **All Platforms** — Shows all supported platforms with "current" indicator
- **Back Navigation** — Link back to the store home

## Navigation

- **Sticky Header** — Fixed top bar with app name, About, and Version links
- **Theme Toggle** — Switch between Nothing (dark) and Winter (light) themes
- **Breadcrumb-style** — Minimal monospace navigation

## Info Pages

- **About** — App name, framework, theme, platform, app count
- **Version** — Changelog with version history

## Offline & PWA

- **Service Worker** — Cache-first strategy for static assets
- **Manifest** — PWA manifest for installability
- **Offline Indicator** — Shows offline status

## Error Handling

- **Error Boundary** — Catches runtime errors with retry button
- **Global Error** — Catches errors outside the app shell
- **404 Page** — Not found with back link
- **403 Page** — Forbidden
- **401 Page** — Unauthorized
- **Loading Spinner** — DaisyUI spinner during navigation

## Performance

- **Static Export** — Pure HTML/CSS/JS, no server runtime
- **Pre-rendered Pages** — All 44 app detail pages generated at build time
- **Deferred Search** — `useDeferredValue` prevents input jank
- **Memoized Filtering** — `useMemo` avoids recalculating on every render
- **Client-only Detection** — OS detection wrapped in `useEffect` to prevent
  hydration mismatch

## Requirements

- Android 14+
- Linux 22.04+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
