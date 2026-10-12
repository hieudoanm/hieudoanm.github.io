# dbml (Go)

> Convert Database Markup Language (DBML) files to SQL schemas, Mermaid ER
> diagrams, and SVG visualizations — CLI and HTTP server in one binary.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-static-blue)
![Go](https://img.shields.io/badge/go-1.23%2B-blue)

---

## Latest release

- **Version:** `app-headless-dbml-latest` — rebuilt automatically on every
  push to the default branch (see [PACKAGING](PACKAGING)).
- **What's new:** see the [ROADMAP](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the option that fits your environment.

### Prebuilt binary

| No  | Platform | Architecture | Download Link                            | Note                          |
| --- | -------- | ------------ | ---------------------------------------- | ----------------------------- |
| 1   | Linux    | amd64        | [Download `dbml`][download-linux-amd64]  | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `dbml`][download-linux-arm64]  | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `dbml`][download-darwin-amd64] | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `dbml`][download-darwin-arm64] | Static binary, no deps needed |

[download-linux-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-dbml-latest/app-headless-dbml-dbml-linux-amd64
[download-linux-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-dbml-latest/app-headless-dbml-dbml-linux-arm64
[download-darwin-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-dbml-latest/app-headless-dbml-dbml-darwin-amd64
[download-darwin-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-dbml-latest/app-headless-dbml-dbml-darwin-arm64

```bash
chmod +x dbml
./dbml sql schema.dbml -o schema.sql
```

> The pipeline cross-compiles all four platforms with `make build-all`; see
> [PACKAGING](PACKAGING). The binary is pure Go (no CGO) and ships as a
> standalone artifact.

### Build from source

Prefer to build it yourself? Clone, build, and use in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/headless/dbml/go
make build
./bin/dbml sql schema.dbml -o schema.sql
```

See [PACKAGING](PACKAGING) for the CI artifact pipeline and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## Getting started

```bash
# Generate SQL schema
./bin/dbml sql schema.dbml -o schema.sql

# Generate Mermaid ER diagram
./bin/dbml mermaid schema.dbml -o diagram.mmd

# Generate SVG diagram
./bin/dbml svg schema.dbml -o diagram.svg

# Generate all formats at once
./bin/dbml all schema.dbml --output-dir ./output

# Start HTTP server
./bin/dbml serve --port 8080
```

---

## About

dbml turns Database Markup Language (DBML) files into multiple output formats:

- **SQL** — PostgreSQL-compatible DDL with tables, constraints, indexes, foreign
  keys
- **Mermaid** — ER diagram syntax for documentation and rendering
- **SVG** — Vector graphics rendered directly in Go

The generated artifacts are usable in CI/CD pipelines, documentation, and
database migrations.

---

## Features

### Multiple output formats

- **SQL** — PostgreSQL-compatible DDL with CREATE TABLE, constraints, and foreign
  keys
- **Mermaid** — ER diagram syntax for GitHub/GitLab markdown, Notion, Obsidian,
  VS Code
- **SVG** — Vector graphics rendered directly in Go

### CLI + HTTP Server

- **CLI** — Command-line tool for one-off conversions and scripts
- **HTTP Server** — REST API for programmatic conversion (JSON and multipart
  form-data)

### DBML support

- Tables with columns, types, constraints
- Primary keys, unique constraints, not null, defaults
- Foreign key references with direction indicators
- Enum definitions
- Indexes (including unique composite indexes)
- Table and column notes/comments
- Project-level metadata

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](../LICENSE).
