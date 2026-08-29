# Nikoli

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

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-entertainment-nikoli-latest/SHA256SUMS.txt

## About

Nikoli — logic puzzle games based on the publications of Nikoli Co., Ltd., a
Japanese publisher founded in 1980 by Maki Kaji. Nikoli is famous for
popularising Sudoku worldwide and for publishing "culture-independent" puzzles
that rely on pure logic rather than language or alphabet.

## Features

## Games

### Sudoku (数独 / Number Place)

- Fill a 9×9 grid so each row, column, and 3×3 box contains digits 1–9
- Three difficulty levels: Easy, Medium, Hard
- Hint system with cell highlighting
- Auto-solve with step-by-step visualization
- Timer and move counter
- Undo history

### Nurikabe (ぬりかべ / Cell Structure)

- Paint cells black to form a single connected stream, leaving numbered islands
- Each numbered island must contain exactly that many cells
- Islands cannot touch each other horizontally or vertically
- 6×6 grid with procedurally generated puzzles
- Undo, auto-solve, new game

### Masyu (ましゅ)

- Draw a single loop through all pearls
- Turn at black pearls, go straight through white pearls
- Loop must visit every pearl on the board
- Undo, auto-solve, new game

### Shikaku (四角に切れ / Divide by Squares)

- Divide the grid into rectangles, each containing exactly one numbered cell
- Each rectangle's area equals its number
- Rectangles cannot overlap
- Undo, auto-solve, new game

### Fillomino (フィルオミノ)

- Fill the grid with polyominoes where each region's size equals its number
- Regions of the same number cannot touch (except diagonally)
- Undo, auto-solve, new game

### Norinori (のりのり)

- Shade exactly two cells in each domino-shaped region
- Shaded cells cannot touch each other horizontally or vertically (except within
  a domino)
- Undo, auto-solve, new game

### Heyawake (へやわけ)

- Shade cells following numbered room constraints
- Numbers indicate how many cells in that room must be shaded
- No three consecutive unshaded cells in a row or column
- Undo, auto-solve, new game

## More Nikoli Puzzles

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

## Shared Features

- "How to Play" instructions modal for each game with visual examples
- Responsive layout (desktop and mobile)
- Dark theme by default
- Sticky header with navigation (Home, About, Downloads, Version)
- Back navigation to home page
- Game card grid on home page with descriptions

## About Nikoli

- Founded in 1980 by Maki Kaji (木村 薫), named after the racehorse Nikoli who
  won the 1980 Irish 2,000 Guineas
- Publisher of _Puzzle Communication Nikoli_, a quarterly magazine
- Notable for "culture-independent" puzzles — purely logical, often numerical,
  not reliant on any language or alphabet
- Sudoku (数独), the most popular logic puzzle in Japan, was popularised
  worldwide by Nikoli in 2005
- Over 80 puzzle types published

## Platform & UX

- Static export for offline-first PWA support
- Service worker caches all pages for offline play
- Tauri desktop app build (bundling configured; signing not yet)
- PWA manifest for installability

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

No LICENSE file is included for this project.
