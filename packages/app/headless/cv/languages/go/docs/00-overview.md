# cv (Go) — Project Overview

## 1. Project Summary

**cv** is a single static Go binary that turns a single `cv.yaml` into a print-ready PDF — 64 templates, a Markdown export, an HTTP endpoint, and an MCP server.

The project showcases end-to-end Go engineering: a Cobra CLI (`init`, `validate`, `pdf`, `md`, `serve`, `mcp serve`), a hand-rolled JSON-RPC 2.0 server over stdio, in-process HTML → PDF rendering via `gowkhtmltopdf` (no `wkhtmltopdf`, no CGO), and 64 HTML templates grouped into 8 visual families.

cv is an independent portfolio project. It must not copy proprietary software, branding, source code, or confidential workflows from any existing product.

## 2. Problem Statement

Rendering a CV from structured data today means choosing between heavy desktop tools, headless browsers, or fragile HTML-to-PDF services. A developer who wants a dependency-free, scriptable CV renderer has no small, static-binary option.

A useful CV tool needs to make it possible to:

- Author one `cv.yaml` with every section (personal, experience, education, projects, skills, certifications, languages, interests, references).
- Choose from 64 templates across 8 visual families.
- Render to PDF (A4), Markdown, HTTP, or MCP from one data file.
- Run with no external engine — no `wkhtmltopdf`, no Chrome, no CGO.
- Validate required fields before rendering.
- Serve over HTTP or expose tools to LLM clients via MCP.

cv brings these workflows together in one coherent binary.

## 3. Product Vision

Build a polished, production-style CV renderer that demonstrates how a small, cohesive Go tool can support a complete author-to-artifact loop without external dependencies.

The product should be sufficiently complete that a reviewer can run `cv init`, edit `cv.yaml`, and produce a print-ready PDF without manually touching HTML or CSS.

The project should prioritise engineering quality, reproducibility, and dependency minimalism over the number of features.

## 4. Target Users

### 4.1 Job seeker

A person who authors a CV in YAML and needs a print-ready PDF.

Primary needs:

- Scaffold a default `cv.yaml` with `cv init`.
- Validate required fields with `cv validate`.
- Render a PDF with `cv pdf`.
- Render Markdown with `cv md`.

### 4.2 Developer or Operator

A person responsible for self-hosting or integrating the renderer.

Primary needs:

- Build a static binary with `make build` (CGO disabled).
- Serve `POST /pdf` and `GET /health` with `cv serve`.
- Expose `cv_init`, `cv_pdf`, `cv_templates` via `cv mcp serve`.
- Run the container on `alpine:3.24`.

## 5. Product Goals

### Goal 1: Deliver a complete render workflow

A user can move from scaffolding to a print-ready PDF within the CLI.

### Goal 2: Demonstrate dependency-minimal Go engineering

No external PDF engine, no CGO, no network calls at render time; the binary is pure Go.

### Goal 3: Support multiple output formats from one source

One `cv.yaml` drives PDF, Markdown, HTTP, and MCP outputs.

### Goal 4: Provide a maintainable template system

64 self-contained HTML templates, grouped by visual family, addressed as `<group>/<name>`.

### Goal 5: Expose the renderer to LLM clients

An MCP server over stdio lets Claude Code, Cursor, and VS Code call `cv_pdf` and `cv_init`.

## 6. Non-Goals

The initial release will not:

- Implement a theme system of 8 structures × 8 color schemes with palette injection (tracked in the roadmap).
- Add HTML or ATS-friendly plain-text export.
- Support custom page sizes and margins.
- Add photo/avatar support in templates.
- Import from or export to JSON Resume schema.
- Implement `cv validate` wiring beyond stubs in `internal/mcp`.

These features may be considered in future iterations, but they must not compromise the initial delivery.

## 7. Technology Direction

The intended technology stack is:

- **Language:** Go 1.27+ (module `cv`)
- **CLI:** `github.com/spf13/cobra`
- **YAML parsing:** `gopkg.in/yaml.v3`
- **Templating:** `text/template` (stdlib)
- **HTML → PDF:** `github.com/chinmay-sawant/gowkhtmltopdf` (pure Go, no CGO)
- **HTTP:** Standard `net/http`
- **MCP:** Hand-rolled JSON-RPC 2.0 over stdio
- **Testing:** Standard `go test`, table-driven tests
- **Containerisation:** Docker on `alpine:3.24`
- **CI/CD:** GitHub Actions rolling release

Local commits use Husky and lint-staged to apply fast formatting and lint checks. CI remains the authoritative quality gate.

## 8. Security and Privacy Principles

The application must:

- Validate all input before processing (required-field checks in `cv validate`).
- Never treat `text/template` as a security boundary — `cv.yaml` is trusted input produced by the user.
- Avoid logging credentials or sensitive data.
- Keep secrets out of source control and frontend bundles.

cv is a portfolio demonstration and does not process personal data beyond what the user places in their own `cv.yaml`.

## 9. MVP Definition of Done

The minimum viable product is complete when:

- A developer can build the binary using documented instructions (`make build`, `CGO_ENABLED=0`).
- `cv init` scaffolds a valid default `cv.yaml`.
- `cv validate` checks required fields and exits non-zero on failure.
- `cv pdf` renders all 64 templates to PDF without error.
- `cv md` produces valid Markdown.
- `cv serve` answers `POST /pdf` and `GET /health`.
- `cv mcp serve` implements `initialize`, `tools/list`, and `tools/call`.
- CI runs the required quality checks (lint, typecheck, test).
- A container image builds and serves on `alpine:3.24`.
- The architecture and operational limitations are documented.

## 10. Success Criteria

The project should demonstrate the following outcomes:

| Area             | Success criterion                                                            |
| ---------------- | ---------------------------------------------------------------------------- |
| User experience  | `cv init` → `cv pdf` produces a print-ready PDF without developer assistance.|
| CLI              | Six subcommands (`init`, `validate`, `pdf`, `md`, `serve`, `mcp serve`).     |
| Templates        | 64 templates across 8 visual families, each self-contained HTML.             |
| Binary           | Static, pure Go, no CGO, no external PDF engine.                             |
| HTTP             | `POST /pdf` returns `application/pdf`; `GET /health` returns `{"status":"ok"}`.|
| MCP              | JSON-RPC 2.0 over stdio with `initialize`, `tools/list`, `tools/call`.       |
| Testing          | Repeatable automated checks covering rendering and validation.               |
| DevOps           | Reproducible builds, Docker image, and rolling CI release.                   |

## 11. Guiding Principles

1. **Working software first:** deliver a complete vertical slice (scaffold → PDF) before expanding scope.
2. **Dependency minimalism:** prefer the standard library; avoid dependency creep.
3. **Static by default:** `CGO_ENABLED=0`, no external engine at render time.
4. **Thin commands:** `cmd/` only parses flags and delegates to `internal/cv`.
5. **Explicit contracts:** documented API models, error envelopes, and template naming.
6. **Reliable rendering:** every template renders without error; fallbacks resolve safely.
7. **Reproducibility:** record inputs, parameters, and versions needed to understand a render.
8. **Evidence over claims:** document only features that have actually been implemented and tested.
9. **Incremental delivery:** keep every implementation milestone runnable and reviewable.
10. **No comments in code** unless explaining non-obvious logic.
