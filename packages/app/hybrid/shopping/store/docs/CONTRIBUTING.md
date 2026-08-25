# Contributing

Thanks for contributing to **Store**, the Apps Store for all hybrid and native
apps. Browse, search, and download apps across platforms.

## Getting Started

1. **Prerequisites**: Node.js 26 (see `.nvmrc`), `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/store
   ```

## Development Commands

| Task       | Command                                              |
| ---------- | ---------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/store`       |
| Build      | `pnpm build --filter=@hieudoanm.github.io/store`     |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/store`      |
| Format     | `pnpm format --filter=@hieudoanm.github.io/store`    |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/store`      |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/store`  |
| Desktop    | `pnpm tauri --filter=@hieudoanm.github.io/store dev` |

Run `lint`, `format`, `test`, and `test:e2e` before pushing — CI enforces all of
them.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them for
every change.

### General

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses (`if (!value) return`).
3. **Self-documenting identifiers** — `parseDownloads(sections)` needs no
   comment.
4. **DRY** — when a pattern repeats, centralize it.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
6. **Explicit error handling** — check errors and fail loudly.
7. **Test names as documentation** —
   `it("recommends the correct platform download")`.
8. **Consistent imports** — group by origin: stdlib, third-party, internal.
9. **Pure functions with explicit dependencies** — accept inputs, return
   outputs; no global/singleton state.
10. **Conventional layouts** — `src/app/`, `src/components/`, `src/lib/`,
    `e2e/`.

### TypeScript

1. Use arrow functions for all function declarations and component exports —
   `const fn = () => {}`, not `function fn() {}`.
2. Use `const` over `let` when a value is never reassigned.
3. Use `strict: true` in `tsconfig.json`.
4. Prefer `interface` over `type` for object shapes; use `type` for unions,
   intersections, and primitives.
5. Use `as const` for literal types.
6. Use `satisfies` over raw casts.
7. Explicitly type return values on exported functions.

### React

1. Prefer function components with hooks; never nest hooks inside conditionals
   or loops.
2. Type components with the `FC` helper from `react`.
3. Extract custom hooks (`useX`) for reusable logic.
4. Use a stable `key` prop in lists.
5. Memoise sparingly — profile first.

### Next.js

1. Use the App Router with `[slug]` dynamic segments.
2. Mark files `"use client"` only when they need interactivity or hooks.
3. Use `loading.tsx`, `error.tsx`, `not-found.tsx`, `default.tsx`,
   `template.tsx` file conventions.
4. Use `generateStaticParams` for all dynamic routes (required by
   `output: export`).
5. Use `next/link` for client-side navigation.

### Styling

1. Use Tailwind utility classes; compose, don't write custom CSS.
2. Use DaisyUI component classes (`btn`, `card`, `badge`, `input`, `join`).
3. Dark theme is the default (`data-theme="nothing"`).
4. `prettier-plugin-tailwindcss` sorts classes — keep class order consistent.
5. Use emoji icons via `StoreCard`'s `ICON_EMOJI` map (no runtime icon library).

## Data Conventions

- The store has its own copy of `downloads.json` / `downloads.csv` in
  `src/data/` — not imported cross-package.
- To update the catalog, edit `src/data/downloads.csv` and run
  `pnpm ts-node src/data/scripts/convert-csv-to-json.ts` to regenerate JSON.
- Platform detection happens client-side via `navigator.userAgent` in
  `src/lib/os.ts` — always wrap in `useEffect` to avoid hydration mismatch.
- `parseDownloads()` in `src/lib/downloads.ts` converts raw JSON sections to
  `AppData[]` with slug, platforms, and download options.

## Testing Conventions

### Unit tests (Jest)

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert.
3. Keep tests isolated — each test manages its own state.
4. Cover boundary conditions (empty queries, unknown platforms) alongside happy
   paths.
5. Maintain ≥80% coverage on statements, branches, functions, and lines —
   enforced by `coverageThreshold` in `jest.config.ts`.

### E2E tests (Playwright)

1. Use `getByRole` / `getByTestId` over raw CSS/XPath.
2. Assert on user-visible state (`toBeVisible`, `toHaveURL`).
3. Cover the home → detail → back flow, search, filter tabs, and 404 route
   (`e2e/store.spec.ts`).

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/store`
2. `pnpm format --filter=@hieudoanm.github.io/store`
3. `pnpm test --filter=@hieudoanm.github.io/store`
4. `pnpm test:e2e --filter=@hieudoanm.github.io/store`
5. `pnpm build --filter=@hieudoanm.github.io/store`
