# Economics

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]            |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/SHA256SUMS.txt

## About

Economics — Game theory and economics simulations as a hybrid web/desktop app.

## Features

## Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/economics`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `economics` theme (light default) with
  `economics-dark` toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

## Home & Navigation

- Card grid listing the tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

## Prisoner's Dilemma

- 10-round iterated prisoner's dilemma against AI strategies
- 5 bot strategies: Tit for Tat, Always Defect, Always Cooperate, Grim Trigger,
  Random
- Payoff matrix displayed: cooperate/cooperate = 1yr, defect/defect = 2yr
- Keyboard shortcuts: C (cooperate), D (defect), R (reset), Enter (next round)
- Strategy reveal at game end
- Round history tracking with scores per round
- Win/lose/draw determination with visual feedback
- Pure game logic in `utils/game.ts` with exhaustive type checking

## Requirements

- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
