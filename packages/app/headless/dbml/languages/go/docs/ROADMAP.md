# Roadmap

> Phased roadmap. Shipped items map to the dbml feature surface described
> in [ARCHITECTURE](ARCHITECTURE) and [DOWNLOADS](DOWNLOADS).

## Phase 1 — Foundation (shipped)

- [x] Go module layout (`main.go` + `cmd/` + `internal/dbml/` + `internal/server/`)
- [x] Cobra CLI (`sql`, `mermaid`, `svg`, `all`, `serve`)
- [x] DBML parser for tables, columns, constraints
- [x] SQL generator (PostgreSQL-compatible DDL)
- [x] Mermaid ER diagram generator
- [x] HTTP server with REST API (JSON + multipart form-data)
- [x] Graceful shutdown on SIGINT/SIGTERM

## Phase 2 — DBML features (shipped)

- [x] Primary keys, unique constraints, not null, defaults
- [x] Foreign key references with direction indicators (`<`, `>`)
- [x] Enum definitions
- [x] Indexes (single and composite, unique)
- [x] Table and column notes/comments
- [x] Project-level metadata (database type, project name)
- [x] Direct SVG generation without external mermaid-cli (Go library)

## Phase 3 — CLI polish (shipped)

- [x] `all` command to generate all formats at once
- [x] Custom output file paths via `-o` flag
- [x] Custom output directory via `--output-dir` flag
- [x] Configurable HTTP server port via `--port` flag
- [x] Health check endpoint (`/health`)
- [x] Structured logging via slog
- [x] Actionable error messages with file/path context

## Phase 4 — CI & packaging (shipped)

- [x] Makefile with format, lint, test, build, build-all, coverage, tidy, install,
      clean targets
- [x] Cross-compilation for 4 platforms (linux/amd64, linux/arm64, darwin/amd64,
      darwin/arm64)
- [x] Dockerfile for container image
- [x] CI pipeline with format, lint, test, build-all, and rolling GitHub Release
- [x] Rolling release tag `app-headless-dbml-latest`

## Phase 5 — Enhanced DBML support

- [ ] More column types (JSON, JSONB, UUID, arrays, custom types)
- [ ] Composite primary keys
- [ ] Check constraints
- [ ] Trigger definitions
- [ ] View definitions
- [ ] Stored procedures/functions
- [ ] Table inheritance (PostgreSQL-specific)
- [ ] Multiple database dialects (MySQL, SQLite, SQL Server)

## Phase 6 — Enhanced output formats

- [ ] More Mermaid diagram types (class diagram, sequence diagram)
- [ ] PlantUML output
- [ ] Graphviz DOT output
- [ ] Markdown documentation with embedded diagrams
- [ ] HTML documentation site generator

## Phase 7 — CLI enhancements

- [ ] Watch mode for live conversion on file changes
- [ ] Batch processing (convert multiple DBML files)
- [ ] Diff mode (compare two DBML schemas)
- [ ] Migration mode (generate SQL migrations between schema versions)
- [ ] Validation mode (check DBML syntax without generating output)
- [ ] Shell completion (bash, zsh, fish, powershell)

## Phase 8 — HTTP API enhancements

- [ ] WebSocket support for real-time conversion
- [ ] Rate limiting
- [ ] Authentication/authorization
- [ ] API versioning (v2)
- [ ] OpenAPI/Swagger specification
- [ ] GraphQL API
- [ ] Webhook support for conversion events

## Phase 9 — Testing & tooling

- [ ] Comprehensive test coverage for parser edge cases
- [ ] Integration tests for HTTP API
- [ ] Performance benchmarks
- [ ] Fuzzing for parser robustness
- [ ] VS Code extension for DBML syntax highlighting
- [ ] Language server protocol (LSP) support

## Phase 10 — Ecosystem

- [ ] DBML format validator online tool
- [ ] Online DBML editor with live preview
- [ ] Integration with popular ORMs (Prisma, Sequelize, TypeORM)
- [ ] Integration with schema management tools (Liquibase, Flyway)
- [ ] DBML to ERD reverse engineering (from existing databases)
- [ ] Community-contributed DBML example libraries
