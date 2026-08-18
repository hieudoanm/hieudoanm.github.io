# Features

> Countries — geography word games inspired by Wordle (NYT) and Connections
> (NYT), with every answer drawn from the world's countries.

## Games

### Country Wordle

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

### Country Connections

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

### Border Guesser

- Shown a country; pick which of four options it actually borders
- Question pool: ranked countries with at least two neighbours in the borders
  dataset; decoys are never neighbours
- Correct picks grow the streak; wrong picks reveal the full neighbour list
- Score / streak / best-streak tracking with instant feedback

### Continents Sort

- Drag (or tap-to-select then tap) fifteen ranked countries into their
  continents — Africa, Europe, Asia, Oceania, Americas
- Correct drops tint the card green; wrong drops are struck through in red and
  cost a mistake
- Color-coded continent buckets; game ends once every card is placed
- Perfect-game detection and New Game redeal

### Emoji Guesser

- Given a country name, pick its flag emoji from four options
- Questions drawn from the top-ranked countries; decoys never repeat flags
- Score / streak / best-streak tracking

### Flag Guesser

- Name the country from its flag emoji — four options, one correct
- Wrong picks reveal the correct name alongside its flag
- Score / streak / best-streak tracking

### Higher or Lower

- Which of two countries has the larger population? Pick left or right
- Population data for every ranked country; ties count as correct
- Compact population formatting (`B`/`M`/`K`) revealed after each guess
- Accuracy percentage plus score / streak / best-streak tracking

## Shared Data

- `src/games/_shared/` — single source of truth for all games:
  - `countries.ts` — guessable country names (Wordle)
  - `countries-data.ts` — 250 country entries with flag emoji, popularity rank,
    region and subregion (quiz games)
  - `borders.ts` — country → bordering countries map (Border Guesser)
  - `population.ts` — population counts per country (Higher or Lower)
  - `quiz.ts` — shared quiz helpers: question pools, option builders, pure
    score/streak transitions

## Shared Features

- Home page game card grid with descriptions
- Sticky header with home navigation and theme toggle
- Dracula (dark) theme by default, Bumblebee light theme toggle persisted to
  `localStorage`
- Responsive layout (desktop and mobile)

## Future Game Ideas

| Game     | Description                                            |
| -------- | ------------------------------------------------------ |
| Capitals | Match countries to their capital cities                |
| Globe    | GeoGuessr-style guessing with distance/direction hints |
| Trivia   | Area, currency, and language questions                 |

## Platform & UX

- Static export for offline-first PWA support
- Tauri desktop shell configured (bundling not yet enabled — see
  [docs/PACKAGING.md](docs/PACKAGING.md))
- PWA-ready static output

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
