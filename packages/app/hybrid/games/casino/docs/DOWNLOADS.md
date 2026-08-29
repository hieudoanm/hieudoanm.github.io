# Casino

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/casino_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-casino-latest/SHA256SUMS.txt

## About

Casino — Baccarat, card-counting trainer, and poker-odds tools.

## Features

## Games

### Baccarat

- Six-deck shoe with reshuffling when it runs low
- Full third-card drawing rules (player rule + banker matrix)
- Player / Banker / Tie bets paying 2:1, 1.95:1, 8:1
- Natural detection (8 or 9) ends the round immediately
- Hand values rendered live next to each card row

### Card Counter

- Hi-Lo counting trainer across a shuffled 52-card deck
- Deal one card at a time; reveal to self-check the running count
- Values: 2–6 → +1, 7–9 → 0, 10–A → −1
- Session resets to a fresh shuffled deck

### Poker Odds

- Texas Hold'em equity calculator for up to nine players
- Card pickers for hole cards and the board (flop required)
- Exhaustive best-five-of-seven evaluation across all 21 combinations
- Monte Carlo simulation with 5,000 iterations per run
- Equity meter with win/tie breakdown

### Over Under Seven

- Two-dice betting: under 7, exactly 7, or over 7
- Payouts of 2:1 / 5:1 / 2:1 on a stake of 10
- Dice faces rendered with Unicode glyphs and a total readout

### Slot Machine

- Three reels, six symbols (cherry, lemon, bell, seven, diamond, jackpot)
- Three of a kind pays the full multiplier (up to 50×)
- Any pair pays half of the paired symbol's multiplier
- Broke state with credit reset

### Roulette

- European single-zero wheel (37 pockets)
- Outside bets — red, black, even, odd, low (1–18), high (19–36) — pay 2:1
- Straight-up zero pays 36:1
- Winning number displayed in its pocket colour

### Craps

- Pass-line betting only
- Come-out roll: 7/11 wins, 2/3/12 craps out, anything else sets the point
- Roll the point before a seven to win at 2:1
- Status line narrates the phase (come-out / point is N / result)

### War

- One card each — higher card takes the stake at 2:1
- Ties trigger wars: three burn cards per side, pot doubles per war
- Win-streak tracker
- Automatic reshuffle once the deck runs low

### Keno

- Eighty-number grid; pick up to five spots
- Twenty numbers drawn per round with caught numbers marked
- Paytable by picks/catches topping out at 700× (five-for-five)
- Quick Pick auto-selection

### Hi-Lo

- Guess whether the next card is strictly higher or lower
- Aces high, ties lose
- Correct guesses pay 2:1 and build streaks (best streak tracked)
- Red/black suit colouring on every card

## Shared

- `_shared/cards.ts` — deck creation, Fisher-Yates shuffle, card drawing,
  red-suit detection reused by all card games
- Consistent credit economy (200 starting credits, stake 10) across betting
  games
- Deterministic game logic — every ruleset lives in pure functions with
  injectable randomness for testing

## Platform

- Static-exported Next.js app — runs offline as a PWA
- Tauri 2 desktop shell (macOS / Linux / Windows targets configured)
- Dark (Dracula) and light (Bumblebee) themes with persistence
- Responsive layouts down to mobile widths

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
