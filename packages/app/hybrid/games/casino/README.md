# Casino

Ten casino classics — cards, dice, reels, and lucky numbers — shipped as a
hybrid app (web via Next.js, desktop via Tauri).

## Games

| Game             | Route               | Summary                                         |
| ---------------- | ------------------- | ----------------------------------------------- |
| Baccarat         | `/baccarat`         | Player/banker/tie on a six-deck shoe            |
| Card Counter     | `/card-counter`     | Hi-Lo counting trainer                          |
| Poker Odds       | `/poker-odds`       | Hold'em equity calculator (Monte Carlo)         |
| Over Under Seven | `/over-under-seven` | Two-dice under/over/exactly-7 betting           |
| Slot Machine     | `/slot-machine`     | Three reels, multipliers up to 50×              |
| Roulette         | `/roulette`         | Single-zero wheel, outside bets + straight zero |
| Craps            | `/craps`            | Pass line with point phases                     |
| War              | `/war`              | Higher card wins; wars double the pot           |
| Keno             | `/keno`             | Pick up to 5 of 80, twenty drawn                |
| Hi-Lo            | `/hi-lo`            | Higher or lower, streaks pay 2:1                |

## Documentation

See `docs/` for the full guides:

- [Architecture](./docs/ARCHITECTURE.md)
- [Features](./docs/FEATURES.md)
- [Roadmap](./docs/ROADMAP.md)
- [Contributing](./docs/CONTRIBUTING.md)
- [Downloads](./docs/DOWNLOADS.md)

## Development

```bash
pnpm install
pnpm dev --filter=@hieudoanm.github.io/casino
pnpm test --filter=@hieudoanm.github.io/casino
```
