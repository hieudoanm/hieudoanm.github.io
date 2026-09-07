# Economics

> Game theory and economics simulations — pit yourself against AI strategies in
> an iterated Prisoner's Dilemma. Runs everywhere: phone, tablet, laptop,
> desktop.

![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![economics screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/economics/home.png)

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
- 32 bot strategies, each with its own behaviour classified as cooperate, defect
  or other, with a dedicated bots browser at `/prisoners-dilemma/bots`
- Round-robin tournament simulation at `/prisoners-dilemma/simulation` with
  configurable rounds per match and score rankings
- Payoff matrix displayed: cooperate/cooperate = 1yr, defect/defect = 2yr
- Keyboard shortcuts: C (cooperate), D (defect), R (reset), Enter (next round)
- Strategy reveal at game end
- Round history tracking with scores per round
- Win/lose/draw determination with visual feedback
- Pure game logic in `utils/game.ts` with exhaustive type checking

### 🎮 Interactive Games & Simulations

Each theory page links to a playable game under `app/(games)`:

- **Auction Simulator** (`/auction-theory/auction`) — bid against three AI
  bidders across English, Dutch, first-price and Vickrey formats; discover
  revenue equivalence and the winner's curse.
- **Ultimatum Split** (`/bargaining-theory/ultimatum`) — propose a split of $100
  and learn how much you must offer to be accepted.
- **Contribute!** (`/public-goods-dilemma/contribute`) — play a public goods
  game and watch free riding trump the group optimum.
- **Commons Harvest** (`/tragedy-of-the-commons/harvest`) — graze one shared
  renewable resource against four villagers and try to avoid collapse.
- **Cournot Competition** (`/oligopoly/cournot`) — pick your output against a
  rival firm and feel the pull of the Cournot equilibrium.
- **Play RPS** (`/zero-sum-games/rps`) — learn minimax and the value of zero-sum
  games against exploitable bot strategies.
- **Stag Hunt** (`/coordination-games/stag-hunt`) — coordinate with a partner
  and learn why trust earns more than playing it safe.
- **Price Lab** (`/supply-and-demand/price-lab`) — drag the curves and see
  equilibrium, shortages, surpluses and elasticity live.
- **Framing Game** (`/prospect-theory/framing`) — answer Kahneman and Tversky
  questions and discover your own reflection effect.
- **Endowment Experiment** (`/endowment-effect/trade`) — measure your own
  willingness to accept vs pay and see the gap.
- **Commitment Device** (`/time-inconsistency/savings`) — save across 12 days
  and feel present bias steal your own plans.
- **Dictator Game** (`/social-preferences/dictator`) — decide how much of your
  endowment to give when nobody can punish you.
- **Order Book** (`/market-microstructure/order-book`) — trade the spread: cross
  it with market orders or earn it back with limits.
- **Job Market** (`/signaling/job-market`) — set wages and learn why education
  only works as a signal when it costs more for the unproductive.

---

# First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag the
  app to your Applications folder.
- **Linux (AppImage):** `chmod +x economics.AppImage` then run it — no install
  needed.
- **Windows:** SmartScreen may flag the `.msi` — click "More info" → "Run
  anyway".

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](LICENSE).
