# Music

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]            |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/music_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/music_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/music_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/music_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/SHA256SUMS.txt

## About

Music — Ear-training games and music tools as a hybrid web/desktop app.

## Features

## Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/music`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `music` theme (light default) with `music-dark`
  toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

## Home & Navigation

- Card grid listing the tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

## Pitch (Ear Training)

- Guess-the-note piano game: random note plays, player guesses on on-screen
  keyboard
- 11 difficulty levels with growing note pools (C → full chromatic scale)
- Score tracking with localStorage-persisted high score
- Practice mode: ascending white keys with key highlighting
- Twinkle Twinkle Little Star mode: melody playback with highlighting
- Visual feedback: green for correct, red for wrong, blue for highlighted
- Ripple animation on tone play
- Mobile-first responsive design with white and black key rendering
- Keyboard-free: all interaction via click/tap

## Requirements

- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
