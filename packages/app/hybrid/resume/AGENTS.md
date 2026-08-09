# AGENTS

## Project

Free Resume Builder — a **fully offline** resume editor with live preview, PDF
export, and 32 templates. Ships as a static web app (PWA) and a Tauri desktop
app. No backend, no accounts, no network calls.

## Stack

| Group           | Choice                                 |
| --------------- | -------------------------------------- |
| Framework       | Next.js 16 (App Router, static export) |
| UI              | React 19, Tailwind CSS 4 + DaisyUI 5   |
| Language        | TypeScript (strict)                    |
| Unit tests      | Jest 30 + Testing Library (jsdom)      |
| E2E tests       | Playwright 1.62 (Chromium)             |
| Desktop shell   | Tauri 2 (Rust)                         |
| Package manager | pnpm (workspace at repo root)          |

## Commands

```sh
pnpm dev          # dev server (port 3000)
pnpm build        # static export to out/
pnpm test         # jest (90% coverage gate)
pnpm test:e2e     # playwright e2e (starts dev server)
pnpm lint         # eslint . --fix
pnpm format       # prettier --write .
pnpm tsc          # pnpm exec tsc --noEmit
pnpm tauri dev    # desktop shell
pnpm tauri build  # desktop bundle
```

Run `pnpm exec jest <path> --coverage=false` for fast single-file test runs.

## Hard constraints

- **Offline-first.** Never add code that fetches from the network, loads remote
  fonts/images, or depends on a server. Static export (`output: 'export'`) +
  service worker (`public/sw.js`) only.
- **No external data dependencies** — no ORM, no fetch, no API routes. All state
  lives in `localStorage` via `useLocalStorage`.
- **Keep it a simple app.** Favor small, focused utilities over new libraries;
  hand-rolled logic is preferred when it stays under ~30 lines.

## Architecture

```
src/
  app/            Next.js routes (/, /about/, /version/), root layout + metadata
  components/
    resume/
      data/       DataPanel — JSON/YAML import & export UI
      editor/     Accordion forms bound to ResumeData (Personal, Summary, ...)
      preview/    PreviewPanel (zoom/paper/print), ResumeSheet, TemplatePicker
      template/   Shared primitives (Section, BulletList, HeaderRow, ContactList)
      templates/  32 resume templates + registry (index.ts)
    templates/    About/Version/Error page templates
  data/           paper.ts (paper sizes), seed.ts (sample ResumeData)
  hooks/          useLocalStorage, useSWRegister
  styles/         globals.css, base.css, themes.css (daisyUI "paper" theme)
  types/          resume.ts — the single ResumeData model
  utils/          contact.ts, export.ts, io.ts, text.ts, id.ts
e2e/              Playwright specs
src-tauri/        Tauri shell (frontendDist = ../out)
```

## Data model

`ResumeData` is the single source of truth (`src/types/resume.ts`): `personal`,
`summary`, `experience`, `education`, `projects`, `skills`, `certifications`,
`languages`, `interests`. All array items are objects of plain strings with an
`id`. See `docs/data-model.md`.

Persistence keys: `resume.data`, `resume.template`, `resume.paper`.

## Templates

- Each template is a React component `({ data }: TemplateProps)` rendering with
  inline styles — **no Tailwind inside templates** (they must print correctly
  and be standalone-HTML-export friendly).
- Registered in `src/components/resume/templates/index.ts` (`id`, `name`,
  `description`, `component`). Ids are unique slugs; picker + e2e tests assert
  the total count (32).
- Build on shared primitives in `template/primitives.tsx`. A template must
  render the full name even when all sections are empty (covered by the "renders
  empty sections gracefully" test).
- See `docs/templates.md` for the add-a-template checklist.

## Conventions

Follow the repository root `AGENTS.md`: explicit types, flat structure, small
focused files (≤ 200 lines), functions ≤ 30 lines, pure functions, arrow
functions + `const`, no comments unless asked, explicit error handling.

- Import order: third-party first, then `@`-aliased/internal, then relative.
- TypeScript strict. Prefer `interface` for object shapes.
- Tests: name tests as specifications, use `it.each` for data-driven cases, keep
  them isolated. Coverage gate is 90% globally (`jest.config.ts`).
- e2e: use `getByRole`/`getByLabel` locators; template-name assertions must be
  anchored (e.g. `/^Classic/`) to avoid substring collisions with other template
  descriptions.
- No new npm dependencies without a strong reason — check the workspace lockfile
  first.

## Common tasks

- **Add a template** → copy an existing `*Template.tsx`, restyle via inline
  styles/primitives, register in `index.ts`, run template + page + e2e tests
  (count assertions).
- **Add a form field** → extend the type in `types/resume.ts`, the matching form
  component, and the template section that renders it.
- **Import/export** → `utils/io.ts` owns serialization, parsing, and validation;
  `DataPanel` is the only UI entry point.

## Documentation

See `docs/` for architecture, data model, template guide, and development
workflow.
