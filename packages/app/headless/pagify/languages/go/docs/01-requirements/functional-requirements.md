# pagify — Functional Requirements

Each requirement is testable and maps to acceptance criteria in [`09-testing-strategy.md`](../09-testing-strategy.md).

## FR-001 — Build produces static output

`pagify build <dir>` reads every Markdown file in `<dir>`, renders HTML, copies assets, writes a search index, and emits `dist/`. The output is static HTML, CSS, JS, and assets deployable to any static host.

## FR-002 — Zero-config default

A missing `pagify.yaml` is not an error. All configuration fields are optional with sensible defaults derived from the file structure.

## FR-003 — Recursive discovery

`internal/site` walks the content directory once, collecting Markdown files and copying non-Markdown files as assets.

## FR-004 — Asset copying

Non-Markdown files (images, CSS, JS) are copied to the output preserving relative paths.

## FR-005 — Skipped entries

Hidden files, `.bak`/`.backup` siblings, `_partials` directories, and `pagify.yaml` itself are skipped during discovery.

## FR-006 — Frontmatter

YAML frontmatter is split from the body. Supported metadata: `title`, `description`, `order`, `draft`, `navigation label`, `layout`.

## FR-007 — URL and output-path rules

Each file resolves to a URL (`guide/install.md` → `/guide/install/`) and an output path (`guide/install/index.html`). `index.md` and `README.md` are landing pages of their directory.

## FR-008 — Link resolution

`.md` links become clean URLs. Root-relative links resolve against the content root. All destinations pass through the base-path prefix.

## FR-009 — Navigation generation

`internal/nav` builds the sidebar from the file tree. A directory becomes a group; a directory with an `index.md` becomes a group that is also a link.

## FR-010 — Root landing page first

The root landing page is moved to the front of navigation because it is the site's front door, not wherever its file name sorts.

## FR-011 — Semantic HTML

Generated HTML uses `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` with no unnecessary wrappers.

## FR-012 — GFM extensions

Tables, task lists, footnotes, syntax-highlighted code, automatic heading IDs, and GitHub-style callouts are supported.

## FR-013 — Heading outline

Headings are flattened into plain text for navigation and used for the on-page table of contents with anchor links.

## FR-014 — Page title

A document's leading level-1 heading is lifted out of the body as the page title, so header and body never print it twice.

## FR-015 — Search index

`internal/build/search` reduces each page's rendered HTML to plain text and writes `assets/search-index.json`. Script, style, and `data-no-search` content is skipped.

## FR-016 — Clean rebuild

The output directory is replaced first, so a deleted page cannot survive a rebuild.

## FR-017 — Generated landing page

When content has no index page, a landing page is generated from navigation so the root URL still resolves.

## FR-018 — Preview

`preview` rebuilds on every request instead of watching the filesystem. It honours `basePath` and serves static files only.

## FR-019 — JSON API

`serve` runs the JSON API: `POST /api/v1/build` renders one page in memory; `/api/v1/health`, `/api/v1/openapi.json`, and `/api/v1/docs` describe it.

## FR-020 — Confinement

Every content path a request names is resolved through `internal/workspace`, so the API cannot read outside its `--root`.

## FR-021 — Theme toggle

Light/dark theme with toggle, persisted in the client.

## FR-022 — Responsive layout

Desktop uses sidebar + content. Mobile collapses into a simpler layout with accessible navigation. No fixed viewport assumption.

## FR-023 — Progressive enhancement

JavaScript enhances code-copy buttons, theme toggle, mobile drawer, and search. Each is a no-op when its file fails to load.

## FR-024 — Init

`pagify init` creates a minimal project structure (content directory, theme, config defaults). Do not make initialization unnecessarily complex.
