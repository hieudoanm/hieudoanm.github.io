# AGENTS.md

## Project

`dbml` is a Go-based CLI and HTTP server that converts Database Markup Language (DBML) files into various output formats including SQL schemas, Mermaid ER diagrams, and SVG visualizations.

The product vision is:

> **Write DBML. Run one command. Get SQL, diagrams, and API.**

`dbml` is inspired by the dbml-lang specification and tools like dbdocs/dbdiagram.io, but the goal is to provide a lightweight, portable, dependency-free Go implementation that works as both a CLI and a REST API server.

---

## Core Principles

### 1. DBML first

DBML is the primary input format.

The user should be able to point `dbml` at a DBML file and get multiple output formats with minimal or zero configuration.

Example:

```text
schema.dbml
```

should become:

```text
initial_schema.sql
database-erd.mmd
schema.svg
```

---

### 2. Multiple output formats

The primary build targets are:

- **SQL** — PostgreSQL-compatible DDL with tables, constraints, indexes, foreign keys
- **Mermaid** — ER diagram syntax for documentation and rendering
- **SVG** — Vector graphics rendered directly in Go

The generated artifacts must be usable in CI/CD pipelines, documentation, and database migrations.

---

### 3. Go CLI + HTTP Server

The project is implemented in Go.

Use:
- Go 1.23+
- Cobra for CLI
- Gorilla Mux for HTTP routing
- Standard library whenever practical

The CLI compiles to a standalone binary with minimal runtime requirements.
The HTTP server exposes a REST API for programmatic conversion.

---

### 4. Separate parsing, generation, and transport

Maintain a strict separation:

```text
DBML Input
    ↓
Parser (internal/dbml)
    ↓
Generators (SQL, Mermaid, SVG)
    ↓
CLI Commands (cmd/) / HTTP Handlers (internal/server) / MCP Tools (internal/mcp)
```

Do not mix HTTP logic into the parser.
Do not hard-code output formats into the parser.

---

## Architecture

```
dbml/
├── cmd/
│   ├── root.go          # Root command, version, help
│   ├── sql.go           # SQL generation command
│   ├── mermaid.go       # Mermaid ERD generation command
│   ├── svg.go           # SVG generation command
│   ├── all.go           # Generate all formats at once
│   └── serve.go         # HTTP server command
│
├── internal/
│   ├── dbml/
│   │   ├── parser.go    # DBML parser + SQL/Mermaid/SVG generators
│   ├── mcp/
│   │   ├── protocol.go  # MCP JSON-RPC transport over stdio
│   │   └── tools.go     # MCP tool catalogue + handlers
│   └── server/
│       └── server.go    # HTTP server with REST API
│
├── bin/                 # Build output directory
├── main.go              # Entry point
├── go.mod
├── go.sum
├── Makefile
├── Dockerfile
├── AGENTS.md
└── README.md
```

---

## CLI

The CLI supports:

```bash
dbml sql schema.dbml -o schema.sql
dbml mermaid schema.dbml -o diagram.mmd
dbml svg schema.dbml -o diagram.svg
dbml all schema.dbml --output-dir ./output
dbml serve --port 8080
dbml mcp serve
```

### `sql`

Generates PostgreSQL-compatible SQL schema from DBML.

### `mermaid`

Generates Mermaid ER diagram syntax from DBML.

### `svg`

Generates an SVG ER diagram directly from DBML (no external tooling required).

### `all`

Generates SQL, Mermaid, and optionally SVG in one command.

### `serve`

Starts an HTTP server with REST API:

```
GET  /api/v1/health             - Health check
POST /api/v1/convert            - Convert DBML to multiple formats
POST /api/v1/convert/sql        - Convert DBML to SQL only
POST /api/v1/convert/mermaid    - Convert DBML to Mermaid only
GET  /api/v1/openapi.json       - OpenAPI 3 document
GET  /api/v1/docs               - Swagger UI
```

### `mcp`

Starts an MCP (Model Context Protocol) server over stdio (`dbml mcp serve`) for
LLM clients. Tools: `dbml_sql`, `dbml_mermaid`, `dbml_svg`, `dbml_parse`.

Request (JSON):
```json
{
  "dbml": "Table users { id integer [pk] }",
  "formats": ["sql", "mermaid"]
}
```

Request (multipart/form-data):
- `file`: DBML file upload
- `dbml`: DBML content as form field

Response:
```json
{
  "sql": "CREATE TABLE users (...);",
  "mermaid": "erDiagram\\n    users {\\n        PK INTEGER id\\n    }",
  "svg": ""
}
```

---

## DBML Parser

The parser (`internal/dbml/parser.go`) handles:

