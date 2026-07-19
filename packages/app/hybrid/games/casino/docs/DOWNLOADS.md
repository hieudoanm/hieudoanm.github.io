# Casino

> Baccarat, card-counting trainer, poker-odds tools, and more — a full casino
> experience that runs on your phone, tablet, laptop, and desktop. Zero internet
> needed.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────┐
│  🎰 Casino                      │
│  ──────────────────────────────  │
│  ┌──────────────────────────┐    │
│  │  🂡 A♠   🂢 2♥   🂣 3♦   │    │
│  │  Player:  7              │    │
│  │  Banker:  5              │    │
│  └──────────────────────────┘    │
│  ──────────────────────────────  │
│  Bet: [Player] [Banker] [Tie]   │
│  Credits: 200    Stake: 10      │
└──────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-games-casino-latest` — updates ship continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

## First run

- **macOS:** Right-click the `.dmg` and select _Open_ to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x casino.AppImage && ./casino.AppImage`
- **Windows SmartScreen:** Click _More info → Run anyway_ if SmartScreen flags
  the installer.
- **Android Play Protect:** If Play Protect blocks the install, tap _Install
  anyway_.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/games/casino
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Full-scale casino games — Baccarat, card-counting trainer, poker-odds
calculator, slots, roulette, craps, war, keno, and Hi-Lo. Every game runs
offline with pure logic and injectable randomness.

---

## Features

A complete casino suite with card games, dice games, and number draws.

### 🃏 Baccarat

- Six-deck shoe with reshuffling when it runs low
- Full third-card drawing rules (player rule + banker matrix)
- Player / Banker / Tie bets paying 2:1, 1.95:1, 8:1
- Natural detection (8 or 9) ends the round immediately
- Hand values rendered live next to each card row

### 🂡 Card Counter

- Hi-Lo counting trainer across a shuffled 52-card deck
- Deal one card at a time; reveal to self-check the running count
- Values: 2–6 → +1, 7–9 → 0, 10–A → −1
- Session resets to a fresh shuffled deck

### ♠️ Poker Odds

- Texas Hold'em equity calculator for up to nine players
- Card pickers for hole cards and the board (flop required)
- Exhaustive best-five-of-seven evaluation across all 21 combinations
- Monte Carlo simulation with 5,000 iterations per run
- Equity meter with win/tie breakdown

### 🎲 Over Under Seven

- Two-dice betting: under 7, exactly 7, or over 7
- Payouts of 2:1 / 5:1 / 2:1 on a stake of 10
- Dice faces rendered with Unicode glyphs and a total readout

### 🎰 Slot Machine

- Three reels, six symbols (cherry, lemon, bell, seven, diamond, jackpot)
- Three of a kind pays the full multiplier (up to 50×)
- Any pair pays half of the paired symbol's multiplier
- Broke state with credit reset

### 🎯 Roulette

- European single-zero wheel (37 pockets)
- Outside bets — red, black, even, odd, low (1–18), high (19–36) — pay 2:1
- Straight-up zero pays 36:1
- Winning number displayed in its pocket colour

### 🎲 Craps

- Pass-line betting only
- Come-out roll: 7/11 wins, 2/3/12 craps out, anything else sets the point
- Roll the point before a seven to win at 2:1
- Status line narrates the phase (come-out / point is N / result)

### ⚔️ War

- One card each — higher card takes the stake at 2:1
- Ties trigger wars: three burn cards per side, pot doubles per war
- Win-streak tracker
- Automatic reshuffle once the deck runs low

### 🔢 Keno

- Eighty-number grid; pick up to five spots
- Twenty numbers drawn per round with caught numbers marked
- Paytable by picks/catches topping out at 700× (five-for-five)
- Quick Pick auto-selection

### 🔢 Hi-Lo

- Guess whether the next card is strictly higher or lower
- Aces high, ties lose
- Correct guesses pay 2:1 and build streaks (best streak tracked)
- Red/black suit colouring on every card

### 🔄 Shared

- `_shared/cards.ts` — deck creation, Fisher-Yates shuffle, card drawing,
  red-suit detection reused by all card games
- Consistent credit economy (200 starting credits, stake 10) across betting
  games
- Deterministic game logic — every ruleset lives in pure functions with
  injectable randomness for testing

### 📱 Platform

- Static-exported Next.js app — runs offline as a PWA
- Tauri 2 desktop shell (macOS / Linux / Windows targets configured)
- Dark (Dracula) and light (Bumblebee) themes with persistence
- Responsive layouts down to mobile widths

---

## First run

---

## Next steps

- **Want to contribute?** Check [CONTRIBUTING](CONTRIBUTING) for setup and dev
  commands.
- **Curious what's coming?** Read the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
