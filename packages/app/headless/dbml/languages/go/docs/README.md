# dbml (Go) — Product Specification

Product strategy · Functional requirements · Architecture · Data model · Delivery roadmap

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
| 11  | [`11-deployment.md`](11-deployment.md)                   | CI, Docker, and packaging                                    |
| 12  | [`12-operations.md`](12-operations.md)                   | Operations: backup, monitoring, security, rollback, recovery |

---

## 1. Product vision

**dbml** is a Go-based CLI and HTTP server that converts Database Markup Language (DBML) files into various output formats including SQL schemas, Mermaid ER diagrams, and SVG visualizations.

The product vision is:

> **Write DBML. Run one command. Get SQL, diagrams, and API.**

`dbml` is inspired by the dbml-lang specification and tools like dbdocs/dbdiagram.io, but the goal is to provide a lightweight, portable, dependency-free Go implementation that works as both a CLI and a REST API server.

## Product principles

**DBML first** — DBML is the primary input format. The user should be able to point `dbml` at a DBML file and get multiple output formats with minimal or zero configuration.

**Multiple output formats** — The primary build targets are SQL (PostgreSQL-compatible DDL), Mermaid (ER diagram syntax), and SVG (vector graphics rendered directly in Go).

**Go CLI + HTTP Server** — The project is implemented in Go using Cobra for CLI and Gorilla Mux for HTTP routing, with the standard library whenever practical.

**Separate parsing, generation, and transport** — Maintain a strict separation between the DBML parser, the output generators, and the transport layers (CLI, HTTP, MCP).

### The product promise

> Go from DBML source to SQL schema, Mermaid ERD, and SVG diagram with one command.

dbml is a software demonstration, not a full database modeling tool. It does not provide schema reverse-engineering or claim regulatory compliance.

## 2. Target users

| Persona            | Primary need                            | Desired outcome                          |
| ------------------ | --------------------------------------- | ---------------------------------------- |
| Developer          | Convert DBML to SQL, diagrams, and API  | Fast, portable conversion tool           |
| Developer/Operator | Run and maintain the tool               | Reproducible builds and clear docs       |

Primary persona: a developer who wants a lightweight, dependency-free DBML converter that works as a CLI, HTTP API, and MCP server.

## 3. Scope and priorities

- **P0** — Core platform: necessary for the first usable release.
- **P1** — Enhancement: important for a complete experience.

The first release should deliver one complete conversion workflow rather than an incomplete version of every feature.

## 4. Functional requirements

See [`01-requirements.md`](01-requirements.md) for the complete FR specification.

### P0 — Core platform

DBML parsing, SQL generation, Mermaid generation, SVG generation, CLI commands, HTTP server.

### P1 — Enhancement

MCP server, OpenAPI/Swagger UI, additional DBML features, multiple database dialects.

## 5. User journeys

### Journey A — Convert DBML to all formats

Goal: turn a DBML file into SQL, Mermaid, and SVG.

1. Author a `schema.dbml` file defining tables, columns, and constraints.
2. Run `dbml all schema.dbml --output-dir ./output`.
3. Receive `schema.sql`, `database-erd.mmd`, and `diagram.svg`.

Success metric: percentage of valid DBML files that convert without error.

### Journey B — Convert DBML to SQL only

Goal: generate PostgreSQL DDL from DBML.

1. Run `dbml sql schema.dbml -o schema.sql`.
2. Receive a `CREATE TABLE` statement with constraints.

### Journey C — Convert DBML via HTTP API

Goal: convert DBML programmatically.

1. Start `dbml serve --port 8080`.
2. POST to `/api/v1/convert` with DBML content.
3. Receive JSON with `sql`, `mermaid`, and `svg` fields.

## 6. Application structure

| Component | Purpose                                            |
| --------- | -------------------------------------------------- |
| CLI (Cobra)     | Command-line interface for one-off conversions   |
| HTTP Server     | REST API for programmatic conversion             |
| MCP Server      | JSON-RPC 2.0 over stdio for LLM clients          |
| DBML Parser     | Parse DBML into an internal AST                  |
| SQL Generator   | Generate PostgreSQL-compatible DDL               |
| Mermaid Generator | Generate `erDiagram` syntax                    |
| SVG Generator   | Render SVG ER diagrams directly in Go            |

## 7. Technical architecture

### 7.1 System design

dbml is a single Go binary with strict layer separation (see [`04-architecture.md`](04-architecture.md)). The DBML parser produces an internal AST; generators (SQL, Mermaid, SVG) walk the AST; transports (CLI, HTTP, MCP) delegate to the parser and generators without containing business logic.

### 7.2 Technology stack

