# Contributing

Thanks for contributing to **Tax**, a hybrid app that ships as a web app
(browser), desktop app (Tauri), and mobile app (Tauri Mobile).

## Getting Started

1. **Prerequisites**: Node.js 26.7.0 (see `.nvmrc`) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/tax
   ```

## Development Commands

| Task       | Command                                           |
| ---------- | ------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/tax`      |
| Build      | `pnpm build --filter=@hieudoanm.github.io/tax`    |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/tax`     |
| Format     | `pnpm format --filter=@hieudoanm.github.io/tax`   |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/tax`     |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/tax` |

Run `lint`, `format`, `test`, and `test:e2e` before pushing — CI enforces all of
them.

## Coding Conventions

### General

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses.
3. **Self-documenting identifiers** — `getUserById(id)` needs no comment.
4. **DRY** — when a pattern repeats, centralize it.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
6. **Explicit error handling** — check errors and fail loudly.
7. **Test names as documentation** — `test("returns 404 when user not found")`.
8. **Consistent imports** — group by origin: stdlib, third-party, internal.
9. **Pure functions with explicit dependencies** — accept inputs, return
   outputs.
10. **Conventional layouts** — `src/`, `components/`, `lib/`, `e2e/`.

### TypeScript

1. Arrow functions for all function declarations and component exports.
2. `const` over `let` when a value is never reassigned.
3. `strict: true` in `tsconfig.json`.
4. Prefer `interface` over `type` for object shapes.
5. Use `as const` for literal types.

### React

1. Prefer function components with hooks; never nest hooks inside conditionals.
2. Extract custom hooks (`useX`) for reusable logic.
3. Use `useReducer` for complex state.
4. Use a stable `key` prop in lists.
5. Memoise sparingly.

### Next.js

1. Use the App Router (`app/`).
2. Mark files `"use client"` only when they need interactivity or hooks.
3. Use `loading.tsx`, `error.tsx`, `not-found.tsx` file conventions.
4. Use `next/link` for client-side navigation.

### Styling

1. Use Tailwind utility classes.
2. Use DaisyUI component classes.
3. Dark theme is the default.
4. `prettier-plugin-tailwindcss` sorts classes.
5. Use `react-icons` Feather (`Fi`) set for icons.

### Tax Logic

1. Pure logic goes in `lib/tax/` — never mix UI and business logic.
2. All tax constants (brackets, rates, deductions) in `lib/tax/constants.ts`.
3. Calculator functions are pure — accept inputs, return outputs.
4. Vietnamese tax labels and UI text in Vietnamese.

## Testing Conventions

### Unit tests (Jest)

Break tests into small per-file suites — one `*.test.ts` / `*.test.tsx` per unit (component, page, hook, util, provider), colocated in a `__tests__/` directory; never merge multiple units into one file. App pages are tested under `src/app/__tests__/` and route-group pages (`(app)`, `(info)`) colocate `__tests__/page.test.tsx` in the same folder.

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert.
3. Keep tests isolated.
4. Cover boundary conditions and error cases.
5. Maintain ≥80% coverage.

### E2E tests (Playwright)

1. Use `locator`/`getByRole`/`getByText` over raw CSS/XPath.
2. Mock network via `page.route(...)`.
3. Use `test.beforeEach` for shared setup.
4. Assert on user-visible state.
5. Cover every page-level flow.

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/tax`
2. `pnpm format --filter=@hieudoanm.github.io/tax`
3. `pnpm test --filter=@hieudoanm.github.io/tax`
4. `pnpm test:e2e --filter=@hieudoanm.github.io/tax`
5. `pnpm build --filter=@hieudoanm.github.io/tax`
