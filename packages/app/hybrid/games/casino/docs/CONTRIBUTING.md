# Contributing

Thanks for contributing to **Casino**, a hybrid app that ships as a web app
(browser), desktop app (Tauri), and mobile app (Tauri Mobile).

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/casino
   ```

## Development Commands

| Task       | Command                                              |
| ---------- | ---------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/casino`      |
| Build      | `pnpm build --filter=@hieudoanm.github.io/casino`    |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/casino`     |
| Format     | `pnpm format --filter=@hieudoanm.github.io/casino`   |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/casino`     |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/casino` |

Run `lint`, `format`, and `test` before pushing — CI enforces all of them.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them for
every change.

### General

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses (`if (!value) return`).
3. **Self-documenting identifiers** — `bankerDrawRule(value)` needs no comment;
   `processData(x)` does.
4. **DRY** — when a pattern repeats, centralize it.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
6. **Explicit error handling** — check errors and fail loudly.
7. **Test names as documentation** —
   `test("pays tie odds on a tie after third-card draws")`.
8. **Consistent imports** — group by origin: stdlib, third-party, internal.
9. **Pure functions with explicit dependencies** — accept inputs, return
   outputs; no global/singleton state.
10. **Conventional layouts** — `src/`, `components/`, `games/`, `e2e/`.

### Game Modules

1. One directory per game under `src/games/`: `types.ts`, `utils.ts`,
   `use[Game].ts`, `index.tsx`.
2. Keep all rules, payouts, and settlement logic in pure `utils.ts` functions;
   hooks only orchestrate state transitions and credit accounting.
3. Inject randomness through optional parameters (`playSpin(bet, number?)`,
   `playRound(bet, dice?)`) so tests stay deterministic without reaching into
   module internals.
4. Reuse `_shared/cards.ts` for any playing-card mechanic — do not re-implement
   decks or shuffling per game.
5. Guard states in hooks: never deal/spin/roll without a bet or sufficient
   credits; expose explicit phase values instead of implicit booleans.

### Testing

1. Unit-test every `utils.ts` exhaustively (rules tables, payout edges).
2. Test hooks through user-visible flows (select bet → deal → settle → next
   round) with `renderHook` + `act`.
3. Mock randomness at the level where the caller is external to the module under
   test; pass deterministic values directly when parameters allow.
4. Keep coverage above the 80% threshold enforced in `jest.config.ts` (currently
   93%+).

## Submitting Changes

1. Create a feature branch.
2. Make your change with tests.
3. Run `pnpm lint --filter=@hieudoanm.github.io/casino` and
   `pnpm test --filter=@hieudoanm.github.io/casino`.
4. Open a pull request describing the gameplay or platform impact.
