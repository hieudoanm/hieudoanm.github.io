# Football Squad Manager

Pick a formation, build your squad, and assign players to positions on the
pitch. Everything is persisted locally in your browser.

## Features

- Formations for 11-, 7-, and 5-a-side (4-4-2, 4-3-3, 3-5-2, …)
- Interactive pitch with position markers
- Add and remove squad members
- Assign players to positions via a player picker
- `localStorage` persistence

## Getting Started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Commands

| Command          | Description                   |
| ---------------- | ----------------------------- |
| `pnpm dev`       | Start the dev server          |
| `pnpm build`     | Production build              |
| `pnpm lint`      | ESLint (with auto-fix)        |
| `pnpm typecheck` | TypeScript type checking      |
| `pnpm format`    | Prettier (`--write`)          |
| `pnpm test`      | Jest unit tests with coverage |
| `pnpm test:e2e`  | Playwright e2e tests          |

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Contributing](docs/CONTRIBUTING.md)
