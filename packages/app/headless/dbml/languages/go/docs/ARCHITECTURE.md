# Architecture

## Tech Stack

| Layer        | Choice                             |
| ------------ | ---------------------------------- |
| Language     | Go 1.23+ (module `dbml`)           |
| CLI          | `github.com/spf13/cobra`           |
| HTTP routing | `github.com/gorilla/mux`           |
| Parsing      | Custom DBML parser (stdlib)        |
| Rendering    | Custom SQL/Mermaid generators      |
| SVG export   | Direct SVG generator (stdlib)      |
| Testing      | Standard `go test`, table-driven   |

No external services. The binary is pure Go (no CGO) — it ships as a standalone
artifact with minimal runtime requirements. SVG rendering is implemented in Go
with the standard library only.

## Directory Structure

```txt
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

## Pipeline

```txt
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
CLI Commands (cmd/) or HTTP Handlers (internal/server/)
    └─ Write files or return JSON
```

## Modules

### DBML Parser (`internal/dbml/parser.go`)

The parser handles:

- **Table definitions** — tables with columns, types, constraints
- **Column constraints** — primary keys (`pk`), unique (`unique`), not null
  (`not_null`), default values (`default:`)
- **Foreign key references** — with direction indicators (`<`, `>`)
- **Enum definitions** — named enum types with values
- **Indexes** — single and composite indexes, unique indexes
- **Notes/comments** — table and column notes
- **Project metadata** — database type, project name

#### Output: SQL

Generates PostgreSQL-compatible SQL:

- `CREATE TABLE` statements with proper column types
- Column constraints (PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT)
- `ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY` for references
- Proper quoting of string defaults

#### Output: Mermaid

Generates Mermaid ER diagram syntax:

- `erDiagram` syntax
- Tables with PK/UK/NOT NULL markers
- Relationship lines with cardinality

### CLI Commands (`cmd/`)

All commands are thin Cobra wrappers that delegate to the parser and generators:

- `sql` — reads DBML, generates SQL, writes to file
- `mermaid` — reads DBML, generates Mermaid, writes to file
- `svg` — reads DBML, renders an SVG ER diagram, writes to file
- `all` — runs sql + mermaid + svg in sequence
- `serve` — starts HTTP server with REST API

### HTTP Server (`internal/server/server.go`)

The server provides:

- RESTful JSON API
- Multipart form-data support for file uploads
- Health check endpoint
- Graceful shutdown on SIGINT/SIGTERM
- Structured logging via slog

#### Endpoints

| Method | Endpoint                  | Description                      |
| ------ | ------------------------- | -------------------------------- |
| GET    | `/health`                 | Health check                     |
| POST   | `/api/v1/convert`         | Convert DBML to multiple formats |
| POST   | `/api/v1/convert/sql`     | Convert DBML to SQL only         |
| POST   | `/api/v1/convert/mermaid` | Convert DBML to Mermaid only     |

#### Request formats

- JSON body with `dbml` string and `formats` array
- Multipart form-data with `file` field (DBML file upload)
- Multipart form-data with `dbml` field (DBML content)

#### Response

JSON with `sql`, `mermaid`, and `svg` fields (empty strings if not requested).

## Configuration

dbml reads no environment variables and writes no config files. Everything is
expressed through CLI flags:

| Flag (command)              | Default        | Purpose                          |
| --------------------------- | -------------- | -------------------------------- |
| `-o` (sql, mermaid, svg)    | auto-generated | Output file path                 |
| `-d` / `--output-dir` (all) | `.`            | Output directory for all formats |
| `--port` (serve)            | `8080`         | HTTP server listen port          |

## Dependencies

Current dependencies:

- `github.com/spf13/cobra` — CLI framework
- `github.com/gorilla/mux` — HTTP routing

Before adding a dependency:

1. Check whether the standard library can solve the problem.
2. Check whether the dependency is actively maintained.
3. Check its licence.
4. Check its size and transitive dependencies.
5. Check whether it meaningfully improves the project.

Avoid dependency creep.
