# Office

A privacy-first, offline-first office suite — Calendar, CSV, Markdown, and Tasks
sub-apps, each with a full and a lite variant. Next.js 16 (App Router,
`output: 'export'`) + React 19 + Tailwind CSS 4 (DaisyUI 5) desktop/web app
packaged with Tauri 2. Persists data client-side via IndexedDB (`idb`) and
localStorage.

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, directory structure, routing, state management |
| `docs/ROADMAP.md`      | Phased feature roadmap with progress tracking              |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions        |
| `docs/PACKAGING.md`    | Packaging checklist per platform                           |
| `docs/DOWNLOADS.md`    | Download links, feature overview, and Google/Microsoft comparison |

## Key Conventions

- Arrow functions for all function declarations and component exports; `FC` type
- `@/*` path aliases
- DaisyUI component classes (`btn`, `card`, `badge`, `table`, `select`)
- Themes via DaisyUI plugin: `office-light` (default) and `office-dark`
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design per feature: `src/components/<feature>/{atoms,molecules,organisms}`
- Feature logic in `src/lib/<feature>/`, data in `src/data/<feature>/`
- Tests colocated in `__tests__/` — one `*.test.ts(x)` per unit; route-group
  pages use `colocated/page.test.tsx`, root pages under `src/app/__tests__/`
- Static export — no API routes, no server actions
- Use `--filter @hieudoanm.github.io/office` from the repo root for all commands

## Tasks Sub-app Specifics

- Persists to IndexedDB database **`office-db`** (kept separate from the old
  projects app's `projects-db`)
- Providers composed in `src/components/tasks/Providers.tsx`:
  `DataProvider > AuthProvider > ToastProvider` (path aliases
  `@/lib/tasks/*` and `@/data/tasks/*`)
- Full page (`(app)/tasks/`) renders `ProjectSidebar` + `ViewSwitcher` +
  `BoardBody`. `BoardBody` switches among `KanbanBoard`, `ListView`,
  `CalendarView`, `TimelineView` — there is NO tasks view on the full page
  (tasks view is lite-only)
- `TasksView` (lite + TasksView) has three states: loading spinner,
  signed-out (`TaskSignInState`), empty (`TaskEmptyState`)
- `AuthProvider` falls back to `members[0]` when the session userId is missing
  — fixes blank screens
- `PiTasks` does NOT exist in `react-icons/pi` — use `PiListChecks`

## Commands

```bash
# From the office package directory:
pnpm dev            # Next.js dev server (Turbopack)
pnpm build          # Static export to out/
pnpm typecheck      # tsc --noEmit
pnpm test           # Jest unit tests (--passWithNoTests)
pnpm test:e2e       # Playwright e2e tests
pnpm lint           # ESLint with fixes
pnpm format         # Prettier
pnpm tauri dev|build # Desktop app via Tauri CLI

# From the repo root:
pnpm --filter @hieudoanm.github.io/office typecheck|lint|build
```

## Structure

```txt
src/app/
  (app)/              # Full sub-apps: calendar/, csv/, md/, tasks/
  (app)/(lite)/lite/  # Lite sub-apps + lite hub
  (auth)/             # sign-in, sign-up, profile, password reset
  (info)/             # about, downloads, version
  page.tsx            # Office suite hub
  layout.tsx          # Root layout (Header + main)
src/components/
  calendar/ csv/ md/ tasks/   # Atomic design per feature
  shared/                     # Header, templates
src/lib/                      # Feature libs (calendar, csv, md, tasks)
src/data/                     # Feature data (calendar, md, tasks)
src/content/                  # about.ts, download.ts, version.ts
src/notes/                    # Personal notes consumed by the md app
e2e/                          # Playwright specs
```

## Routes

- `/` — Office hub (Calendar, CSV, Markdown, Tasks cards)
- `/calendar/`, `/csv/`, `/md/`, `/tasks/` — full sub-apps
- `/lite/` — lite hub; `/lite/calendar/`, `/lite/csv/`, `/lite/md/`, `/lite/tasks/`
- `/about`, `/downloads`, `/version` — info pages
- `/sign-in`, `/sign-up`, `/profile`, `/forget-password`, `/reset-password`