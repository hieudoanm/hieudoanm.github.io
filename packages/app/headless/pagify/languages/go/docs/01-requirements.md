# pagify — Functional and Non-Functional Requirements

See [`00-overview.md`](00-overview.md) for the product vision and [`AGENTS.md`](AGENTS.md) for contribution conventions.

## Functional Requirements (FR)

| ID    | Requirement                                                        | Priority |
| ----- | ------------------------------------------------------------------ | -------- |
| FR-001 | `pagify build <dir>` produces a static `dist/` directory.          | P0       |
| FR-002 | Zero-config: no `pagify.yaml` required for a basic build.          | P0       |
| FR-003 | Markdown files are discovered recursively from the content root.   | P0       |
| FR-004 | Non-Markdown files are copied as assets.                           | P0       |
| FR-005 | Hidden files, `.bak`/`.backup` siblings, `_partials`, and `pagify.yaml` are skipped. | P0 |
| FR-006 | Frontmatter is split from the body and exposed as page metadata.   | P0       |
| FR-007 | Each file resolves to a clean URL and output path (`index.md`/`README.md` are directory landing pages). | P0 |
| FR-008 | `.md` links become clean URLs; root-relative links resolve against the content root. | P0 |
| FR-009 | Navigation is built from the file tree; directories become groups. | P0       |
| FR-010 | The root landing page is moved to the front of navigation.         | P0       |
| FR-011 | Rendered HTML is semantic (`header`, `nav`, `main`, `article`, `footer`, `aside`). | P0 |
| FR-012 | GitHub-Flavored Markdown: tables, task lists, footnotes, callouts. | P0       |
| FR-013 | Heading outline is extracted for on-page table of contents.        | P0       |
| FR-014 | A leading level-1 heading is lifted as the page title.             | P0       |
| FR-015 | A `dist/` search index is written; script/style/`data-no-search` content is skipped. | P0 |
| FR-016 | The output directory is replaced on each build (deleted pages cannot survive). | P0 |
| FR-017 | When no index page exists, a landing page is generated from navigation. | P0 |
| FR-018 | `pagify preview <dir>` rebuilds on every request and honours `basePath`. | P0 |
| FR-019 | `pagify serve` exposes `/api/v1/build`, `/api/v1/health`, `/api/v1/openapi.json`, `/api/v1/docs`. | P0 |
| FR-020 | All file access in `serve` is confined to `--root`.                | P0       |
| FR-021 | Light/dark theme toggle with persistent preference.                | P0       |
| FR-022 | Responsive layout: sidebar + content on desktop, collapsed on mobile. | P0 |
| FR-023 | Code-block copy buttons work without JavaScript being required for reading. | P0 |
| FR-024 | `pagify init <dir>` creates a minimal pagify project.              | P1       |

## Non-Functional Requirements (NFR)

| ID    | Requirement                                                        | Priority |
| ----- | ------------------------------------------------------------------ | -------- |
| NFR-001 | The default theme is embedded in the binary via `go:embed`.        | P0       |
| NFR-002 | Generated sites contain no runtime server dependency.              | P0       |
| NFR-003 | Sites remain usable without JavaScript (reading, nav, links, code, images, tables). | P0 |
| NFR-004 | Build output is reproducible from Markdown + theme + configuration. | P0       |
| NFR-005 | Cross-platform builds: Linux, macOS, Windows (amd64/arm64).        | P0       |
| NFR-006 | Errors identify what failed, which file/path, and enough context to fix. | P0 |
| NFR-007 | No stack traces, credentials, or sensitive data in errors/logs.    | P0       |
| NFR-008 | WCAG 2.1 AA: semantic HTML, keyboard navigation, focus states, contrast, reduced motion. | P1 |
| NFR-009 | Performance: lightweight HTML + CSS + JS, no unnecessary external requests. | P1 |
| NFR-010 | Tests use table-driven Go tests and cover behaviour, not implementation. | P0 |

## Cross-references

- Overview: [`00-overview.md`](00-overview.md)
- Features: [`02-features.md`](02-features.md)
- Architecture: [`04-architecture.md`](04-architecture.md)
- Data model: [`05-data-model.md`](05-data-model.md)
- API: [`06-api-specification.md`](06-api-specification.md)
- Testing: [`09-testing-strategy.md`](09-testing-strategy.md)
