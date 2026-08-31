## Testing Conventions

- Break tests into small per-file suites: one `*.test.ts` / `*.test.tsx` per
  unit (component, page, hook, util, provider), colocated in a `__tests__/`
  directory — never merge multiple units into one file.
- App pages are tested under `src/app/__tests__/` with a `*.test.tsx` matching
  each page; pages in route groups (`(app)`, `(info)`) colocate
  `__tests__/page.test.tsx` in the same folder.
- Name tests as behaviour specs; test behaviour, not implementation, with
  Arrange-Act-Assert and isolated cases.
- Cover boundary conditions and error cases alongside happy paths.
- Keep global coverage >= 80% — enforced by `jest.config.ts`.
