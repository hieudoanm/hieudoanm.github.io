# pagify — Product Specification

Product strategy · Functional requirements · Architecture · Data model · Delivery roadmap

> This document is the product-strategy source. The normative implementation set is [`00`–`12`](#normative-documents). Where this document and the numbered documents disagree on implementation detail, the numbered documents govern.

## Normative documents

| #   | Document                                                 | Governs                                                      |
| --- | -------------------------------------------------------- | ------------------------------------------------------------ |
| 00  | [`00-overview.md`](00-overview.md)                       | Project vision and scope                                     |
| 01  | [`01-requirements.md`](01-requirements.md)               | Functional/non-functional requirements                       |
| 02  | [`02-features.md`](02-features.md)                       | User-visible behaviour                                       |
| 03  | [`03-user-stories.md`](03-user-stories.md)               | User goals and acceptance scenarios                          |
| 04  | [`04-architecture.md`](04-architecture.md)               | Module boundaries, request lifecycle, build pipeline         |
| 05  | [`05-data-model.md`](05-data-model.md)                   | Content model, URL rules, schema                             |
| 06  | [`06-api-specification.md`](06-api-specification.md)     | REST contract, status codes, error envelope                  |
| 07  | [`07-ui-ux-design.md`](07-ui-ux-design.md)               | UI tokens, layout, states, accessibility                     |
| 08  | [`08-tech-stack.md`](08-tech-stack.md)                   | Allowed technologies and dependency policy                   |
| 09  | [`09-testing-strategy.md`](09-testing-strategy.md)       | Test layers, fixtures, acceptance criteria                   |
| 10  | [`10-implementation-plan.md`](10-implementation-plan.md) | Phased delivery plan                                         |
| 11  | [`11-deployment.md`](11-deployment.md)                   | CI, local development, distribution                          |
| 12  | [`12-operations.md`](12-operations.md)                   | Operations: backup, monitoring, security, rollback, recovery |

---

## 1. Product vision

**pagify** is a Go-based CLI that converts a directory of Markdown files into a beautiful, modern, static HTML website.

Write Markdown. Run one command. Get a beautiful website.

```bash
pagify build ./docs
```

pagify is inspired by tools such as Docsify, but the goal is to provide a more polished visual experience while keeping the architecture simple, fast, portable, and dependency-light. The generated site must be deployable to ordinary static hosting without requiring a backend — GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any normal web server.

## 2. Target users

| Persona            | Primary need                                  | Desired outcome                            |
| ------------------ | --------------------------------------------- | ------------------------------------------ |
| Author             | Turn Markdown into a website                  | Polished static site with zero configuration |
| Operator           | Preview, serve, and deploy locally            | Reproducible build and preview workflow    |

Primary persona: an author who wants to point `pagify` at a directory of Markdown and get a navigable static site with minimal or zero configuration.

## 3. Scope and priorities

- **P0** — Core platform: necessary for the first usable release.
- **P1** — Enhancement: important for a complete experience.

The first release should deliver one complete build-and-preview workflow rather than an incomplete version of every feature.

## 4. Functional requirements

See [`01-requirements.md`](01-requirements.md) for the complete requirements specification.

### P0 — Core platform

Markdown → static HTML build, zero-config file discovery and navigation, GitHub-Flavored Markdown (tables, task lists, footnotes, callouts), frontmatter for page metadata, client-side search, dark/light theme, responsive layout, local preview server with per-request rebuild, JSON API (`/api/v1/build`, `/api/v1/health`, `/api/v1/openapi.json`, `/api/v1/docs`).

### P1 — Enhancement

`pagify init` improvements, file watching, shell completions, custom CSS/JS injection, theme selection, image optimization, multi-language support, `pagify deploy`.

## 5. User journeys

### Journey A — Build a site from Markdown

Goal: turn a directory of Markdown into a static website.

1. Create a directory of Markdown files (`index.md`, `getting-started.md`, `guides/`).
2. Run `pagify build ./docs`.
3. Inspect `dist/` — static HTML, CSS, JS, and assets.
4. Deploy `dist/` to any static host.

### Journey B — Preview and iterate

Goal: preview changes locally during authoring.

1. Run `pagify preview ./docs`.
2. Open `localhost` and edit Markdown.
3. Each request rebuilds the site, so the preview always reflects the latest content.

### Journey C — Serve pages over HTTP

Goal: render individual pages through a JSON API.

1. Run `pagify serve`.
2. `POST /api/v1/build` renders one page in memory.
3. `/api/v1/health`, `/api/v1/openapi.json`, and `/api/v1/docs` describe the API.

## 6. Application structure

| Page            | Purpose                                            |
| --------------- | -------------------------------------------------- |
| Landing         | Site root, generated from navigation when no `index.md` |
| Content page    | Rendered Markdown with heading outline and callouts |
| Search          | Client-side full-text search over the search index |

## 7. Technical architecture

### 7.1 System design

pagify is a single Go CLI with a strict layer separation:

```text
Markdown files
      │
      ▼
internal/site     discover pages, read frontmatter, map URLs,
                  resolve links, build the navigation tree
      ▼
internal/markdown parse and render: HTML, heading outline,
                  extracted title, link resolution, callouts
      ▼
internal/build    project onto the theme view model, resolve URLs,
                  write pages, assets, search index
      ▼
internal/theme    embedded template, stylesheet and scripts
      │
      ▼
dist/             static HTML, CSS, JS and assets
```

Each package depends only on the one above it. Nothing below knows what a URL looks like; nothing above knows what a tag looks like.

### 7.2 Technology stack

| Layer            | Technology                   | Responsibility                            |
| ---------------- | ---------------------------- | ----------------------------------------- |
| CLI              | Go, Cobra                    | `build`, `preview`, `serve`, `init`       |
| Markdown         | Goldmark                     | GFM parsing and rendering                 |
| Templating       | `html/template`              | Semantic HTML generation                  |
| Assets           | `go:embed`                   | Theme embedded in the binary              |
| Search           | Client-side JavaScript       | In-browser search index filtering         |
| Containerisation | Docker                       | Optional containerised build              |
| CI/CD            | GitHub Actions               | Lint, vet, test, cross-platform builds    |
| Testing          | Go testing                   | Table-driven unit tests                   |

## 8. Current implementation status

See [`AGENTS.md`](AGENTS.md) for the implementation snapshot and contribution conventions.

## 9. Non-functional requirements

See [`01-requirements.md`](01-requirements.md) for the complete NFR specification.

### Key targets

- Build is fast enough to rebuild on every preview request.
- Generated site works without JavaScript (reading, navigation, links, code, images, tables).
- Performance budget: lightweight HTML + CSS + JS.
- Accessibility: semantic HTML, keyboard navigation, visible focus states, sufficient contrast, reduced motion.

## 10. Design and UX

See [`07-ui-ux-design.md`](07-ui-ux-design.md) for complete design specifications.

### Design principles

- Clean, technical, calm, minimal, polished, readable, fast, responsive.
- Accessible (WCAG 2.1 AA).
- Responsive (sidebar + content on desktop; collapsed navigation on mobile).
- Clear feedback (loading, empty, validation, failure states).
- Themeable light and dark.

## 11. Testing strategy

See [`09-testing-strategy.md`](09-testing-strategy.md) for complete testing strategy.

### Test layers

Markdown parsing, file discovery, navigation generation, URL generation, template rendering, static build output, asset copying, CLI commands, error handling.

## 12. Deployment

See [`11-deployment.md`](11-deployment.md) for the complete deployment strategy and [`12-operations.md`](12-operations.md) for ongoing operations.

### Options

- Local: `pagify build` → static `dist/` directory.
- Static host: GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any web server.
- CI: GitHub Actions quality gates and cross-platform releases.

## 13. Contributing

See [`AGENTS.md`](AGENTS.md) for development setup and guidelines.

### Repository conventions

- Go: `go fmt`, `go vet`, `go test`
- Markdown: numbered `docs/00`–`12` govern implementation detail
- Generated `dist/` output is never committed

## 14. License

This is a portfolio project for demonstration purposes.
