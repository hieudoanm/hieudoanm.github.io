# Economics

> Game theory and economics simulations — pit yourself against AI strategies in
> an iterated Prisoner's Dilemma. Runs everywhere: phone, tablet, laptop,
> desktop.

![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────── Economics ────────────────┐
│  🔀 Prisoner's Dilemma                    │
│                                           │
│  You: Cooperate │ Bot: Always Defect      │
│  ┌─────────────┬─────────────┐            │
│  │  C  (1 yr)  │  C  (1 yr)  │            │
│  ├─────────────┼─────────────┤            │
│  │  D  (0 yr)  │  D  (3 yr)  │            │
│  └─────────────┴─────────────┘            │
│                                           │
│  Round 7/10  Score: +2  │  Your  Bot      │
│  [C] Cooperate  [D] Defect  [R] Reset     │
└───────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-education-economics-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/economics.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/education/economics
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A game theory playground in your pocket — face off against five AI strategies in
an iterated Prisoner's Dilemma, track payoffs, and learn cooperation theory.
Runs on any device.

---

## Features

Think strategically and outsmart the bots.

### 🔨 Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/economics`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `economics` theme (light default) with
  `economics-dark` toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

### 🏠 Home & Navigation

- Card grid listing the tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

### 🤝 Prisoner's Dilemma

- 10-round iterated prisoner's dilemma against AI strategies
- 5 bot strategies: Tit for Tat, Always Defect, Always Cooperate, Grim Trigger,
  Random
- Payoff matrix displayed: cooperate/cooperate = 1yr, defect/defect = 2yr
- Keyboard shortcuts: C (cooperate), D (defect), R (reset), Enter (next round)
- Strategy reveal at game end
- Round history tracking with scores per round
- Win/lose/draw determination with visual feedback
- Pure game logic in `utils/game.ts` with exhaustive type checking

---

# First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag the
  app to your Applications folder.
- **Linux (AppImage):** `chmod +x economics.AppImage` then run it — no install
  needed.
- **Windows:** SmartScreen may flag the `.msi` — click "More info" → "Run
  anyway".

---

## First run

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](LICENSE).
