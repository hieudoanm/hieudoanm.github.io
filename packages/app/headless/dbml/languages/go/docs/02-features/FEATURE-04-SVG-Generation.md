# dbml (Go) — FEATURE-04: SVG Generation

Renders the parsed AST as a vector ER diagram directly in Go, with no external rendering tool. Priority: **P0** (core platform, [`02-features.md`](../02-features.md) §2). dbml is a software demonstration, not a full database modeling tool.

## 1. User-visible behaviour

- `dbml svg schema.dbml` writes a self-contained `.svg` document: XML declaration, `<svg>` root with a computed canvas size, table and enum boxes, and relationship curves between them.
- Tables render as boxes with a dark header (table name in white monospace) and one row per column: `PK`/`UK` key badge, column name, and right-aligned SQL type (with a `NOT NULL` suffix where applicable). Primary-key rows are highlighted.
- Enums render as narrower boxes titled `enum <name>` with one row per value.
- Boxes are placed on a fixed three-column grid (48px margin, 90px horizontal gap, 70px vertical gap); the canvas grows with content.
- Relationships are drawn as purple cubic-Bézier curves with a dot marker at the referring end and an arrow marker at the referenced end, anchored to the column's row where possible.

## 2. Inputs

| Input | Provided by |
| ----- | ----------- |
| `*Project` AST | FEATURE-01 parser |
| DBML file (default `schema.dbml`) | `dbml svg [input.dbml]` |
| Output path (`-o`, default `schema.svg`) | `dbml svg` flag |
| Output directory (`-d`, default `.`) | `dbml all` flag |
| HTTP convert endpoints with `formats` containing `svg` | FEATURE-06 |
| MCP tool `dbml_svg` | FEATURE-07 |

## 3. Outputs

- An SVG document as described by [`05-data-model.md`](../05-data-model.md) §4 (`.svg`): `<?xml ...?>` declaration, white background, embedded `<defs>` markers, boxes, and reference paths, all text XML-escaped (`&`, `<`, `>`, `'`, `"`).
- CLI success line on stdout: `Generated SVG diagram: <path>`.
- HTTP/MCP transports return the same document in their response payloads.

## 4. States

`idle → parsing → generated → complete`, with `error` reachable from any non-terminal state ([`05-data-model.md`](../05-data-model.md) §5). Rendering is pure; only the CLI write step can fail afterwards (`write output: ...`).

## 5. Edge cases

- **Empty schema** — an AST with no tables, enums, or references still produces a well-formed document with a zero-size canvas (covered by `TestToSVGEmptyProject`).
- **Reference to an unknown table** — the line is skipped entirely when either endpoint has no box.
- **Reference to an unknown column** — the curve anchors at the box header row instead of a column row.
- **Degenerate curve** — a link whose endpoints coincide produces no path.
- **Enums** — included in the layout (unlike SQL and Mermaid output); enum values are drawn as rows.
- **Unknown or custom column types** — uppercased unchanged, exactly as in SQL and Mermaid output.
- **Special characters in names** — XML-escaped, so a column named `name <div>` renders as `name &lt;div&gt;` and stays well-formed.
- **Text length** — titles and column text are not truncated; layout uses fixed box widths (230px tables, 170px enums).
- **Notes and comments** — captured by the parser but not drawn.

## 6. Acceptance conditions

- The output parses as well-formed XML (asserted with `encoding/xml` in tests, per [`09-testing-strategy.md`](../09-testing-strategy.md) §3).
- Given a fixture with tables, keys, enums, and valid references, the document contains the table names, column names, `PK`/`UK` markers, enum values, and relationship paths with arrow markers.
- Given a reference naming a missing table, no relationship path is drawn.
- No external process (Graphviz, mermaid-cli, a browser) is invoked ([`08-tech-stack.md`](../08-tech-stack.md) §4.5), so generation works identically on every supported platform.

## Cross-references

- Requirements: [`../01-requirements.md`](../01-requirements.md) · [`FR-004`](../01-requirements/functional-requirements.md)
- Feature index: [`02-features.md`](../02-features.md)
- Sibling features: [`FEATURE-01-DBML-Parsing.md`](./FEATURE-01-DBML-Parsing.md) · [`FEATURE-03-Mermaid-Generation.md`](./FEATURE-03-Mermaid-Generation.md)
- User stories: [`03-user-stories.md`](../03-user-stories.md) — US-004
- Data model: [`05-data-model.md`](../05-data-model.md)
- Testing strategy: [`09-testing-strategy.md`](../09-testing-strategy.md)
