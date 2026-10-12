# dbml

A Go-based CLI tool and HTTP server to convert Database Markup Language (DBML) into SQL schemas, Mermaid ER diagrams, and SVG visualizations.

## Features

- **CLI** — Convert DBML files to SQL, Mermaid, SVG from command line
- **HTTP Server** — REST API for programmatic conversion
- **Multiple Formats** — SQL (PostgreSQL), Mermaid ERD, SVG
- **Zero Config** — Works out of the box with sensible defaults
- **Single Binary** — No runtime dependencies

## Installation

### From Source

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io
cd packages/app/headless/dbml/languages/go
make build
```

The binary will be at `bin/dbml`.

### Docker

```bash
docker build -t dbml .
docker run -p 8080:8080 dbml serve --port 8080
```

## Quick Start

```bash
# Generate SQL schema
dbml sql schema.dbml -o schema.sql

# Generate Mermaid ER diagram
dbml mermaid schema.dbml -o diagram.mmd

# Generate SVG diagram
dbml svg schema.dbml -o diagram.svg

# Generate all formats at once
dbml all schema.dbml --output-dir ./output

# Start HTTP server
dbml serve --port 8080
```

## CLI Usage

```
dbml [command] [flags]

Commands:
  sql       Generate SQL schema from DBML
  mermaid   Generate Mermaid ER diagram from DBML
  svg       Generate SVG ER diagram from DBML
  all       Generate SQL, Mermaid, and SVG from DBML
  serve     Start HTTP server for DBML conversion API
  help      Help about any command

Flags:
  -h, --help      help for dbml
  -v, --version   version for dbml
```

### SQL Generation

```bash
dbml sql schema.dbml                    # Output: initial_schema.sql
dbml sql schema.dbml -o custom.sql      # Custom output file
```

Generates PostgreSQL-compatible SQL with:
- CREATE TABLE statements
- Column types and constraints (PK, UNIQUE, NOT NULL, DEFAULT)
- Foreign key constraints via ALTER TABLE

### Mermaid Generation

```bash
dbml mermaid schema.dbml                # Output: database-erd.mmd
dbml mermaid schema.dbml -o custom.mmd  # Custom output file
```

Generates Mermaid ER diagram syntax for use with:
- GitHub/GitLab markdown
- Notion, Obsidian, VS Code
- Mermaid CLI for SVG/PNG

### SVG Generation

```bash
dbml svg schema.dbml                    # Output: schema.svg
dbml svg schema.dbml -o custom.svg      # Custom output file
```

Generates an SVG ER diagram directly from DBML — no external tooling required.
Tables, columns, keys, enums, and foreign-key relationships are rendered in Go.

### Generate All Formats

```bash
dbml all schema.dbml                    # Output to current directory
dbml all schema.dbml -d ./output        # Custom output directory
```

Outputs:
- `initial_schema.sql`
- `database-erd.mmd`
- `schema.svg`

## HTTP API Server

Start the server:

```bash
dbml serve --port 8080
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/v1/convert` | Convert DBML to multiple formats |
| POST | `/api/v1/convert/sql` | Convert DBML to SQL only |
| POST | `/api/v1/convert/mermaid` | Convert DBML to Mermaid only |

### Request (JSON)

```bash
curl -X POST http://localhost:8080/api/v1/convert \
  -H "Content-Type: application/json" \
  -d '{
    "dbml": "Table users { id integer [pk] email varchar(255) [unique] }",
    "formats": ["sql", "mermaid"]
  }'
```

Response:
```json
{
  "sql": "CREATE TABLE users (\n    id INTEGER PRIMARY KEY,\n    email VARCHAR(255) UNIQUE\n);\n",
  "mermaid": "erDiagram\n    users {\n        PK INTEGER id\n        UK VARCHAR(255) email\n    }\n",
  "svg": "<?xml version=\"1.0\"...<svg ...>...</svg>\n"
}
```

### Request (File Upload)

```bash
curl -X POST http://localhost:8080/api/v1/convert \
  -F "file=@schema.dbml"
```

### Request (Form Field)

```bash
curl -X POST http://localhost:8080/api/v1/convert \
  -F "dbml=Table users { id integer [pk] }"
```

## DBML Syntax Support

The parser supports standard DBML syntax:

```dbml
Project MyDatabase {
  database_type: 'PostgreSQL'
}

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
  status varchar(20) [not_null, default: 'draft']
}

Enum post_status {
  draft
  published
  archived
}

Ref: user_posts users.id < posts.user_id

Indexes {
  (users.email) [unique]
  (posts.user_id)
}
```

Supported features:
- Tables with columns, types, constraints
- Primary keys (`pk`), unique (`unique`), not null (`not_null`)
- Default values (`default: value`)
- Foreign key references (`ref: > table.column`)
- Enums
- Indexes (single and composite, unique)
- Notes/comments

## Development

### Prerequisites

- Go 1.23+
- Make

### Commands

```bash
make help        # Show all targets
make build       # Build binary to bin/dbml
make test        # Run tests
make lint        # Run go vet
make format      # Run go fmt
make tidy        # Run go mod tidy
make clean       # Remove build artifacts
make build-all   # Cross-compile for all platforms
make install     # Install to ~/bin
```

### Project Structure

```
dbml/
├── cmd/              # Cobra commands
│   ├── root.go       # Root command
│   ├── sql.go        # SQL generation
│   ├── mermaid.go    # Mermaid generation
│   ├── svg.go        # SVG generation
│   ├── all.go        # All formats
│   └── serve.go      # HTTP server
├── internal/
│   ├── dbml/         # DBML parser + generators
│   │   └── parser.go
│   └── server/       # HTTP server
│       └── server.go
├── bin/              # Build output
├── main.go           # Entry point
├── Makefile
├── Dockerfile
└── go.mod
```

## License

MIT