- Table definitions with columns, types, constraints
- Primary keys, unique constraints, not null, defaults
- Foreign key references with direction indicators (`<`, `>`)
- Enum definitions
- Indexes (including unique composite indexes)
- Table and column notes/comments
- Project-level metadata

### Output: SQL

Generates:
- `CREATE TABLE` statements with proper column types
- Column constraints (PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT)
- `ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY` for references
- Proper quoting of string defaults

### Output: Mermaid

Generates:
- `erDiagram` syntax
- Tables with PK/UK/NOT NULL markers
- Relationship lines with cardinality

---

## HTTP Server

The server (`internal/server/server.go`) provides:

- RESTful JSON API
- Multipart form-data support for file uploads
- Health check endpoint
- Graceful shutdown on SIGINT/SIGTERM
- Structured logging via slog

---

## Dependencies

Before adding a dependency:
1. Check whether the standard library can solve the problem.
2. Check whether the dependency is actively maintained.
3. Check its licence.
4. Check its size and transitive dependencies.
5. Check whether it meaningfully improves the project.

Current dependencies:
- `github.com/spf13/cobra` — CLI framework
- `github.com/gorilla/mux` — HTTP routing
- `gopkg.in/yaml.v3` — YAML parsing (if needed)

Avoid dependency creep.

---

## Testing

Tests should focus on behaviour rather than implementation details.

Important areas:
- DBML parsing (tables, columns, references, enums, indexes)
- SQL generation (types, constraints, foreign keys)
- Mermaid generation (syntax, relationships)
- CLI commands
- HTTP API endpoints
- Error handling

Prefer table-driven Go tests.

Example:
```go
func TestParseTable(t *testing.T) {
    tests := []struct {
        name  string
        input string
        want  Table
    }{
        {
            name:  "simple table",
            input: "Table users { id integer [pk] }",
            want:  Table{Name: "users", Columns: []Column{{Name: "id", Type: "integer", IsPrimary: true}}},
        },
    }
    // ...
}
```

---

## Error Handling

Errors should be actionable.

Bad:
```text
Error
```

Better:
```text
dbml: failed to parse schema.dbml: line 5: unknown column type "foobar"
```

CLI errors should identify:
- what failed
- which file/path was involved
- enough context for the user to fix it

HTTP API errors return JSON with `error` field.

Do not silently ignore malformed input.

---

## Code Style

Follow idiomatic Go.

Prefer:
```go
const
```
when values are immutable.

Keep functions small and focused (≤ 30 lines).
Keep files small (≤ 200 lines).

Avoid premature abstraction.
Avoid interfaces unless they provide a real benefit.
Do not introduce a framework or architecture pattern simply because it is popular.

---

## Development Workflow

Before implementing a significant feature:
1. Understand the current architecture.
2. Inspect existing code.
3. Identify the smallest appropriate change.
4. Implement it.
5. Run tests.
6. Run formatting.
7. Run static analysis where available.
8. Verify generated output manually when the change affects SQL/Mermaid.

Typical commands:
```bash
make test
make lint
make build
make format
```

---

## Generated Output

Never commit generated output files unless the repository explicitly requires it.

Generated output should be reproducible from source:
```text
DBML source
    ↓
dbml all
    ↓
initial_schema.sql + database-erd.mmd + schema.svg
```

---

## Backwards Compatibility

Avoid breaking existing DBML projects unnecessarily.

When changing generated SQL or Mermaid:
- preserve normal DBML behaviour
- avoid unnecessary syntax changes
- avoid changing default semantics without reason
- consider migration implications

---

## Product Philosophy

`dbml` should remain:

> **Simple enough to understand, powerful enough to use, and small enough to trust.**

Avoid turning it into a full database modeling tool.
Avoid requiring configuration for things that can be inferred.
Avoid heavy dependencies.

The strongest version of `dbml` is:
```bash
dbml all schema.dbml
```
followed by:
```text
SQL schema, Mermaid ERD, and SVG diagram generated.
```

---

## Agent Instructions

When working on this repository:
1. Read this file before making changes.
2. Inspect the existing implementation before introducing architecture.
3. Prefer small, composable changes.
4. Preserve the separation between parser, generators, CLI, and HTTP.
5. Keep the default experience zero-config.
6. Keep the CLI and server in the same binary.
7. Test changes before declaring them complete.
8. Do not introduce unnecessary dependencies.
9. Do not redesign unrelated parts while implementing a feature.
10. If a requirement conflicts with this document, follow the explicit user requirement and update this document if the new direction is intended to be permanent.

## Definition of Done

A feature is not complete until:
- the implementation is finished
- tests pass
- the project builds (`make build`)
- generated output is valid (SQL executes, Mermaid renders)
- errors are handled appropriately
- documentation is updated when necessary
- the implementation follows the architecture and principles in this file