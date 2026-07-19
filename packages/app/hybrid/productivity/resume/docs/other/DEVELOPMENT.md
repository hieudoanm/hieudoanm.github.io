# Development

## Setup

```sh
pnpm install     # from the repository root (pnpm workspace)
pnpm dev         # http://localhost:3000
```

Node 26 is expected (`packageManager: pnpm@11.20.0`, `engines.node: 26.7.0`).

## Scripts

| Script        | Command                      | Purpose                                        |
| ------------- | ---------------------------- | ---------------------------------------------- |
| `dev`         | `next dev --turbopack`       | Dev server (predev clears `.next` + port 3000) |
| `build`       | `next build`                 | Static export to `out/` (prebuild clears it)   |
| `start`       | `next start`                 | Not usable with `output: 'export'`             |
| `lint`        | `eslint . --fix`             | Auto-fix lint issues                           |
| `format`      | `prettier --cache --write .` | Format everything                              |
| `tsc`         | `pnpm exec tsc --noEmit`     | Type-check                                     |
| `test`        | `jest --passWithNoTests`     | Unit tests                                     |
| `test:e2e`    | `playwright test`            | E2E tests (boots dev server)                   |
| `test:e2e:ui` | `playwright test --ui`       | Playwright UI mode                             |
| `analyze`     | `next experimental-analyze`  | Bundle analysis                                |
| `tauri dev`   | `tauri dev`                  | Desktop shell (dev)                            |
| `tauri build` | `tauri build`                | Desktop bundle (runs `next build` first)       |

## Serving the static build

With `output: 'export'` the entire app is static HTML/CSS/JS in `out/`. It can
be served by any static server:

```sh
npx serve out
# or
python3 -m http.server 8080 -d out
```

The PWA service worker (`public/sw.js`) is copied into `out/` and registered in
production builds.

## Unit tests (Jest)

- Config: `jest.config.ts` (Next.js preset, jsdom, `collectCoverage: true`).
- `e2e/` is excluded via `testPathIgnorePatterns`.
- Global coverage threshold is **90%** across
  statements/branches/functions/lines; running the full suite enforces it.
- Fast iteration:

```sh
pnpm exec jest src/utils/io.test.ts --coverage=false
pnpm exec jest src/components/resume --coverage=false
```

- Current suite: 20 suites / 149 tests passing.
- Setup (`jest.setup.ts`) loads `@testing-library/jest-dom`.

## E2E tests (Playwright)

- Config: `playwright.config.ts` — `testDir ./e2e`, Chromium only,
  `baseURL http://localhost:3000`, `webServer: pnpm dev`.
- Specs: `about`, `editor`, `home`, `navigation`, `responsive`, `version` (16
  tests).
- Locator rules: prefer `getByRole` / `getByLabel`; anchor template-name
  assertions (`/^Classic/`) so they never match a substring of a different
  template's description.

## Quality gates

Before considering work done, all of these must pass:

```sh
pnpm exec tsc --noEmit
pnpm lint         # eslint . --fix
pnpm format       # prettier --cache --write .
pnpm test         # jest, incl. 90% coverage gate
pnpm test:e2e     # playwright
pnpm build        # static export must succeed
```

## Conventions

Follow `AGENTS.md` (this package) and the repository-root `AGENTS.md`:
TypeScript strict, interfaces for object shapes, arrow functions with `const`,
pure functions ≤ 30 lines, files ≤ 200 lines, grouped imports, no comments
unless asked, explicit error handling.

Do not add new dependencies without a strong reason — the offline-first,
keep-it-simple constraint means hand-rolled helpers are preferred over small
libraries.

## Desktop (Tauri)

- `src-tauri/` is a minimal shell: `main.rs` + `lib.rs` (~20 lines), no custom
  commands.
- `tauri.conf.json`: `frontendDist: ../out`, `devUrl: http://localhost:3000`,
  product `resume`, identifier `io.github.hieudoanm.resume`.
- `pnpm tauri dev` runs the app against the dev server; `pnpm tauri build`
  compiles the static export into a native bundle (dmg, AppImage, msi, etc. —
  see `bundle.targets`).
