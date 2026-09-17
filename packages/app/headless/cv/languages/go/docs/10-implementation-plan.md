# Implementation plan

> Phased roadmap. Shipped items map to the cv feature surface described in
> [04-architecture.md](04-architecture.md) and [11-deployment/downloads.md](11-deployment/downloads.md).

## Phase 1 — Foundation (shipped)

- [x] Go module layout (`main.go` + `cmd/` + `internal/cv/` + `internal/mcp/`)
- [x] `CVData` model with `yaml` and `json` tags (personal, summary, experience,
      education, projects, skills, certifications, languages, interests,
      references)
- [x] Cobra CLI (`init`, `validate`, `pdf`, `md`, `mcp serve`, `serve`)
- [x] `cv init` scaffolding and `cv validate` required-field checks
- [x] YAML parsing via `gopkg.in/yaml.v3`

## Phase 2 — Templates & PDF (shipped)

- [x] In-process HTML → PDF via `gowkhtmltopdf` (no `wkhtmltopdf`, no CGO)
- [x] A4 rendering with zero margins (templates draw their own padding)
- [x] Template resolution by `<group>/<name>` with safe fallbacks
- [x] 64 templates across 8 visual families (bands, classic, colorful,
      minimal, natural, sidebar, soft, specialty)
- [x] Addressable via `cv pdf -t <group>/<name>`

## Phase 3 — Export formats (shipped)

- [x] `cv md` Markdown export
- [x] `cv serve` HTTP endpoint — `POST /pdf` (JSON body → `application/pdf`)
- [x] `GET /health` health check
- [x] `cv mcp serve` JSON-RPC 2.0 over stdio (`initialize`, `tools/list`,
      `tools/call`)

## Phase 4 — CI & packaging (shipped)

- [x] Makefile targets (`format`, `lint`, `test`, `build`, `build-all`,
      `coverage`, `tidy`, `install`, `clean`)
- [x] Cross-compilation for 4 platforms (linux/darwin × amd64/arm64)
- [x] Dockerfile for a container image
- [x] CI pipeline with a rolling GitHub Release
- [x] Rolling release tag `app-headless-cv-latest`
- [x] Example data (`examples/cv.yaml`) and 64 generated theme PDFs

## Phase 5 — Theme system

- [ ] Collapse the 64 flat templates into **8 structures × 8 color schemes**,
      injecting palette tokens at render time (a `:root` splice like
      `landify`), so themes become a cartesian product rather than 64
      hand-maintained files
- [ ] Named color-scheme presets with accessible (WCAG-checked) contrast
- [ ] `cv themes` listing command
- [ ] `--color` / `--scheme` flag to override the palette of a structure
- [ ] Theme gallery regeneration after each change

## Phase 6 — MCP & server polish

- [ ] Wire `tools/call` handlers to `internal/cv` (currently stubs returning
      `"ok"`)
- [ ] Grow the tool set (`cv_init`, `cv_pdf`, `cv_templates`) with
      `cv_validate` and `cv_md`
- [ ] JSON Schemas for every tool's arguments
- [ ] `--port` flag for `cv serve` (currently `PORT` env only)
- [ ] Content-type validation and a consistent JSON error envelope on `POST /pdf`
- [ ] Graceful shutdown on `SIGINT`/`SIGTERM`

## Phase 7 — Testing & tooling

- [ ] `internal/cv` unit tests (loading, template resolution, Markdown, validate)
- [ ] HTTP handler tests via `net/http/httptest`
- [ ] MCP protocol tests driving a full stdio session
- [ ] Table-driven coverage for every template (renders without error)
- [ ] `gofmt`/`godoc` checks in CI

## Phase 8 — Ecosystem

- [ ] Multiple output formats from one run (`cv all`)
- [ ] HTML export for preview and email
- [ ] ATS-friendly plain-text export
- [ ] Custom page size and margin options
- [ ] Photo / avatar support in templates
- [ ] Import from and export to JSON Resume schema
