# Contributing

Thanks for contributing to **Countries**, a hybrid app that ships as a web app
(browser), desktop app (Tauri), and mobile app (Tauri Mobile).

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/countries
   ```

## Development Commands

| Task       | Command                                                 |
| ---------- | ------------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/countries`      |
| Build      | `pnpm build --filter=@hieudoanm.github.io/countries`    |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/countries`     |
| Format     | `pnpm format --filter=@hieudoanm.github.io/countries`   |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/countries`     |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/countries` |

Run `lint`, `format`, `test`, and `test:e2e` before pushing — CI enforces all of
them.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them for
every change.

### General

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols. A signature tells the reader more than a body.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses (`if (!value) return`).
3. **Self-documenting identifiers** — `getCountryByName(name)` needs no comment;
   `processData(x)` does.
4. **DRY** — when a pattern repeats, centralize it. Duplication is how bugs get
   missed.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
6. **Explicit error handling** — check errors and fail loudly; never let
   failures silently propagate.
7. **Test names as documentation** —
   `test("rejects a guess shorter than the answer")`.
8. **Consistent imports** — group by origin: stdlib, third-party, internal.
9. **Pure functions with explicit dependencies** — accept inputs, return
   outputs; no global/singleton state.
10. **Conventional layouts** — `src/`, `components/`, `games/`, `e2e/`.

### TypeScript

1. Use arrow functions for all function declarations and component exports —
   `const fn = () => {}`, not `function fn() {}`.
2. Use `const` over `let` when a value is never reassigned.
3. Use `strict: true` in `tsconfig.json`.
4. Prefer `interface` over `type` for object shapes; use `type` for unions,
   intersections, and primitives.
5. Use `as const` for literal types; use branded types for domain primitives.
6. Use `satisfies` over raw casts — `const config = {...} satisfies Config`.
7. Use `never` in exhaustive checks — `default: const _exhaustive: never = x;`.
8. Use `Readonly<T>` and `Partial<T>` to mark immutability.
9. Explicitly type return values on exported functions.

### React

1. Prefer function components with hooks; never nest hooks inside conditionals
   or loops.
2. Extract custom hooks (`useWordle`, `useConnections`) for reusable logic.
3. Use a stable `key` prop in lists — never array indices.
4. Memoise sparingly (`useMemo`/`useCallback`) — profile first.
5. Guard game-input handlers against terminal states (`status !== 'playing'`).

### Next.js

1. Use the App Router (`app/`) and prefer Server Components by default.
2. Mark files `"use client"` only when they need interactivity or hooks.
3. Use route groups `(games)` and `(info)` to organize page categories.
4. Use `loading.tsx`, `error.tsx`, `not-found.tsx` file conventions for
   fallbacks.
5. Use `next/link` for client-side navigation.

### Styling

1. Use Tailwind utility classes; compose, don't write custom CSS.
2. Use DaisyUI component classes (`btn`, `card`, `alert`) and semantic colors
   (`success`, `warning`, `neutral`, `error`) for tile/group feedback.
3. Dracula is the default theme; Bumblebee is the light alternative.
4. `prettier-plugin-tailwindcss` sorts classes — keep class order consistent.
5. Use `react-icons` Feather (`Fi`) set for icons.

### Game Architecture

Each game module must keep data, logic, state, and UI separated:

- `types.ts` — domain types. No UI imports.
- `utils.ts` — pure functions for validation/evaluation. No UI imports.
- `puzzles.ts` (Connections only) — authored content + daily selection. No UI
  imports.
- `use[Game].ts` — custom hook for game state and input handling. No UI imports.
- `index.tsx` — React component rendering board + controls.

Shared infrastructure lives in `src/games/_shared/`:

- `countries.ts` — the country dataset and lookup helpers. All game content must
  validate against this dataset.

New games must register a card on the home page (`src/app/page.tsx`) and a route
under `src/app/(games)/<slug>/page.tsx`.

## Testing Conventions

### Unit tests (Jest)

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert.
3. Keep tests isolated — each test manages its own state.
4. Cover boundary conditions and error cases alongside happy paths (e.g.
   duplicate letters in Wordle evaluation, four-mistakes loss in Connections).
5. Break tests into small per-file suites — one `*.test.ts` / `*.test.tsx` per
   unit (component, page, hook, util, provider) colocated in a `__tests__/`
   directory; never merge multiple units into one file. App pages are tested
   under `src/app/__tests__/` with a `*.test.tsx` matching each page, and pages
   in route groups (`(app)`, `(info)`) colocate `__tests__/page.test.tsx` in the
   same folder. Use `it.each` for data-driven tests.
6. Maintain ≥80% coverage on statements, branches, functions, and lines —
   enforced by `coverageThreshold` in `jest.config.ts`; run
   `pnpm exec jest --coverageReporters=text` to view per-file coverage.

### E2E tests (Playwright)

1. Use `locator`/`getByRole`/`getByTestId` over raw CSS/XPath.
2. Use `test.beforeEach` for shared setup.
3. Assert on user-visible state (`toBeVisible`, `toHaveText`).
4. Cover every page-level flow (`pnpm test:e2e`).

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/countries`
2. `pnpm format --filter=@hieudoanm.github.io/countries`
3. `pnpm test --filter=@hieudoanm.github.io/countries`
4. `pnpm test:e2e --filter=@hieudoanm.github.io/countries`
5. `pnpm build --filter=@hieudoanm.github.io/countries`
