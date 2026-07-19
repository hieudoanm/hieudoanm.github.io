# Resume — Free Resume Builder

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, directory structure, routing, state management |
| `docs/ROADMAP.md`      | Phased feature roadmap with progress tracking              |
| `docs/DATA-MODEL.md`   | `ResumeData` model, persistence keys, and shapes           |
| `docs/DEVELOPMENT.md`  | Setup and development workflow                             |
| `docs/TEMPLATES.md`    | Add-a-template checklist and inline-style rules            |
| `docs/README.md`       | Docs index and overview                                    |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions        |
| `docs/DOWNLOADS.md`    | Download links per platform                                |

## Key Conventions

- Offline-first — no network calls, no server, no remote fonts/assets; static
  export + service worker only
- All state persists to `localStorage` via `useLocalStorage` — no external data
  dependencies
- Arrow functions + `const`; explicit types; prefer `interface` for object
  shapes
- Import order: third-party first, then `@`-aliased/internal, then relative
- Tests: name as specifications, `it.each` for data-driven cases, isolated; 90%
  global coverage gate (`jest.config.ts`)
- e2e: `getByRole`/`getByLabel` locators; template-name assertions anchored to
  avoid substring collisions
- No new npm dependencies without a strong reason