| Layer            | Technology                                         | Responsibility                                                          |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| CLI              | Go 1.23+, Cobra                                    | Command-line interface (`sql`, `mermaid`, `svg`, `all`, `serve`, `mcp`) |
| Parser           | Go standard library                                | DBML parsing into internal AST                                          |
| Generators       | Go standard library                                | SQL DDL, Mermaid `erDiagram`, SVG rendering                             |
| HTTP server      | Go, Gorilla Mux                                    | REST API for programmatic conversion                                    |
| MCP              | Go standard library                                | JSON-RPC 2.0 over stdio                                                 |
| Containerisation | Docker                                             | Self-hosted HTTP server image                                           |
| CI/CD            | GitHub Actions                                     | Lint, test, cross-build, release                                        |
| Testing          | Go testing, table-driven                           | Unit, integration                                                       |

## 8. Current implementation status

This snapshot reflects the repository state on 2026-10-17. It is intentionally separate from the product vision above.

### Implemented

- **Go module** with Cobra CLI (`sql`, `mermaid`, `svg`, `all`, `serve`, `mcp`)
- **DBML parser** for tables, columns, constraints, enums, indexes, notes
- **SQL generator** (PostgreSQL-compatible DDL)
- **Mermaid ER diagram generator**
- **SVG generator** (rendered directly in Go, no external tooling)
- **HTTP server** with REST API (JSON + multipart form-data)
- **MCP server** over stdio (JSON-RPC 2.0)
- **OpenAPI 3 document** and Swagger UI
- **Cross-compilation** for 4 platforms (linux/amd64, linux/arm64, darwin/amd64, darwin/arm64)
- **Dockerfile** for container image
- **CI pipeline** with format, lint, test, build-all, and rolling GitHub Release

See [`10-implementation-plan.md`](10-implementation-plan.md) for detailed phases.

### Not yet implemented

- **Integration/E2E tests** against real PostgreSQL (unit tests use fakes; CI has no database services).
- **Performance tests** and CI performance gates.
- **Observability** beyond structured logs and health endpoints (metrics, tracing, dashboards, alerting).

### Phase plan

Phases 0–4 are complete (parser, SQL generator, Mermaid generator, SVG generator, CLI commands, HTTP server, MCP server); Phase 5 is in progress (packaging, CI, cross-compilation); Phases 6–7 remain. The phase numbering below is canonical — see [`10-implementation-plan.md`](10-implementation-plan.md) for detailed phases.

Phase 0 Foundation → Phase 1 Data model → Phase 2 Mermaid/SVG → Phase 3 CLI commands → Phase 4 HTTP server → Phase 5 MCP server → Phase 6 Packaging/CI → Phase 7 Docs/demo.

See [`10-implementation-plan.md`](10-implementation-plan.md) for detailed phases.

## 9. Non-functional requirements

See [`01-requirements.md`](01-requirements.md) for complete NFR specification.

### Key targets

- Portable: pure Go (no CGO), standalone binary, minimal runtime requirements
- Fast: sub-second conversion for typical schemas
- Secure: no secrets in code, no network calls by default
- Observable: structured logging via slog
- Reproducible: pinned dependencies, versioned builds

## 10. Design and UX

See [`07-ui-ux-design.md`](07-ui-ux-design.md) for complete design specifications.

### Design principles

- Clear and technical (conversion tool, not marketing splash)
- Accessible (WCAG 2.1 AA compliant)
- Responsive (mobile, tablet, desktop)
- Consistent across CLI, HTTP, and MCP interfaces
- Clear feedback (loading, error, success states)

## 11. Testing strategy

See [`09-testing-strategy.md`](09-testing-strategy.md) for complete testing strategy.

### Test layers

Unit (Go testing, table-driven), Integration (HTTP API endpoints), Contract (OpenAPI), Security (input validation, path traversal)

## 12. Deployment

See [`11-deployment.md`](11-deployment.md) for the complete deployment strategy (CI, Docker, and packaging) and [`12-operations.md`](12-operations.md) for ongoing operations.

### Options

- Local: `make build` → `./bin/dbml sql schema.dbml -o schema.sql`
- Container: `docker run --rm -p 8080:8080 -v "$PWD:/work:ro" dbml serve --port 8080`
- CI/CD: GitHub Actions with quality gates and rolling release
- Operations: backup, monitoring, security, rollback, and recovery (see [`12-operations.md`](12-operations.md))

## 13. Contributing

See `AGENTS.md` for contributor guidelines and [`docs/CONTRIBUTING.md`](CONTRIBUTING.md) for setup and dev commands.

### Repository conventions

- Go: go vet, go test, gofmt
- Documentation: numbered `docs/00`–`12` govern implementation detail

## 14. License

See [LICENSE](LICENSE).
