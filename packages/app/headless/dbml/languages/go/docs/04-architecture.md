# dbml (Go) — System Architecture

## 1. Purpose

This document describes the system architecture, component responsibilities, data flows, trust boundaries, and failure-recovery strategies for dbml.

The architecture must support a reliable DBML conversion workflow while remaining operationally robust. dbml is designed as a single binary with strict separation between parsing, generation, and transport.

The primary architectural goals are:

- Clear separation of responsibilities between the DBML parser, output generators, and transport layers.
- Dependency-free portability (pure Go, no CGO).
- Reliable conversion with actionable error messages.
- Observable failures and recoverable operations.
- Zero-config default experience.

## 2. Architectural Overview

dbml uses a layered architecture. The DBML parser produces an internal AST, generators walk the AST to produce output, and transport layers (CLI, HTTP, MCP) delegate to the parser and generators without containing business logic.

The main architectural rules are:

1. **Parser autonomy**: The parser owns DBML parsing and AST construction. It knows nothing about CLI flags, HTTP routes, or MCP transport.
2. **Generator purity**: Generators take the AST as input and produce output strings. They know nothing about files, networks, or transports.
3. **Transport thinness**: CLI commands, HTTP handlers, and MCP tools are thin wrappers that parse input, call the parser and generators, and write output.
4. **No cross-transport logic**: Do not mix HTTP logic into the parser. Do not hard-code output formats into the parser.

### High-level architecture

```text
DBML Input (file or string)
    ↓
Parser (internal/dbml/parser.go)
    ├─ Parse tables, columns, constraints
    ├─ Parse enums, indexes, notes
    └─ Build internal AST
    ↓
Generators
    ├─ SQL (PostgreSQL DDL)
    ├─ Mermaid (erDiagram syntax)
    └─ SVG (rendered directly in Go)
    ↓
CLI Commands (cmd/) or HTTP Handlers (internal/server/) or MCP Tools (internal/mcp/)
    └─ Write files, return JSON, or return tool text
```

Source diagram: [`01-high-level-architecture.mmd`](./04-architecture/mmd/01-high-level-architecture.mmd)

## 3. Architectural Style

### 3.1 Layered pipeline

dbml is decomposed into bounded contexts, each with a single responsibility:

- **DBML Parser** (`internal/dbml/parser.go`): Parses DBML source into an internal AST. Handles tables, columns, types, constraints, enums, indexes, notes, and project metadata.
- **SQL Generator**: Produces PostgreSQL-compatible `CREATE TABLE` statements with constraints and `ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY` for references.
- **Mermaid Generator**: Produces `erDiagram` syntax with tables, PK/UK/NOT NULL markers, and relationship lines with cardinality.
- **SVG Generator**: Renders an SVG ER diagram directly in Go with no external tooling.
- **CLI** (`cmd/`): Cobra commands (`sql`, `mermaid`, `svg`, `all`, `serve`, `mcp`) that delegate to the parser and generators.
- **HTTP Server** (`internal/server/`): REST API with health check and convert endpoints, supporting JSON and multipart form-data.
- **MCP Server** (`internal/mcp/`): JSON-RPC 2.0 over stdio with tools `dbml_sql`, `dbml_mermaid`, `dbml_svg`, `dbml_parse`.

### 3.2 Separation of concerns

The parser builds an internal AST. Generators walk the AST. Transports invoke generators and handle I/O. No transport logic leaks into the parser or generators.

## 4. Component Responsibilities

| Component | Responsibility |
| --------- | -------------- |
| **DBML Parser** | Parse DBML source into an internal AST (tables, columns, constraints, enums, indexes, notes) |
| **SQL Generator** | Generate PostgreSQL-compatible DDL from the AST |
| **Mermaid Generator** | Generate Mermaid `erDiagram` syntax from the AST |
| **SVG Generator** | Render an SVG ER diagram from the AST |
| **CLI (Cobra)** | Thin command wrappers: `sql`, `mermaid`, `svg`, `all`, `serve`, `mcp` |
| **HTTP Server** | REST API: health check, convert (JSON + multipart), OpenAPI |
| **MCP Server** | JSON-RPC 2.0 over stdio: `dbml_sql`, `dbml_mermaid`, `dbml_svg`, `dbml_parse` |

### 4.1 DBML Parser

The parser handles:

- **Table definitions** — tables with columns, types, constraints
- **Column constraints** — primary keys (`pk`), unique (`unique`), not null (`not_null`), default values (`default:`)
- **Foreign key references** — with direction indicators (`<`, `>`)
- **Enum definitions** — named enum types with values
- **Indexes** — single and composite indexes, unique indexes
- **Notes/comments** — table and column notes
- **Project metadata** — database type, project name

#### Output: SQL

Generates:

- `CREATE TABLE` statements with proper column types
- Column constraints (PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT)
- `ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY` for references
- Proper quoting of string defaults

#### Output: Mermaid

Generates Mermaid ER diagram syntax:

- `erDiagram` syntax
- Tables with PK/UK/NOT NULL markers
- Relationship lines with cardinality

### 4.2 CLI Commands

All commands are thin Cobra wrappers that delegate to the parser and generators:

- `sql` — reads DBML, generates SQL, writes to file
- `mermaid` — reads DBML, generates Mermaid, writes to file
- `svg` — reads DBML, renders an SVG ER diagram, writes to file
- `all` — runs sql + mermaid + svg in sequence
- `serve` — starts HTTP server with REST API
- `mcp` — starts MCP server over stdio (`mcp serve`)

### 4.3 HTTP Server

The server provides:

