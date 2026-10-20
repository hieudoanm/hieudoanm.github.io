# pagify — Project Overview

## 1. Project Summary

**pagify** is a Go-based CLI that converts a directory of Markdown files into a beautiful, modern, static HTML website.

A user points `pagify` at a directory of Markdown and gets a complete navigable site — no configuration required, no Node.js, no frontend toolchain, no runtime server dependency. Jupyter notebooks can be converted to Markdown for inclusion in the site.

The project showcases end-to-end engineering across a Go CLI (Cobra), Goldmark Markdown parsing, `html/template` generation, embedded theme assets, and client-side search.

pagify is an independent portfolio project. It must not copy proprietary documentation products, branding, source code, or confidential workflows.

## 2. Problem Statement

Publishing Markdown as a polished website still involves too many disconnected steps: choosing a static-site generator, configuring a theme, installing a Node toolchain, managing a build pipeline, and hosting the output.

A useful documentation tool needs to make it possible to:

- Point at a directory of Markdown files and get a website.
- Discover pages and build navigation from the file structure, with zero config.
- Render GitHub-Flavored Markdown (tables, task lists, footnotes, callouts).
- Support frontmatter for page metadata.
- Provide client-side search with no backend.
- Ship a light/dark, responsive theme embedded in a single binary.
- Preview locally and serve pages over a JSON API.
- Deploy static output to any ordinary static host.

pagify brings these workflows together in one coherent, dependency-light CLI.

## 3. Product Vision

Build a polished, production-style documentation tool that demonstrates how modern Go engineering can support a complete Markdown-to-website loop.

The product should be sufficiently complete that a reviewer can run `pagify build ./docs`, inspect `dist/`, and deploy it without touching a bundler, a database, or a cloud console.

The project should prioritise correctness of the build pipeline, URL stability, and operational clarity over the number of features.

## 4. Target Users

### 4.1 Author

A person who writes Markdown and wants a website.

Primary needs:

- Place Markdown files in a directory and build a site.
- Get navigation and URLs inferred from the file structure.
- Write standard Markdown with common extensions.
- Convert Jupyter notebooks to Markdown for inclusion.
- Preview changes locally while authoring.
- Deploy static output anywhere.

### 4.2 Operator

A person responsible for building and deploying the site.

Primary needs:

- Run `pagify build` with no toolchain beyond Go.
- Preview with `pagify preview` and serve with `pagify serve`.
- Convert notebooks with `pagify ipynb`.
- Diagnose build failures from actionable error messages.
- Cross-compile binaries for Linux, macOS, and Windows.
- Confirm generated output is static and self-contained.

## 5. Product Goals

### Goal 1: Deliver a complete build workflow

A user can move from a directory of Markdown to a deployable `dist/` directory with one command.

### Goal 2: Demonstrate full-stack ownership

The implementation covers CLI design, Markdown parsing, navigation generation, templating, static asset emission, testing, and containerised release.

### Goal 3: Keep URLs stable and inferable

The same file always maps to the same address whether linked, published, or listed in navigation.

### Goal 4: Keep generation static

No server-side rendering, no runtime dependency, no framework. Output works on any static host.

### Goal 5: Record enough to reproduce a build

Source Markdown plus theme plus configuration fully determines `dist/`.

### Goal 6: Provide a maintainable codebase

Clear package boundaries, automated table-driven tests, reproducible builds, and documented engineering decisions.

## 6. Non-Goals

The initial release will not:

- Provide a hosted multi-tenant SaaS, accounts, or billing.
- Deploy to Kubernetes, AWS, or GCP.
- Implement a CMS or WYSIWYG editor (Markdown files are the source of truth).
- Add a dynamic backend (static output is a core principle).
- Add React/Vue/Svelte components (adds complexity, breaks "no JavaScript required").
- Add a plugin marketplace (Go plugins are compile-time; prefer forks).
- Handle sites larger than a few thousand pages without an explicit scaling decision.
- Claim production accuracy or compliance certifications.

These features may be considered later, but they must not compromise the initial delivery.

## 7. Primary User Workflow

1. A user creates a directory of Markdown files (`index.md`, `getting-started.md`, `guides/`).
2. The user runs `pagify build ./docs`.
3. pagify discovers files, parses frontmatter, resolves links, and builds the navigation tree.
4. Each page is rendered to HTML, assets are copied, and a search index is written.
5. `dist/` contains static HTML, CSS, JS, and assets ready to deploy.
6. Optionally, `pagify preview ./docs` serves the site locally with per-request rebuild.

Every stage should provide loading, validation, progress, and recovery feedback.

## 8. Technology Direction

- **CLI:** Go, Cobra.
- **Markdown:** Goldmark (GFM, footnotes, heading IDs, raw HTML passthrough).
- **Templating:** Go `html/template`.
- **Theme:** embedded with `go:embed` (template, stylesheet, scripts).
- **Search:** client-side JavaScript over a generated JSON index.
- **Preview/Serve:** Go HTTP server, per-request rebuild, JSON API.
- **Containerisation:** Docker (optional).
- **CI/CD:** GitHub Actions (lint, vet, test, cross-platform builds).
- **Testing:** Go testing, table-driven.

Local commits use standard Go tooling. CI is the authoritative quality gate.

## 9. Security and Privacy Principles

Security is part of the architecture even though sites are static.

The application must:

- Resolve every content path through the workspace root, so the API cannot read outside `--root`.
- Never interpolate untrusted content into URLs or HTML without escaping.
- Avoid logging raw page contents by default.
- Treat generated output as reproducible from source.

pagify must not claim GDPR certification, SOC 2, or production compliance.

## 10. MVP Definition of Done

The canonical release definition of done lives in [`10-implementation-plan/definition-of-done.md`](10-implementation-plan/definition-of-done.md); this section summarises it and defers to it.

The minimum viable product is complete when:

- A developer can run `pagify build` with only Go installed.
- A user can point pagify at Markdown and see inferred navigation.
- Training... I mean, each Markdown file renders to HTML with frontmatter metadata.
- Client-side search works over the generated index.
- A light/dark, responsive theme is embedded in the binary.
- Invalid input produces actionable errors.
- Automated tests cover the core build workflow.
- CI runs `go fmt`, `go vet`, and `go test`.
- Local operational limits are documented.

## 11. Success Criteria

| Area            | Success criterion                                                                 |
| --------------- | --------------------------------------------------------------------------------- |
| User experience | A reviewer completes Markdown → static site without developer assistance.         |
| CLI             | `build`, `preview`, `serve`, `init` behave as documented.                        |
| Markdown        | GFM tables, task lists, footnotes, callouts render correctly.                    |
| Navigation      | Generated from file structure; no manual navigation file required.               |
| Testing         | Repeatable checks covering parsing, discovery, URLs, rendering, and output.      |
| DevOps          | Cross-platform builds and CI quality gates.                                      |
| Portfolio       | Clear README, architecture diagram, example site, and documented trade-offs.     |

## 12. Guiding Principles

1. **Markdown first:** Markdown is the primary content format.
2. **Static output:** `pagify build` produces deployable static HTML.
3. **Go CLI:** standalone binary with minimal runtime requirements.
4. **Separate content, structure, and presentation:** no presentation logic in the parser.
5. **Zero-config default:** everything in `pagify.yaml` is optional.
6. **No JavaScript required for basic reading.**
7. **Responsive:** desktop sidebar + content; mobile collapsed navigation.
8. **Accessibility:** semantic HTML, keyboard navigation, contrast, reduced motion.
9. **Performance:** lightweight output, no unnecessary external requests.
10. **No production CMS claims:** pagify is a docs tool, not a CMS.
