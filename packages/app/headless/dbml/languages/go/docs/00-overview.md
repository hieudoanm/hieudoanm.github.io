# dbml (Go) — Project Overview

## 1. Project Summary

**dbml** is a Go-based CLI and HTTP server that converts Database Markup Language (DBML) files into multiple output formats including SQL schemas (PostgreSQL-compatible DDL), Mermaid ER diagrams, and SVG visualizations.

The product is inspired by the dbml-lang specification and tools like dbdocs/dbdiagram.io, but provides a lightweight, portable, dependency-free Go implementation that works as both a CLI and a REST API server.

## 2. Problem Statement

Database schemas are often described in DBML, a concise domain-specific language for defining tables, columns, constraints, and relationships. Developers need to convert DBML into:

- Executable SQL DDL for database migrations
- Mermaid ER diagrams for documentation
- SVG diagrams for visual presentation

Existing tooling is often tied to specific platforms, requires external dependencies (e.g. mermaid-cli, Graphviz), or is SaaS-only. dbml fills the gap with a single static Go binary that needs no external tools.

## 3. Product Vision

> **Write DBML. Run one command. Get SQL, diagrams, and API.**

dbml should be simple enough to understand, powerful enough to use, and small enough to trust. It works zero-config: point it at a DBML file and get multiple output formats.

## 4. Target Users

| Persona | Primary need | Desired outcome |
| ------- | ------------ | --------------- |
| Developer | Convert DBML to SQL, diagrams, and API | Fast, portable conversion tool |
| Developer/Operator | Run and maintain the tool | Reproducible builds and clear docs |

Primary persona: a developer who wants a lightweight, dependency-free DBML converter that works as a CLI, HTTP API, and MCP server.

## 5. Product Goals

### Goal 1: Deliver a complete conversion workflow

A user can move from a DBML file to SQL, Mermaid, and SVG output with a single command.

### Goal 2: Demonstrate full-stack ownership in Go

The implementation covers CLI, HTTP server, MCP server, parsing, generation, packaging, CI/CD, and documentation.

### Goal 3: Ensure dependency-free portability

Pure Go (no CGO), standalone binary, minimal runtime requirements.

### Goal 4: Maintain clean architectural boundaries

Strict separation between parser, generators, and transport layers (CLI, HTTP, MCP).

## 6. Non-Goals

The initial release will not:

- Be a full database modeling tool with schema reverse-engineering
- Require configuration for things that can be inferred
- Process real data or personally identifiable information
- Claim compliance with regulations or certifications without independently establishing requirements and evidence

## 7. Primary User Workflow

1. A user authors a `schema.dbml` file defining tables, columns, constraints, and relationships.
2. The user runs `dbml all schema.dbml --output-dir ./output`.
3. dbml produces `schema.sql`, `database-erd.mmd`, and `diagram.svg`.
4. The user commits the generated artifacts alongside migrations or documentation.

## 8. Technology Direction

| Layer | Technology | Responsibility |
| ----- | ---------- | ------------ |
| CLI | Go + Cobra | Command-line interface (sql, mermaid, svg, all, serve, mcp) |
| Parser | Go standard library | DBML parsing into an internal AST |
| Generators | Go standard library | SQL DDL, Mermaid erDiagram, SVG rendering |
| HTTP server | Go + Gorilla Mux | REST API for programmatic conversion |
| MCP | Go standard library | JSON-RPC 2.0 over stdio |
| Container | Docker / Alpine | Self-hosted HTTP server |
| CI/CD | GitHub Actions | Lint, test, cross-build, release |

Local commits use Husky and lint-staged to apply fast formatting and lint checks to staged source files. CI remains the authoritative full quality gate.

## 9. Security and Privacy Principles

- No secrets in code or frontend bundles.
- No network calls by default.
- Pure Go (no CGO) reduces the attack surface.
- No real PII used in demonstrations.

## 10. MVP Definition of Done

The canonical release definition of done lives in [`10-implementation-plan/definition-of-done.md`](10-implementation-plan/definition-of-done.md); this section summarises it and defers to it.

The minimum viable product is complete when:

- A developer can build and run the tool using documented instructions (`make build`).
- A user can convert a DBML file to SQL, Mermaid, and SVG.
- The CLI supports `sql`, `mermaid`, `svg`, `all`, `serve`, and `mcp` commands.
- The HTTP server exposes health check and convert endpoints.
- Generated SQL executes, Mermaid renders, and SVG is valid.
- CI runs lint, test, and cross-compilation quality gates.

## 11. Success Criteria

| Area | Success criterion |
| ---- | ---------------- |
| CLI | `dbml all schema.dbml` produces valid SQL, Mermaid, and SVG |
| Parser | Handles tables, columns, constraints, enums, indexes, notes |
| Output | SQL executes against PostgreSQL; Mermaid renders in GitHub/GitLab |
| Packaging | Static binary for linux/amd64, linux/arm64, darwin/amd64, darwin/arm64 |
| Docs | Numbered `docs/00`–`12` govern implementation detail |

## 12. Guiding Principles

1. **DBML first** — DBML is the primary input format.
2. **Multiple output formats** — SQL, Mermaid, SVG are the primary build targets.
3. **Go CLI + HTTP server** — One binary, multiple transports.
4. **Separate parsing, generation, and transport** — No mixing of concerns.
5. **Simple enough to understand, powerful enough to use, small enough to trust** — Avoid heavy dependencies and over-engineering.
6. **Working software first** — Deliver one complete conversion workflow before expanding scope.
7. **No comments in code unless explaining non-obvious logic** — Code should be self-documenting.
