# Countries

> Geography word games inspired by Wordle and Connections — every answer drawn
> from the world's countries. Play on phone, tablet, laptop, or desktop,
> completely offline.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────┐
│  🌍 Countries                   │
│  ──────────────────────────────  │
│  C  O  U  N  T  R  Y           │
│  🟩 🟩 ⬜ 🟩 🟩 🟩             │
│                                  │
│  ┌─────┐┌─────┐┌─────┐┌─────┐  │
│  │ 🇯🇵 ││ 🇧🇷 ││ 🇳🇬 ││ 🇦🇺 │  │
│  │Japan││Brazil││Nigeria││Aus.│  │
│  └─────┘└─────┘└─────┘└─────┘  │
│  🟨 🟩 🟨 ⬜  — 1 away...       │
└──────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-games-countries-latest` — updates ship continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-countries-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-countries-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-countries-latest/countries_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-countries-latest/countries_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-countries-latest/countries_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-countries-latest/countries_x64.msi

<br>

¹ Android `.aab` — upload to Google Play or sideload via bundletool.

² macOS `.dmg` — Apple Silicon build (M1/M2/M3/M4).

## First run

- **macOS:** Right-click the `.dmg` and select *Open* to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x countries_amd64.AppImage && ./countries_amd64.AppImage`
- **Windows SmartScreen:** Click *More info → Run anyway* if SmartScreen flags the installer.
- **Android Play Protect:** If Play Protect blocks the install, tap *Install anyway*.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-games-countries-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/games/countries
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Geography word games that test your knowledge of the world's countries — from
flag emojis to borders to population comparisons. Seven games, one dataset,
zero internet required.

---

## Features

Geography games that challenge what you know about every country on Earth.

### 🌐 Country Wordle
- Guess the hidden country name in up to six tries
- Every valid answer is a country from the shared dataset (~195 entries)
- Daily puzzle: answer chosen deterministically by hashing today's date, so
  every player gets the same country each day
- Tile feedback after each guess:
  - **Green (`correct`)** — right letter in the right position
  - **Yellow (`present`)** — letter is in the answer but elsewhere
  - **Gray (`absent`)** — letter is not in the answer
- On-screen QWERTY keyboard mirrors tile colors for used letters
- Physical keyboard support (letters, Enter, Backspace)
- "Not enough letters" validation message
- Win/lose alert with guess count or the revealed answer
- New game button replays with a fresh daily draw

### 🧩 Country Connections
- Group sixteen countries into four hidden categories of four
- Eight authored puzzles; each verified to be a disjoint partition of valid
  country names
- Daily puzzle selection by date hash
- Select exactly four tiles and submit; four mistakes allowed
- Feedback messages: "One away..." when a guess overlaps a group by three, "Not
  quite." otherwise
- Solved groups animate above the board with DaisyUI color coding (yellow,
  green, blue, red)
- Shuffle and Deselect-all board controls
- Losing reveals all remaining groups; win offers a next-puzzle button

### 🗺️ Border Guesser
- Shown a country; pick which of four options it actually borders
- Question pool: ranked countries with at least two neighbours in the borders
  dataset; decoys are never neighbours
- Correct picks grow the streak; wrong picks reveal the full neighbour list
- Score / streak / best-streak tracking with instant feedback

### 🌍 Continents Sort
- Drag (or tap-to-select then tap) fifteen ranked countries into their
  continents — Africa, Europe, Asia, Oceania, Americas
- Correct drops tint the card green; wrong drops are struck through in red and
  cost a mistake
- Color-coded continent buckets; game ends once every card is placed
- Perfect-game detection and New Game redeal

### 😀 Emoji Guesser
- Given a country name, pick its flag emoji from four options
- Questions drawn from the top-ranked countries; decoys never repeat flags
- Score / streak / best-streak tracking

### 🏴 Flag Guesser
- Name the country from its flag emoji — four options, one correct
- Wrong picks reveal the correct name alongside its flag
- Score / streak / best-streak tracking

### ⬆️⬇️ Higher or Lower
- Which of two countries has the larger population? Pick left or right
- Population data for every ranked country; ties count as correct
- Compact population formatting (`B`/`M`/`K`) revealed after each guess
- Accuracy percentage plus score / streak / best-streak tracking

### 📊 Shared Data
- `src/games/_shared/` — single source of truth for all games:
  - `countries.ts` — guessable country names (Wordle)
  - `countries-data.ts` — 250 country entries with flag emoji, popularity rank,
    region and subregion (quiz games)
  - `borders.ts` — country → bordering countries map (Border Guesser)
  - `population.ts` — population counts per country (Higher or Lower)
  - `quiz.ts` — shared quiz helpers: question pools, option builders, pure
    score/streak transitions

### 🔄 Shared Features
- Home page game card grid with descriptions
- Sticky header with home navigation and theme toggle
- Dracula (dark) theme by default, Bumblebee light theme toggle persisted to
  `localStorage`
- Responsive layout (desktop and mobile)

### 📱 Platform & UX
- Static export for offline-first PWA support
- Tauri desktop shell configured (bundling not yet enabled — see
  [docs/PACKAGING.md](docs/PACKAGING.md))
- PWA-ready static output

---

## First run

---

## Next steps

- **Want to contribute?** Check [CONTRIBUTING](CONTRIBUTING) for setup and dev commands.
- **Curious what's coming?** Read the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).