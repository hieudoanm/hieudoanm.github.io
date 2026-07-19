# dbml (Go) — Phase 1: Data Model

## Goal

Turn parsed DBML into an internal AST and generate PostgreSQL-compatible DDL from that AST.

Status: complete (implementation snapshot 2026-10-17, see [`docs/README.md`](../README.md) §8).

## Deliverables

| Deliverable | Location |
| ----------- | -------- |
| AST: tables, columns, constraints, enums, indexes, notes | `internal/dbml/parser.go` |
| SQL generator (`Project.ToSQL()`) | `internal/dbml/parser.go` |
| Table-driven parser and SQL tests | alongside the package |

## Generated SQL

| DBML construct | Generated output |
| -------------- | ---------------- |
| Table + columns | `CREATE TABLE` with column types |
| `pk`, `unique`, `not null`, `default` | Column-level constraints; string defaults quoted |
| `Ref` definitions | `ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY` |
| `Indexes` | Index statements, including unique composite indexes |
| `Enum` definitions | Usable as column types in `CREATE TABLE` |

## Design constraints

- The generator walks the AST only; it never re-parses DBML.
- Backwards compatibility applies to generated SQL: preserve normal DBML behaviour, avoid unnecessary syntax changes, and keep default semantics stable (policy in `AGENTS.md`).
- Output stays PostgreSQL-compatible; additional database dialects are explicitly out of scope for this phase and listed as a P1 enhancement in [`00-overview.md`](../00-overview.md) §4.

## Acceptance criteria

- [ ] Tables, columns, constraints, enums, indexes, and notes parse into the AST.
- [ ] Generated SQL executes against PostgreSQL for the standard fixtures.
- [ ] Foreign keys are emitted as named `ALTER TABLE` constraints.
- [ ] Table-driven tests cover types, constraints, and foreign keys (see [`09-testing-strategy.md`](../09-testing-strategy.md)).

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Data model: [`05-data-model.md`](../05-data-model.md)
- Requirements: [`01-requirements.md`](../01-requirements.md)
