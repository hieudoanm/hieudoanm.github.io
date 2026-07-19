# cv (Go) — Product Specification

Product strategy · Requirements · Architecture · Data model · Delivery roadmap

> This document is the product-strategy source. The normative implementation set is [`00`–`12`](#normative-documents). Where this document and the numbered documents disagree on implementation detail, the numbered documents govern.

## Normative documents

| #   | Document                                                 | Governs                                                      |
| --- | -------------------------------------------------------- | ------------------------------------------------------------ |
| 00  | [`00-overview.md`](00-overview.md)                       | Product vision and scope                                     |
| 01  | [`01-requirements.md`](01-requirements.md)               | Functional/non-functional requirements                       |
| 02  | [`02-features.md`](02-features.md)                       | User-visible behaviour                                       |
| 03  | [`03-user-stories.md`](03-user-stories.md)               | User goals and acceptance scenarios                          |
| 04  | [`04-architecture.md`](04-architecture.md)               | Module boundaries, request lifecycle, tenancy                |
| 05  | [`05-data-model.md`](05-data-model.md)                   | Schema, constraints, state transitions                       |
| 06  | [`06-api-specification.md`](06-api-specification.md)     | REST contract, status codes, error envelope                  |
| 07  | [`07-ui-ux-design.md`](07-ui-ux-design.md)               | UI tokens, layout, states, accessibility                     |
| 08  | [`08-tech-stack.md`](08-tech-stack.md)                   | Allowed technologies and dependency policy                   |
| 09  | [`09-testing-strategy.md`](09-testing-strategy.md)       | Test layers, fixtures, acceptance criteria                   |
| 10  | [`10-implementation-plan.md`](10-implementation-plan.md) | Phased delivery plan                                         |
| 11  | [`11-deployment.md`](11-deployment.md)                   | CI, Docker, and release                                      |
| 12  | [`12-operations.md`](12-operations.md)                   | Operations: security, rollback, recovery                     |

---

## 1. Product vision

**cv** is a single static Go binary that turns one `cv.yaml` into a print-ready PDF, a Markdown document, an HTTP endpoint, and an MCP tool — across 64 templates grouped into 8 visual families.

The product demonstrates end-to-end Go engineering: a Cobra CLI, hand-rolled JSON-RPC 2.0 over stdio, in-process HTML → PDF rendering with no CGO, and a template system of 64 HTML documents with inline stylesheets.

## Product principles

**One source file** — every section of the CV in plain YAML; one `cv.yaml` drives every output format.

**Static by default** — `CGO_ENABLED=0`, no external PDF engine, no headless Chrome, no network calls at render time. The binary ships as a standalone artifact.

**Thin commands, rich internals** — `cmd/` only parses flags and delegates to `internal/cv`; rendering logic never lives in `cmd/`.

**No comments in code** unless explaining non-obvious logic.

## 2. Target users

| Persona            | Primary need                                | Desired outcome                        |
| ------------------ | ------------------------------------------- | -------------------------------------- |
| Job seeker         | Render a print-ready CV from one YAML file  | A polished PDF via a static binary     |
| Developer/Operator | Self-host the rendering API or MCP server   | Reproducible builds and container image|

Primary persona: a developer who wants a dependency-free CV renderer they can run locally, serve over HTTP, or call from an LLM client via MCP.

## 3. Scope and priorities

- **P0** — Core platform: `cv init`, `cv validate`, `cv pdf`, `cv md`, `cv serve`, `cv mcp serve`; 64 templates; pure-Go static binary.
- **P1** — Enhancement: theme system (8 structures × 8 color schemes), multiple output formats, HTML/ATS exports.

The first release delivers one complete render workflow rather than an incomplete version of every theme feature.

## 4. Functional requirements

See [`01-requirements.md`](01-requirements.md) for the complete specification.

## 5. User journeys

### Journey A — Render a CV

Goal: turn a `cv.yaml` into a PDF.

1. Run `cv init` to scaffold a default `cv.yaml`.
2. Edit `cv.yaml` with personal, experience, education, and skills.
3. Run `cv pdf -t classic/classic -o cv.pdf`.
4. Review the A4 print-ready PDF.

### Journey B — Serve over HTTP

Goal: render a CV from an LLM or script.

1. Run `cv serve` (or `docker run cv serve`).
2. POST a `CVData` JSON body to `/pdf`.
3. Receive `application/pdf` bytes.

### Journey C — Call from an LLM client

Goal: render a CV through an MCP tool.

1. Run `cv mcp serve` over stdio.
2. Call `cv_pdf` or `cv_init` from Claude Code, Cursor, or VS Code.

## 6. Application structure

| Entry point        | Purpose                                |
| ------------------ | -------------------------------------- |
| `main.go`          | Entrypoint — calls `cmd.Execute()`     |
| `cmd/root.go`      | Root Cobra command                     |
| `cmd/init.go`      | `cv init` — scaffold default `cv.yaml` |
| `cmd/validate.go`  | `cv validate` — required-field checks  |
| `cmd/pdf.go`       | `cv pdf` — render template to PDF      |
| `cmd/md.go`        | `cv md` — render Markdown              |
| `cmd/serve.go`     | `cv serve` — `POST /pdf`, `GET /health`|
| `cmd/mcp.go`       | `cv mcp serve` — JSON-RPC 2.0 over stdio|
| `internal/cv/`     | Data model, loading, rendering         |
| `internal/mcp/`    | JSON-RPC 2.0 server over stdio         |
| `templates/`       | 64 HTML templates, 8 × 8               |

## 7. Technical architecture

See [`04-architecture.md`](04-architecture.md) for module boundaries, request lifecycle, and the render pipeline.

## 8. Current implementation status

This snapshot reflects the repository state. The documentation set is the source of truth for implementation.

See [`10-implementation-plan.md`](10-implementation-plan.md) for the phased roadmap (Phases 1–8).

## 9. Non-functional requirements

See [`01-requirements.md`](01-requirements.md).

### Key targets

- Binary: static, no CGO, no external PDF engine
- Templates: 64 across 8 visual families, each self-contained HTML
- Export formats: PDF (A4), Markdown, HTTP (`application/pdf`), MCP

## 10. Design and UX

See [`07-ui-ux-design.md`](07-ui-ux-design.md) for template and design specifications.

## 11. Testing strategy

See [`09-testing-strategy.md`](09-testing-strategy.md).

### Test layers

Unit (table-driven), HTTP handler tests, MCP protocol tests, template render coverage.

## 12. Deployment

See [`11-deployment.md`](11-deployment.md) for CI, Docker, and release; [`12-operations.md`](12-operations.md) for operations.

### Options

- Local: `go build` / `make build` producing `bin/cv`
- Container: `Dockerfile` on `alpine:3.24`, `ENTRYPOINT` is the binary
- CI: GitHub Actions rolling release (`app-headless-cv-latest`)

## 13. Contributing

See the repo-wide [`AGENTS.md`](AGENTS.md) for contributor guidelines.

Update `docs/04-architecture.md` when the pipeline, data model, or command surface changes. Update `docs/11-deployment.md` when commands or flags change. Keep `docs/10-implementation-plan.md` checkboxes in sync with what actually ships.

## 14. License

This is a portfolio project for demonstration purposes.
