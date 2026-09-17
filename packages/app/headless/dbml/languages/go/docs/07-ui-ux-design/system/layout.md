# dbml (Go) — Design System: Layout

dbml has no navbar, sidebar, or page grid — there is no web application. Layout applies to three real surfaces: the SVG diagram canvas, the CLI terminal output, and the HTTP JSON envelope.

## 1. SVG diagram layout

Boxes (tables and enums) are placed on a fixed grid by `placeItems` in `internal/dbml/svg.go`:

- Start at `(svgMargin, svgMargin)` = `(48, 48)`.
- Place boxes left to right; after every `svgCols` (3) boxes, wrap to a new row.
- A new row starts at `y += tallest box in the previous row + svgGapY` (70).
- Horizontal step is `box width + svgGapX` (90).
- Box height is `svgHeaderH` (34) + `rows × svgRowH` (27).
- Canvas size (`canvasSize`) is the bounding box of every item plus the 48px margin on all sides, written to both the `width`/`height` attributes and the `viewBox`.

## 2. SVG draw order

Order matters for readability:

1. `<defs>` markers (dot, arrow) and the background `<rect>`.
2. Reference paths — drawn under boxes so lines never cross glyph text.
3. Table and enum boxes, in item order.

References route between box edges: side-by-side boxes link edge-to-edge horizontally; stacked boxes link bottom-to-top through the row gap (`drawReference` in `svg_draw.go`).

## 3. CLI layout

CLI output is line-oriented, one concern per line:

- Success: a single confirmation line per written artifact (`Generated SQL schema: <path>`).
- Errors: a single `dbml: ...` line on stderr.
- Help: Cobra-generated from command `Short`/`Long` strings in `cmd/`.

The `serve` startup box (`cmd/box.go`) is the only composed CLI layout: a rounded Unicode frame whose inner width is computed from the widest row, with label and URL columns padded to align. Nothing assumes a fixed terminal width; the box adapts to its content, not the window.

## 4. HTTP layout

JSON responses have no visual layout. The envelope shapes are fixed:

| Envelope          | Shape                                              |
| ----------------- | -------------------------------------------------- |
| Convert success   | `{ "sql": ..., "mermaid": ..., "svg": ... }`       |
| Error             | `{ "error": "message" }`                           |
| Health            | `{ "status": "ok", "version": "dev" }`             |

`GET /api/v1/docs` serves the third-party Swagger UI page, which owns its own responsive layout.

## 5. Fixed-width caveats

Table and enum boxes have fixed widths (230px / 170px). Long column types are right-aligned inside that width; very long names or types can overflow the box because the renderer does not measure or truncate text. Changing box widths is a token change — see [`design-tokens.md`](design-tokens.md).

## Cross-references

- UI/UX overview: [`../07-ui-ux-design.md`](../../07-ui-ux-design.md)
- Architecture (SVG generator, CLI): [`../04-architecture.md`](../../04-architecture.md)
- API envelope contract: [`../06-api-specification.md`](../../06-api-specification.md)
- Components: [`components.md`](components.md)
