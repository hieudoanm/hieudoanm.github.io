# History

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]            |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/history_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/history_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/history_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/history_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-history-latest/SHA256SUMS.txt

## About

History — Timeline-based history games as a hybrid web/desktop app.

## Features

## Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/history`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `history` theme (light default) with
  `history-dark` toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

## Home & Navigation

- Card grid listing the tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

## Through the Years

- Timeline-based history game: place historical events in chronological order
- 4 game modes: Practice (unlimited), Classic (20 events), Endless (first
  mistake ends), Hardcore (one life)
- 15 deck options across 6 continents (World, Egypt, US, China, India, Iraq,
  Vietnam, Greece, Italy, UK, South Africa, Mexico, Japan, France, Germany)
- Combo scoring system: 3-streak x2, 5-streak x3, 10-streak x5
- Speed bonus: up to +50 points for quick placement
- Hint system: century → decade → neighbouring event reveal
- Browse mode: compact (by century) or spread (year-by-year) view
- Compare mode: side-by-side deck comparison
- Game over stats: score, accuracy, correct count, best streak
- Responsive timeline: click-to-place with reveal animation
- BC year support (negative years sorted correctly)

## Requirements

- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
