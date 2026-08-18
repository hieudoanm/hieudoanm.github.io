# Chemistry

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]            |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/chemistry_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/chemistry_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/chemistry_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/chemistry_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/SHA256SUMS.txt

## About

Chemistry — Interactive periodic table and chemistry tools as a hybrid
web/desktop app.

## Features

## Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/chemistry`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `chemistry` theme (light default) with
  `chemistry-dark` toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

## Home & Navigation

- Card grid listing the tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

## Periodic Table

- Interactive periodic table rendered from
  `@hieudoanm.github.io/data/periodic-table`
- Elements color-coded by `specificName` category
- Filter buttons to highlight specific element categories
- Desktop: 18-column CSS grid layout
- Mobile: 3-column card grid layout
- Responsive design adapts between breakpoints

## Requirements

- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
