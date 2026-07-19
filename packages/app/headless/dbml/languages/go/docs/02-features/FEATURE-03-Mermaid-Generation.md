# dbml (Go) — FEATURE-03: Mermaid Generation

Renders the parsed AST as Mermaid `erDiagram` syntax for documentation. Priority: **P0** (core platform, [`02-features.md`](../02-features.md) §2). dbml is a software demonstration, not a full database modeling tool.

## 1. User-visible behaviour

- `dbml mermaid schema.dbml` writes a `.mmd` file starting with `erDiagram`, one indented block per table listing every column, and one relationship line per parsed reference.
- Column rows carry key markers: `PK` for primary keys, `UK` for unique columns, and a `NOT NULL` flag where applicable, followed by the mapped SQL type and the column name.
- Relationship lines take the form `<referenced_table> ||--o{ <referring_table> : "<reference_name>"`, using the reference name from the `Ref:` line as the label.
- Output uses the same type mapping as SQL generation, so column types are consistent across formats.

## 2. Inputs

| Input | Provided by |
| ----- | ----------- |
| `*Project` AST | FEATURE-01 parser |
| DBML file (default `schema.dbml`) | `dbml mermaid [input.dbml]` |
| Output path (`-o`, default `database-erd.mmd`) | `dbml mermaid` flag |
| Output directory (`-d`, default `.`) | `dbml all` flag |
| HTTP convert endpoints with `formats` containing `mermaid` | FEATURE-06 |
| MCP tool `dbml_mermaid` | FEATURE-07 |

## 3. Outputs

- Mermaid text: `erDiagram`, then per table `    <name> {` + column rows + `    }`, then relationship lines ([`05-data-model.md`](../05-data-model.md) §4, `.mmd`).
- CLI success line on stdout: `Generated Mermaid ER diagram: <path>`.
- HTTP/MCP transports return the same text in their response payloads.

## 4. States

`idle → parsing → generated → complete`, with `error` reachable from any non-terminal state ([`05-data-model.md`](../05-data-model.md) §5). Generation itself is a pure string render; failures belong to parsing (before) or file writing (after).

## 5. Edge cases

- **Fixed cardinality** — every relationship renders as `||--o{`; the parser's `<`/`>` direction decides which table appears on which side, but the cardinality symbols are not derived from the source.
- **Relationships to unknown tables** — a `Ref:` naming a table that was never parsed still produces a line; unlike the SVG generator, Mermaid generation does not skip missing endpoints.
- **Enums** — parsed `Enum` blocks are not rendered in Mermaid output; they appear only in SVG output today.
- **Non-unique columns** — carry no marker (only `PK` and `UK` are emitted).
- **Unknown or custom column types** — uppercased unchanged and inserted as-is.
- **Empty schema** — an AST with no tables and no references produces just `erDiagram` plus a blank line.
- **Notes and comments** — captured by the parser but not emitted.

## 6. Acceptance conditions

- Given a fixture with tables, primary keys, unique columns, and not-null columns, the output contains one `erDiagram` with correctly marked rows.
- Given a fixture with a named `Ref:`, the output contains exactly one relationship line naming both tables and the reference label.
- The output renders in GitHub/GitLab Markdown with mermaid-cli or any standard Mermaid renderer, with no external tool invoked by dbml itself (success criterion [`00-overview.md`](../00-overview.md) §11; rejection of mermaid-cli [`08-tech-stack.md`](../08-tech-stack.md) §4.5).
- Generation is deterministic and unit-tested with table-driven tests over real DBML input ([`09-testing-strategy.md`](../09-testing-strategy.md) §3).

## Cross-references

- Requirements: [`../01-requirements.md`](../01-requirements.md) · [`FR-003`](../01-requirements/functional-requirements.md)
- Feature index: [`02-features.md`](../02-features.md)
- Sibling features: [`FEATURE-01-DBML-Parsing.md`](./FEATURE-01-DBML-Parsing.md) · [`FEATURE-04-SVG-Generation.md`](./FEATURE-04-SVG-Generation.md)
- User stories: [`03-user-stories.md`](../03-user-stories.md) — US-003
- Data model: [`05-data-model.md`](../05-data-model.md)
- Testing strategy: [`09-testing-strategy.md`](../09-testing-strategy.md)
