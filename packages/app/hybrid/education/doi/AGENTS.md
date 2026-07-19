# AGENTS

Operational guidance for the `education/doi` package: converts a Crossref
citation network (stored in SQLite) into an interactive Next.js visualization
app.

## Mission

Take the crawled Crossref citation network (`database/doi.db`) and present it
through a standalone Next.js web app with three views:

- **Overview** — citation statistics (counts, year distribution, top lists).
- **Graph** — an interactive force-directed citation graph.
- **Search** — search works by title, author, abstract, or DOI.

Everything runs client-side from a static export; no server at runtime.

## Confirmed Decisions

1. **Data serving** — raw `doi.db` bundled as a static asset under `public/`,
   loaded in-browser via **sql.js (WASM)**. Mirrors the existing
   `developer-tools/database` app.
2. **Graph library** — **d3-force** (`d3-force` + `@types/d3-force`).
3. **App location** — `education/doi` itself becomes the standalone Next.js app
   (matching siblings `chemistry`, `history`, `economics`, ...).
4. **Rendering** — live interactive graph from the db, not the static
   `database/images/graph.svg` produced by `visualise.py`.

## Context (Verified)

| Item                      | Value                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `database/doi.db`         | Valid SQLite 3.x, ~4.87 MB, **12,500 works / 19,198 references**                                                                  |
| Sibling apps              | Standalone Next.js 16.3.3, `output: 'export'`, `'use client'` pages, Tailwind 4 + daisyUI, `@/*` → `./src/*`, `BASE_PATH` env     |
| In-browser sqlite pattern | `developer-tools/database`: sql.js loads `.db` from `public/`; `next.config.ts` aliases `fs`/`path`/`crypto` → Node-builtin stubs |
| DOI package today         | Prisma generators (`dbml`, `jsonSchema`) + Python pipeline. **No** `src/`, **no** Next.js.                                        |

## Data Model (from `prisma/schema.prisma`)

- `works` — `doi` (PK), `title`, `author`, `year`, `abstract`, `type`.
- `"references"` — `workId` → `works.doi`, `referencedId` → `works.doi`;
  self-references excluded from visual degree counts and graph edges.

Derived metrics:

| Metric                  | Definition                              |
| ----------------------- | --------------------------------------- |
| total/titled/stub works | `title = ''` marks a stub               |
| reference edges         | count of `"references"` rows            |
| distinct authors        | count distinct `author` (non-empty)     |
| year span               | MIN/MAX of non-empty `year`             |
| in-degree               | number of works citing a given work     |
| out-degree              | number of references a given work cites |

## Views

### Overview (`/overview`)

- Stat cards: total/titled/stub works, edges, distinct authors, year span.
- Year-distribution bar chart (hand-rolled SVG, no chart dep).
- Top-ranked lists: most cited (in-degree), most citing (out-degree), top
  authors — each filterable by search.

### Graph (`/graph`)

- Force-directed citation network (d3-force).
- Node radius ← in-degree; color/tooltip reveals DOI + title.
- Pan/zoom/drag; click a node → side panel with metadata + a link to search that
  DOI.
- Degree filter + node cap to keep interaction smooth on the full 12.5k set.

### Search (`/search`)

- Single box, `LIKE` across `title`/`author`/`abstract`/`doi` (case-insensitive
  substring, same as `analyse.py -q`).
- Results as a table/cards with metadata and a "view in graph" action.

## Search Semantics

Match a work if any field contains the query as a substring (`LIKE '%query%'`).
The matched DOI set cascades into every derived stat and the graph, so
Overview/Graph reflect the same filter as Search — replicating the
unified-filter behaviour implemented in the Python suite.

## Error Handling / Edge Cases

- WASM/db fail to load → friendly error state with a retry, not a blank page.
- Zero search matches → "no results" message (no division by zero).
- Stub works (`title = ''`) → labelled "untitled" and excluded from top-listings
  and the graph (by design, matching `visualise.py`), but still countable in the
  overview.
- `abstract` may contain JATS markup (`<jats:p>…`); sanitize tags for display
  while keeping the raw value in the db.

## Performance

- Load the mono `doi.db` once (in-memory sql.js) and cache the prepared result
  sets for the session.
- Cap graph nodes (default ~ few hundred, by in-degree) with an "all nodes" /
  "more nodes" toggle.
- Debounce search input; run LIKE queries in the existing in-memory db.

## Architecture

### Directory Structure

```
src/
├── app/            # Routes: /, /overview, /graph, /search
├── components/
│   ├── atoms/      # StatCard
│   ├── molecules/  # YearChart, CitationGraph, RankingList, LoadingState, ErrorState
│   ├── organisms/  # Header
│   └── templates/  # HomeTemplate
├── providers/      # DoiProvider (db load + query/search state)
├── lib/            # sqlite.ts, queries.ts, stubs/ (node-builtins)
└── styles/         # globals.css, base.css, themes.css

public/
├── data/doi.db     # sqlite asset loaded by the app
└── wasm/sql-wasm.wasm
```

### Data Flow

1. `initSqlJs({ locateFile })` loads the WASM engine (singleton).
2. `openDoiDb('/data/doi.db')` builds an in-memory `SQL.Database` from the
   asset.
3. `useDoi()` (from `src/providers/DoiProvider.tsx`) runs typed queries through
   `src/lib/queries.ts` and exposes reactive results + a shared search filter
   (`query`).
4. Pages render from those results; the graph page feeds node/edge arrays into
   d3-force.

## Build Steps

1. Scaffold Next.js app shell (package.json, tsconfig, next.config with sql.js
   node-builtin aliases, postcss, jest, playwright, styles/layout).
2. Add static assets: `public/wasm/sql-wasm.wasm`, `public/data/doi.db`, plus a
   Node export script to copy the db in.
3. Data layer: `src/lib/sqlite.ts`, `src/lib/queries.ts`,
   `src/lib/stubs/node-builtins.ts`, `src/providers/DoiProvider.tsx`.
4. Pages/components for `/`, `/overview`, `/graph`, `/search`.
5. Verify: `tsc --noEmit`, `eslint`, `next build`, `next dev`, `pnpm test`,
   `pnpm test:e2e`.

## Accessibility

- Buttons/link cards keyboard-navigable.
- Graph panel exposes node metadata via `aria` attributes; reachable via
  keyboard focus where feasible.
- Sufficient colour contrast in both light and dark themes.
