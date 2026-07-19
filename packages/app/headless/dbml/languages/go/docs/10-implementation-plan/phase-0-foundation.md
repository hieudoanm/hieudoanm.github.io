# dbml (Go) — Phase 0: Foundation

## Goal

Establish the Go module, the Cobra CLI scaffold, project conventions, and the first working slice of the DBML parser. Every later phase builds on this module.

Status: complete (implementation snapshot 2026-10-17, see [`docs/README.md`](../README.md) §8).

## Deliverables

| Deliverable | Location |
| ----------- | -------- |
| Go module (`module dbml`, Go 1.27.2) | `go.mod` |
| Entry point | `main.go` |
| Cobra root command (help, version) | `cmd/root.go` |
| Makefile (`format`, `lint`, `test`, `build`, `build-all`, `coverage`, `tidy`, `install`, `clean`) | `Makefile` |
| DBML parser | `internal/dbml/parser.go` |
| Contributor conventions | `AGENTS.md` |

## Scope

- Layout follows the `cmd/` + `internal/` conventions; parsing, generation, and transport live in separate packages from day one.
- The parser covers tables, columns, types, constraints (`pk`, `unique`, `not null`, `default`), foreign-key references with direction indicators (`<`, `>`), enums, indexes, notes, and project metadata.
- Errors are actionable: they identify what failed, which file was involved, and enough context to fix it — for example `dbml: failed to parse schema.dbml: line 5: unknown column type "foobar"`.

## Acceptance criteria

- [ ] `go build ./...` succeeds and `./bin/dbml --help` lists the CLI commands.
- [ ] `make format`, `make lint` (`go vet ./...`), and `make test` are clean.
- [ ] `make build` produces `bin/dbml` with `CGO_ENABLED=0`.
- [ ] The parser package imports nothing from `cmd/`, `internal/server`, or `internal/mcp`.

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Architecture: [`04-architecture.md`](../04-architecture.md)
- Tech stack: [`08-tech-stack.md`](../08-tech-stack.md)
