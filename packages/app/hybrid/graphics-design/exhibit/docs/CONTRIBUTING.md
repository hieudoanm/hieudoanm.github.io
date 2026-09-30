# Contributing

Thanks for contributing to **Exibit**, a hybrid app that ships as a web app
(browser), desktop app (Tauri), and mobile app (Tauri Mobile). It showcases
three demo applications — POS, Menu, and Chat — behind one showcase shell.

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/exhibit
   ```

## Development Commands

| Task       | Command                                               |
| ---------- | ----------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/exhibit`      |
| Build      | `pnpm build --filter=@hieudoanm.github.io/exhibit`    |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/exhibit`     |
| Format     | `pnpm format --filter=@hieudoanm.github.io/exhibit`   |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/exhibit`     |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/exhibit` |

Run `lint`, `format`, `test`, and `test:e2e` before pushing — CI enforces all of
them.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them for
every change.

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
   outputs; no global/singleton state.
10. **Conventional layouts** — `src/`, `components/`, `lib/`, `e2e/`.

### TypeScript

1. Use arrow functions for all function declarations and component exports.
2. Use `const` over `let` when a value is never reassigned.
3. Use `strict: true` in `tsconfig.json`.
4. Prefer `interface` over `type` for object shapes.
5. Use `as const` for literal types.
6. Use `satisfies` over raw casts.
7. Use `never` in exhaustive checks.
8. Use `Readonly<T>` and `Partial<T>` to mark immutability.
9. Explicitly type return values on exported functions.

### React

1. Prefer function components with hooks; never nest hooks inside conditionals
   or loops.
2. Extract custom hooks (`useX`) for reusable logic.
3. Use `useReducer` for complex state.
4. Use a stable `key` prop in lists.
5. Memoise sparingly — profile first.

### Next.js

1. Use the App Router (`app/`) and prefer Server Components by default.
2. Mark files `"use client"` only when they need interactivity or hooks.
3. Use `loading.tsx`, `error.tsx`, `not-found.tsx` file conventions.
4. Use `next/link` for client-side navigation.

### Styling

1. Use Tailwind utility classes; compose, don't write custom CSS.
2. Use DaisyUI component classes (`btn`, `card`, `badge`, `input`).
3. Themes are `exibit-light` (default) and `exibit-dark`, applied via
   `data-theme` on `<html>`. Persist the choice in `localStorage` under
   `exibit-theme` so every app's toggle stays in sync.
4. `prettier-plugin-tailwindcss` sorts classes.
5. Use `react-icons` Feather (`Fi`) set for icons.

### Path aliases

`@/*` is the **only** alias, mapping to `./src/*`. There is no `baseUrl` and no
per-app alias. Prefer a real directory name over a new alias — each one has to
be duplicated into `tsconfig.json` and `jest.config.ts`.

### Project layout

1. Group UI by app, then by atomic tier:
   `components/<app>/{atoms,molecules,organisms,templates}`.
2. Each tier is flat, has an `index.ts` barrel, and keeps its tests in
   `__tests__/`. Import your own tier directly (`@/components/pos/molecules`),
   not through the app root.
3. Push logic down into `lib/` as pure functions. Route pages stay thin: compose
   a template and keep route state in a colocated `use*` hook.
4. Share app-agnostic UI through `components/shared/templates`, never by
   importing across apps (`pos` must not import from `chat`).

## Testing Conventions

### Unit tests (Jest)

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert.
3. Keep tests isolated — each test manages its own state.
4. Cover boundary conditions and error cases alongside happy paths.
5. Break tests into small per-file suites — one `*.test.ts` / `*.test.tsx` per
   unit (component, page, hook, util, provider) colocated in a `__tests__/`
   directory; never merge multiple units into one file. Tests live next to what
   they cover: `<tier>/__tests__/` inside each atomic tier,
   `lib/<app>/__tests__/` for pure logic, and `__tests__/page.test.tsx` inside
   each route group (`(app)`, `(auth)`, `(info)`). Root-level `app/` files —
   `layout.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`,
   `default.tsx`, `loading.tsx`, `template.tsx`, `forbidden.tsx`,
   `unauthorized.tsx`, and `robots.ts` — are tested together from
   `src/__tests__/` using `@/app/…` imports; do not add a second
   `src/app/__tests__/`. Use `it.each` for data-driven tests.
6. Maintain the coverage floor enforced by `coverageThreshold` in
   `jest.config.ts` — 50% statements, 45% branches, 40% functions, 50% lines.

### E2E tests (Playwright)

1. Use `locator`/`getByRole`/`getByText` over raw CSS/XPath.
2. Mock network via `page.route(...)`.
3. Use `test.beforeEach` for shared setup.
4. Assert on user-visible state (`toBeVisible`, `toHaveText`).

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/exhibit`
2. `pnpm format --filter=@hieudoanm.github.io/exhibit`
3. `pnpm test --filter=@hieudoanm.github.io/exhibit`
4. `pnpm test:e2e --filter=@hieudoanm.github.io/exhibit`
5. `pnpm build --filter=@hieudoanm.github.io/exhibit`
