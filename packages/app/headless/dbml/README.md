# DBML

Database Markup Language (DBML) — a Go CLI and HTTP server to convert DBML into SQL schemas, Mermaid ER diagrams, and SVG visualizations.

## About

DBML is a simple, readable DSL for describing database schemas. This implementation provides both a command-line interface and a REST API server for converting DBML files into multiple output formats.

**Write DBML. Run one command. Get SQL, diagrams, and API.**

## Features

- **CLI** — Convert DBML files to SQL, Mermaid, SVG from command line
- **HTTP Server** — REST API for programmatic conversion
- **Multiple Formats** — SQL (PostgreSQL), Mermaid ERD, SVG
- **Zero Config** — Works out of the box with sensible defaults
- **Single Binary** — No runtime dependencies

## Getting Started

```bash
cd languages/go
make build

./bin/dbml sql examples/schema.dbml -o examples/schema.sql
./bin/dbml mermaid examples/schema.dbml -o examples/diagram.mmd
./bin/dbml svg examples/schema.dbml -o examples/schema.svg
./bin/dbml all examples/schema.dbml
./bin/dbml serve --port 8080
```

## Usage

### CLI Commands

| Command                    | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| `dbml sql <file>`          | Generate SQL schema from DBML                         |
| `dbml mermaid <file>`      | Generate Mermaid ER diagram from DBML                 |
| `dbml svg <file>`          | Generate SVG ER diagram from DBML                     |
| `dbml all <file>`          | Generate all formats at once                          |
| `dbml serve [--port PORT]` | Start HTTP server for DBML conversion API             |

### HTTP API

Start the server:

```bash
dbml serve --port 8080
```

Endpoints:

- `GET /health` — Health check
- `POST /api/v1/convert` — Convert DBML to multiple formats (JSON, multipart/form-data, file upload)
- `POST /api/v1/convert/sql` — Convert DBML to SQL only
- `POST /api/v1/convert/mermaid` — Convert DBML to Mermaid only

Example:

```bash
curl -X POST http://localhost:8080/api/v1/convert \
  -H "Content-Type: application/json" \
  -d '{"dbml": "Table users { id integer [pk] }", "formats": ["sql", "mermaid"]}'
```

## Documentation

- [Go Implementation](languages/go/README.md) — Detailed CLI and API documentation
- [Examples](examples/) — Sample DBML files and generated outputs

## Examples

```dbml
Table users {
  id integer [pk, increment]
  email varchar(255) [unique, not_null]
  name varchar(100) [not_null]
  created_at timestamp [not_null, default: `now()`]
}

Table posts {
  id integer [pk, increment]
  user_id integer [not_null, ref: > users.id]
  title varchar(200) [not_null]
  content text
}
```

Becomes SQL DDL, Mermaid ERD, and SVG diagrams in seconds.
