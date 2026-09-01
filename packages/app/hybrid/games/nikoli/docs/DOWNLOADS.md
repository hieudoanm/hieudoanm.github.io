# Nikoli

> Seven classic logic puzzle games from Nikoli — Sudoku, Nurikabe, Masyu,
> Shikaku, Fillomino, Norinori, and Heyawake. Pure logic, no language needed.
> Play on phone, tablet, laptop, or desktop, fully offline.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────┐
│  🧩 Nikoli Puzzles              │
│  ──────────────────────────────  │
│  ┌───┬───┬───┬───┬───┬───┬───┐  │
│  │ 5 │ 3 │ . │ . │ 7 │ . │ . │  │
│  ├───┼───┼───┼───┼───┼───┼───┤  │
│  │ 6 │ . │ . │ 1 │ 9 │ 5 │ . │  │
│  ├───┼───┼───┼───┼───┼───┼───┤  │
│  │ . │ 9 │ 8 │ . │ . │ . │ . │  │
│  ├───┼───┼───┼───┼───┼───┼───┤  │
│  │ 8 │ . │ . │ . │ 6 │ . │ . │  │
│  ├───┼───┼───┼───┼───┼───┼───┤  │
│  │ 4 │ . │ . │ 8 │ . │ 3 │ . │  │
│  ├───┼───┼───┼───┼───┼───┼───┤  │
│  │ . │ . │ . │ . │ 2 │ . │ 6 │  │
│  ├───┼───┼───┼───┼───┼───┼───┤  │
│  │ . │ . │ . │ . │ . │ . │ . │  │
│  └───┴───┴───┴───┴───┴───┴───┘  │
│  Timer: 12:34  Hints: 3         │
└──────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-entertainment-nikoli-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note              |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ----------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly  |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload  |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install  |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                   |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon     |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                   |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-entertainment-nikoli-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-entertainment-nikoli-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-entertainment-nikoli-latest/nikoli_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-entertainment-nikoli-latest/nikoli_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-entertainment-nikoli-latest/nikoli_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-entertainment-nikoli-latest/nikoli_x64.msi

<br>

¹ Android `.aab` — upload to Google Play or sideload via bundletool.

² macOS `.dmg` — Apple Silicon build (M1/M2/M3/M4).

## First run

- **macOS:** Right-click the `.dmg` and select *Open* to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x nikoli_amd64.AppImage && ./nikoli_amd64.AppImage`
- **Windows SmartScreen:** Click *More info → Run anyway* if SmartScreen flags the installer.
- **Android Play Protect:** If Play Protect blocks the install, tap *Install anyway*.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-entertainment-nikoli-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/games/nikoli
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Seven classic Nikoli logic puzzles — Sudoku, Nurikabe, Masyu, Shikaku,
Fillomino, Norinori, and Heyawake. Culture-independent puzzles that rely on
pure logic rather than language, playable on any device.

---

## Features

Pure-logic puzzle games from the publisher that popularised Sudoku worldwide.

### 🔢 Sudoku
- Fill a 9×9 grid so each row, column, and 3×3 box contains digits 1–9
- Three difficulty levels: Easy, Medium, Hard
- Hint system with cell highlighting
- Auto-solve with step-by-step visualization
- Timer and move counter
- Undo history

### 🏠 Nurikabe
- Paint cells black to form a single connected stream, leaving numbered islands
- Each numbered island must contain exactly that many cells
- Islands cannot touch each other horizontally or vertically
- 6×6 grid with procedurally generated puzzles
- Undo, auto-solve, new game

### 💎 Masyu
- Draw a single loop through all pearls
- Turn at black pearls, go straight through white pearls
- Loop must visit every pearl on the board
- Undo, auto-solve, new game

### 🔲 Shikaku
- Divide the grid into rectangles, each containing exactly one numbered cell
- Each rectangle's area equals its number
- Rectangles cannot overlap
- Undo, auto-solve, new game

### 🧱 Fillomino
- Fill the grid with polyominoes where each region's size equals its number
- Regions of the same number cannot touch (except diagonally)
- Undo, auto-solve, new game

### 🟫 Norinori
- Shade exactly two cells in each domino-shaped region
- Shaded cells cannot touch each other horizontally or vertically (except within
  a domino)
- Undo, auto-solve, new game

### 🏠 Heyawake
- Shade cells following numbered room constraints
- Numbers indicate how many cells in that room must be shaded
- No three consecutive unshaded cells in a row or column
- Undo, auto-solve, new game

### 📖 More Nikoli Puzzles
Nikoli publishes 80+ puzzle types. The following are candidates for future
additions:

| Puzzle         | Japanese         | English title | Description                                                               |
| -------------- | ---------------- | ------------- | ------------------------------------------------------------------------- |
| Kakuro         | カックロ         | Cross Sums    | Fill cells with digits 1–9; clues show sums of consecutive runs           |
| Hashiwokakero  | 橋をかけろ       | Bridges       | Connect islands with 1 or 2 bridges; all islands must connect             |
| Slitherlink    | スリザーリンク   | Fences        | Draw a single loop; clues indicate how many of a cell's sides are used    |
| Hitori         | ひとりにしてくれ | —             | Shade cells so no row/column has duplicates; shaded cells can't touch     |
| Light Up       | 美術館           | —             | Place bulbs so every white cell is lit; black cells block light           |
| Kuromasu       | 黒マスはどこだ   | —             | Cells have "see counts"; black cells block vision                         |
| Numberlink     | ナンバーリンク   | —             | Connect matching number pairs with non-overlapping paths                  |
| Tatamibari     | タタミバリ       | —             | Divide grid into rectangular tatami mats with polarity constraints        |
| Yajilin        | ヤジリン         | Arrow Ring    | Follow arrows to shade cells; draw a single non-intersecting loop         |
| Tentai Show    | 天体ショー       | Galaxies      | Divide grid into rotationally symmetric regions around dot centers        |
| Ripple Effect  | 波及効果         | —             | Fill regions with numbers; same numbers in a region must be N cells apart |
| Bag            | バッグ           | Corral        | Draw a loop; clues indicate how many cells the loop passes through        |
| Gokigen Naname | ごきげんななめ   | Slant         | Draw diagonals in cells; circle clues show how many meet at that corner   |
| Edel           | エデル           | Nonogram      | Shade cells to form a picture; row/column clues indicate shade runs       |

### 🔄 Shared Features
- "How to Play" instructions modal for each game with visual examples
- Responsive layout (desktop and mobile)
- Dark theme by default
- Sticky header with navigation (Home, About, Downloads, Version)
- Back navigation to home page
- Game card grid on home page with descriptions

### 🏛️ About Nikoli
- Founded in 1980 by Maki Kaji (木村 薫), named after the racehorse Nikoli who
  won the 1980 Irish 2,000 Guineas
- Publisher of _Puzzle Communication Nikoli_, a quarterly magazine
- Notable for "culture-independent" puzzles — purely logical, often numerical,
  not reliant on any language or alphabet
- Sudoku (数独), the most popular logic puzzle in Japan, was popularised
  worldwide by Nikoli in 2005
- Over 80 puzzle types published

### 📱 Platform & UX
- Static export for offline-first PWA support
- Service worker caches all pages for offline play
- Tauri desktop app build (bundling configured; signing not yet)
- PWA manifest for installability

---

## First run

---

## Next steps

- **Want to contribute?** Check [CONTRIBUTING](CONTRIBUTING) for setup and dev commands.
- **Curious what's coming?** Read the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).