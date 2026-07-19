# dbml (Go) — FEATURE-01: DBML Parsing

Reads Database Markup Language source and builds the internal AST that SQL, Mermaid, and SVG generation consume. Priority: **P0** (core platform, [`02-features.md`](../02-features.md) §2). dbml is a software demonstration, not a full database modeling tool.

## 1. User-visible behaviour

- Point any conversion command at a `.dbml` file (CLI), or send DBML as a string (HTTP, MCP), and the parser produces a single `Project` AST describing the whole schema.
- Recognised constructs: `Project` header lines, `Table` blocks with columns and bracket settings, `Enum` blocks, `Index` lines inside tables, top-level `Ref:` relationships, and `Note:` comments.
- Column settings understood: `pk`/`primary`, `unique`, `not_null`/`notnull`, `null`, `default: <value>`, `ref: <table>.<column>`, `note: <text>`, and `increment`. Unrecognised settings are retained on the column rather than rejected.
- Blank lines and `//` comments are skipped everywhere.
- The parser exposes no transport detail; CLI, HTTP, and MCP get the same AST from the same input.

## 2. Inputs

| Input | Provided by |
| ----- | ----------- |
| DBML file path | CLI (positional argument, default `schema.dbml`) |
| DBML string | HTTP convert endpoints, MCP `dbml` tool argument |
| `Project <name> {` | project name |
| `Table <name> { ... }` | table block: columns, `Index` lines, `Note:` |
| `Enum <name> { ... }` | enum block: values, one per line |
| `Ref: <name> <table>.<column> < <table>.<column>` | reference with direction `<` or `>` |
| Column line `<name> <type> [settings]` | column with constraints and settings |

## 3. Outputs

- A `*Project` AST ([`05-data-model.md`](../05-data-model.md) §2): project name, tables with columns and indexes, enums, references with endpoints resolved to referenced/referring pair, and captured notes/comments.
- On failure, an error instead of a project: unreadable file (`open file: ...`), or scanner failure (`scan error: ...`).
- No files, network, or transport side effects — parsing itself only reads its input ([`04-architecture.md`](../04-architecture.md) §2).

## 4. States

Per [`05-data-model.md`](../05-data-model.md) §5 the conversion moves `idle → parsing → generated → complete`, with any non-terminal state able to move to `error`. A parse failure ends the run in `error` before any generator runs; a successful parse is the precondition for every downstream feature (FEATURE-02, FEATURE-03, FEATURE-04).

## 5. Edge cases

- **Unrecognised lines** — a line the parser cannot classify is skipped instead of rejected. The parser is tolerant, so structurally broken input can yield a partial or empty schema rather than an error (see FEATURE-08 and US-010).
- **Unterminated block** — a `Table` or `Enum` block not closed by `}` before end of input, and not followed by another block header, is dropped; blocks are committed on `}` or when the next block starts.
- **One-line block** — `Table users { id integer [pk] }` on a single line yields an empty schema and a successful run with header-only output: a closing `}` is only recognised on its own line, so the block is never committed and is dropped at end of input. Multi-line blocks parse correctly on every transport; note that the one-line form appears in the request examples of [`06-api-specification.md`](../06-api-specification.md) §6 but does not convert as shown.
- **Column without a type** — a line with fewer than two whitespace-separated tokens produces no column.
- **Unnamed reference** — the reference form requires a name (`Ref: fk_name a.c > b.c`); an unnamed `Ref: a.c > b.c` line does not match and is skipped.
- **Direction** — `>` makes the right-hand table the referenced side of the relationship; `<` makes the left-hand table the referenced side.
- **Column-level `ref:` and notes** — captured on the AST (`RefTable`, comments), but relationship generation uses only top-level `Ref:` lines, and notes are not emitted by any generator today.
- **Oversized line** — a single line beyond the scanner buffer fails with `scan error: ...`.
- **Missing file** — fails with `parse DBML: open file: ...` naming the path.

## 6. Acceptance conditions

- Fixture DBML with tables, columns, constraints, enums, indexes, references, and notes populates the corresponding AST fields, tested with table-driven tests over real DBML input ([`09-testing-strategy.md`](../09-testing-strategy.md) §3).
- The parser imports nothing from `cmd/`, `internal/server`, or `internal/mcp` ([`04-architecture.md`](../04-architecture.md) §2).
- The same DBML string parsed through CLI, HTTP, or MCP yields identical generator output.
- A missing input file fails with an actionable error naming the file and the failure (US-008, US-010).
- Parser behaviour is documented here and this documentation is updated with any grammar change ([`02-features.md`](../02-features.md) §3).

## Cross-references

- Requirements: [`../01-requirements.md`](../01-requirements.md) · [`FR-001`](../01-requirements/functional-requirements.md)
- Feature index: [`02-features.md`](../02-features.md)
- User stories: [`03-user-stories.md`](../03-user-stories.md) — US-001, US-010
- Architecture: [`04-architecture.md`](../04-architecture.md)
- Data model: [`05-data-model.md`](../05-data-model.md)
- Testing strategy: [`09-testing-strategy.md`](../09-testing-strategy.md)
