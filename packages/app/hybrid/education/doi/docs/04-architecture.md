# Architecture

## Tech Stack

| Layer       | Choice                                                        |
| ----------- | ------------------------------------------------------------- |
| Framework   | Next.js 16 App Router (static export), React 19               |
| Language    | TypeScript strict                                             |
| Styling     | Tailwind CSS 4 + DaisyUI 5 custom themes                      |
| Data engine | sql.js 1.x (SQLite in WASM), raw `doi.db` from `public/`      |
| Graph       | d3-force (force-directed citation network)                    |
| State       | `DoiProvider` React context (`useDoi`) — no global store      |
| Metadata    | Prisma `schema.prisma` (source of truth; not used at runtime) |
| Testing     | Jest (+ React Testing Library), Playwright                    |

## Directory Structure

```txt
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

## Routing

App Router with static export (`output: 'export'`):

- `/` — landing hub with tool cards
- `/overview` — citation statistics (counts, year distribution, top lists)
- `/graph` — interactive force-directed citation graph
- `/search` — search works by title/author/abstract/doi

All routes prerender as static content. Interactivity is client-side via
`'use client'` components.

## Data Flow

1. `initSqlJs({ locateFile })` loads the WASM engine (singleton).
2. `openDoiDb('/data/doi.db')` builds an in-memory `SQL.Database` from the
   asset.
3. `useDoi()` (from `src/providers/DoiProvider.tsx`) runs typed queries through
   `src/lib/queries.ts` and exposes reactive results + search filter.
4. Pages render from those results; the graph page feeds node/edge arrays into
   d3-force.

Data is queried in the browser at runtime; nothing requires a server after the
static export is built.

## Database Engine (sql.js)

Follows the `developer-tools/database` pattern:

- WASM served from `public/wasm/sql-wasm.wasm`.
- `next.config.ts` aliases `fs`/`path`/`crypto` →
  `src/lib/stubs/node-builtins.ts` so sql.js's Node shim doesn't break the
  browser bundle.
- Queries run via `db.exec(sql)` against the `works` and `"references"` tables.

## Graph Rendering

- Nodes = works sized by in-degree; edges = `references` links (self-links
  excluded).
- `d3-force` runs a force simulation (link + charge + center) inside a React
  `useEffect`; pan/zoom via `d3-zoom` (or the underlying d3 zoom if pulled in).
- Click/hover opens a metadata panel (DOI, title, year, author, abstract).
- Search input filters which nodes are rendered, reusing the same LIKE semantics
  as `analyse.py -q`.

## Theming

Two custom DaisyUI v5 themes (light default + dark), matching sibling apps:
`layout.tsx` sets `<html data-theme="doi-light">` and `Header` toggles it
client-side, persisting the choice in `localStorage['doi-theme']`.

## Metadata / Prisma

`prisma/schema.prisma` remains the canonical definition of `Work` and
`Reference` (mapped to `works` / `"references"`). The app does **not** use a
generated Prisma client at runtime — it queries the same tables with sql.js. The
`dbml` and `jsonSchema` generators remain available for schema exports.
