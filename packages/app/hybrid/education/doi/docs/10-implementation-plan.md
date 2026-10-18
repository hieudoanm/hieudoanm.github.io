# Roadmap

> Phased roadmap for `education/doi`, an interactive citation-graph web app and
> Tauri desktop app. Pending items are tracked; shipped items stay checked here.

## Phase 1 — Scaffold Next.js app (shipped)

- [x] Adopt sibling app structure: `package.json` (`@hieudoanm.github.io/doi`),
      `tsconfig.json`, `next.config.ts` (static export + sql.js node-builtin
      aliases), `postcss`, jest, playwright.
- [x] Bundle `sql-wasm.wasm` under `public/wasm/` and a db asset under
      `public/data/`.
- [x] Base layout, globals/styles (Tailwind 4 + daisyUI light/dark themes).
- [x] App icons + PWA metadata (`manifest.json`, `sitemap.xml`, `robots.txt`,
      `sw.js`).

## Phase 2 — Data layer (shipped)

- [x] `src/lib/sqlite.ts` — WASM init + `openDb` + query helper.
- [x] `src/lib/queries.ts` — overview, year distribution, top cited/citing, top
      authors, search, graph node/edge extraction (filters non-4-digit years).
- [x] `src/providers/DoiProvider.tsx` — db load + reactive query/search state.

## Phase 3 — Views (shipped)

- [x] `/overview` — stat cards + year chart + top lists.
- [x] `/graph` — interactive d3-force citation graph with metadata panel.
- [x] `/search` — unified search across title/author/abstract/doi.
- [x] `/about`, `/downloads`, `/version` info routes + header links.

## Phase 4 — Polish & platform

- [x] Node-cap / degree filter for graph performance on the full 12.5k set.
- [x] JATS abstract sanitizer.
- [x] Unit tests (coverage >= 80%) and Playwright e2e.
- [x] Tauri desktop shell (`src-tauri/`): window, updater, icons, CI workflow —
      bundling via `pnpm tauri build`.
