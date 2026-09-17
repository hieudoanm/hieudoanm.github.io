# dbml (Go) — Technology Stack & Decisions

## 1. Purpose

This document records which technologies are chosen and why.

Where this file disagrees with numbered documents `00`–`12`, the numbered documents govern.

## 2. How Decisions Are Made

1. Prefer the boring, mature option.
2. One tool per responsibility.
3. Types and validation at the boundaries.
4. Reproducibility: pinned deps, versioned builds.
5. Justify every dependency.
6. Record the rejected alternative.

Non-negotiable:

- **DBML is the primary input format.**
- **Every successful conversion produces the requested output format.**
- **Pure Go (no CGO); standalone binary.**

## 3. Stack at a Glance

| Layer | Chosen technology | Decision record |
| ----- | ----------------- | --------------- |
| Language | Go 1.23+ | [§4.1](#41-go) |
| CLI | `github.com/spf13/cobra` | [§4.2](#42-cobra) |
| HTTP routing | `github.com/gorilla/mux` | [§4.3](#43-gorilla-mux) |
| Parsing | Custom DBML parser (stdlib) | [§4.4](#44-custom-parser) |
| Rendering | Custom SQL/Mermaid/SVG generators (stdlib) | [§4.5](#45-custom-generators) |
| Testing | Standard `go test`, table-driven | [§4.6](#46-testing) |
| Container | Docker / Alpine | [§5](#5-docker) |
| CI | GitHub Actions | [§6](#6-github-actions) |
| Build | Makefile | [§7](#7-makefile) |

## 4. Backend (Go)

### 4.1 Go

**Choice:** Go 1.23+.

**Why:** Requested; strong stdlib; single static binary; excellent concurrency model.

**Rejected:** Python (slower, dependency-heavy), Node.js (runtime dependency).

### 4.2 Cobra

**Choice:** `github.com/spf13/cobra`.

**Why:** Mature CLI framework; nested commands; built-in help and version.

**Rejected:** Standard library `flag` (insufficient for subcommands), Urfave/cli (less idiomatic for this use case).

### 4.3 Gorilla Mux

**Choice:** `github.com/gorilla/mux`.

**Why:** Mature HTTP router; request context support; middleware support.

**Rejected:** Standard library `net/http` ServeMux (limited routing), Chi (similar but gorilla/mux already in use).

### 4.4 Custom DBML parser

**Choice:** Custom parser using Go standard library.

**Why:** No existing Go DBML parser meets the zero-dependency requirement; full control over grammar and error messages.

**Rejected:** Third-party DBML parsers (add dependencies, may not match required grammar).

### 4.5 Custom generators

**Choice:** Custom SQL, Mermaid, and SVG generators using Go standard library.

**Why:** Zero external rendering dependencies (no mermaid-cli, no Graphviz); full control over output.

**Rejected:** mermaid-cli (Node.js dependency), Graphviz (external binary dependency).

### 4.6 Testing

**Choice:** Standard `go test` with table-driven tests.

**Why:** Built into Go; idiomatic; no extra dependencies.

**Rejected:** Testify (extra dependency for marginal benefit), Ginkgo (heavier than needed).

## 5. Docker

**Choice:** `golang:1.23-alpine` build stage, `alpine:3.22` runtime stage.

**Why:** Multi-stage build produces a minimal runtime image; user `dbml` (uid 10001) for non-root execution.

**Rejected:** `golang` full image (larger attack surface), distroless (debugging harder).

## 6. GitHub Actions

Lint, test, cross-build (4 platforms), and rolling GitHub Release on every push.

## 7. Makefile

Targets: `format`, `lint`, `test`, `build`, `build-all`, `coverage`, `tidy`, `install`, `clean`.

`make all` (format + lint + test + build) is the gate before handoff.

## 9. Explicitly out of stack

mermaid-cli, Graphviz, Node.js, Python, Kubernetes, cloud object storage, MLflow.

## 10. Package manager & git hooks

Go modules for dependency management; `go mod tidy` to keep `go.mod`/`go.sum` clean. Git hooks: Husky (`.husky/pre-commit`) runs `pnpm run lint`, `typecheck` and `format` for changed packages. There is no lint-staged configuration, and no hook runs `gofmt` or `go vet` — those are enforced by `make all` locally and by the CI `go` job (`make lint`, `make test`, `make build-all`).

Details:

- [`tools/gofmt.md`](./08-tech-stack/tools/gofmt.md)
- [`tools/govet.md`](./08-tech-stack/tools/govet.md)

See companions:

- [`cli/README.md`](./08-tech-stack/cli/README.md)
- [`server/README.md`](./08-tech-stack/server/README.md)
- [`infrastructure/README.md`](./08-tech-stack/infrastructure/README.md)