- RESTful JSON API
- Multipart form-data support for file uploads
- Health check endpoint (`GET /health`)
- Graceful shutdown on SIGINT/SIGTERM
- Structured logging via slog

#### Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/health` | Health check |
| POST | `/api/v1/convert` | Convert DBML to multiple formats |
| POST | `/api/v1/convert/sql` | Convert DBML to SQL only |
| POST | `/api/v1/convert/mermaid` | Convert DBML to Mermaid only |
| GET | `/api/v1/openapi.json` | OpenAPI 3 document |
| GET | `/api/v1/docs` | Swagger UI |

#### Request formats

- JSON body with `dbml` string and `formats` array
- Multipart form-data with `file` field (DBML file upload)
- Multipart form-data with `dbml` field (DBML content)

#### Response

JSON with `sql`, `mermaid`, and `svg` fields (empty strings if not requested).

### 4.4 MCP Server

An alternate transport for LLM clients. It speaks JSON-RPC 2.0 over stdio, implementing `initialize`, `ping`, `tools/list`, and `tools/call`.

`protocol.go` owns the transport and dispatch; `tools.go` owns the tool catalogue and handlers, delegating to `internal/dbml` exactly like the CLI and HTTP handlers. No MCP logic leaks into the parser or generators.

#### Tools

| Tool | Description |
| ---- | ----------- |
| `dbml_sql` | Convert DBML source to a PostgreSQL SQL schema |
| `dbml_mermaid` | Convert DBML source to a Mermaid ER diagram |
| `dbml_svg` | Render DBML source as an SVG ER diagram |
| `dbml_parse` | Parse DBML source and return a JSON schema summary |

Each tool accepts a single `dbml` string argument.

## 5. Repository and Module Boundaries

dbml is a single Go module with a clear internal layout:

```text
go/
├── main.go              # Entrypoint (package main) → cmd.Execute()
├── cmd/                 # Cobra command wiring
│   ├── root.go          # rootCmd, version, help
│   ├── sql.go           # SQL generation command
│   ├── mermaid.go       # Mermaid ERD generation command
│   ├── svg.go           # SVG generation command
│   ├── all.go           # Generate all formats at once
│   └── serve.go         # HTTP server command
├── internal/
│   ├── dbml/
│   │   ├── parser.go    # DBML parser + SQL/Mermaid generators
│   │   ├── svg.go       # SVG layout + ToSVG
│   │   └── svg_draw.go  # SVG element rendering
│   ├── mcp/             # MCP server over stdio
│   │   ├── protocol.go  # JSON-RPC transport, dispatch
│   │   └── tools.go     # Tool definitions + handlers
│   └── server/
│       └── server.go    # HTTP server with REST API
├── bin/                 # Build output directory
├── go.mod
├── go.sum
├── Makefile
├── Dockerfile
├── AGENTS.md
└── README.md
```

**Rules:**

- No mixing of HTTP logic into the parser.
- Do not hard-code output formats into the parser.
- `internal/dbml/parser.go` holds the DBML parser and both generators (SQL and Mermaid).
- `internal/server/server.go` is the HTTP server; it uses the parser and generators but does not contain business logic.
- Keep functions small and focused (≤ 30 lines).
- Keep files small (≤ 200 lines).

## 6. Pipeline

The conversion pipeline is:

```text
DBML Input (file or string)
    ↓
Parser (internal/dbml/parser.go)
    ├─ Parse tables, columns, constraints
    ├─ Parse enums, indexes, notes
    └─ Build internal AST
    ↓
Generators
    ├─ SQL (PostgreSQL DDL)
    ├─ Mermaid (erDiagram syntax)
    └─ SVG (rendered directly in Go)
    ↓
CLI Commands (cmd/) or HTTP Handlers (internal/server/) or MCP Tools (internal/mcp/)
    └─ Write files, return JSON, or return tool text
```

## 7. Configuration

dbml reads no environment variables and writes no config files. Everything is expressed through CLI flags:

| Flag (command) | Default | Purpose |
| -------------- | ------- | ------- |
| `-o` (sql, mermaid, svg) | auto-generated | Output file path |
| `-d` / `--output-dir` (all) | `.` | Output directory for all formats |
| `--port` (serve) | `8080` | HTTP server listen port |

## 8. Failure Recovery

### 8.1 Parser failures

- Malformed DBML input returns an actionable error identifying what failed, which file/path was involved, and enough context to fix it.
- Duplicate messages are not applicable (single-shot conversion).

### 8.2 HTTP server failures

- Return structured JSON error envelope with `error` field. No internal details exposed.
- Server returns `503` for unavailable dependencies.

### 8.3 MCP server failures

- JSON-RPC error responses with code, message, and data.
- Malformed requests return `parse error` or `invalid request` per JSON-RPC 2.0.

## 9. Security Boundaries

### 9.1 Input validation

- All DBML input validated before processing.
- Amounts and identifiers are validated at the parser boundary.
- No user input becomes raw identifiers or expressions.

### 9.2 Network exposure

- The HTTP server binds to `127.0.0.1` by default in local mode; container mode binds to all interfaces for `serve`.
- No secrets logged or exposed.
- No network calls by default (pure local conversion).

## 10. Scalability Considerations

- **Stateless conversion**: Each conversion is independent; no shared state.
- **Horizontal scaling**: The HTTP server is stateless and horizontally scalable behind a load balancer.
- **Binary size**: Pure Go static binary with minimal runtime requirements.

## Cross-references

- Data model: [`05-data-model.md`](05-data-model.md)
- API: [`06-api-specification.md`](06-api-specification.md)
- Deployment: [`11-deployment.md`](11-deployment.md)
