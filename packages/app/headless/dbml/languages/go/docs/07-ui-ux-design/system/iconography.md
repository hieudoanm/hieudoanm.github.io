# dbml (Go) — Design System: Iconography

dbml ships no icon set: no icon font, no sprite sheet, no image assets. The renderer is dependency-free Go that emits raw SVG elements, so every "icon" is either a vector marker defined inline or a text badge. This page inventories them.

## 1. SVG markers

The only reusable non-text glyphs live in the `<defs>` block written by `writeSVGHead` (`internal/dbml/svg_draw.go`):

| Marker  | Shape                              | Fill      | Meaning                          |
| ------- | ---------------------------------- | --------- | -------------------------------- |
| `dot`   | circle, r=3.2 at centre of 10×10   | `#6366f1` | Reference start (the "one" side) |
| `arrow` | filled triangle path               | `#7c3aed` | Reference end (the "many" side) |

Both are attached to reference paths via `marker-start="url(#dot)"` and `marker-end="url(#arrow)"`. Markers are auto-oriented (`orient="auto"` on the arrow) so direction reads correctly regardless of routing.

## 2. Key badges

Primary and unique keys are conveyed by text badges, not symbols: bold 9px `PK` and `UK` in the accent colour `#7c3aed`, drawn at the start of the row with a 26px reserved offset before the column name. This keeps the diagram readable in plain-text viewers and search-indexable, and never relies on a glyph a font might not carry.

## 3. Terminal glyphs

The `serve` startup box (`cmd/box.go`) uses Unicode box-drawing characters — `╭`, `─`, `│`, `╰`, `╮`, `╯` — to draw a rounded frame. These are presentation-only: when the box is rendered into non-terminal output the same characters appear as plain text, and `cmd/box_test.go` asserts the visible (ANSI-stripped) widths of every line still align.

CLI status is conveyed by words (`Generated ...`, `dbml: ...`), never by emoji or colour alone — the exit status is always 0 today (`main.go` discards `Execute()`'s return).

## 4. Rules

- Any new diagram glyph must be an inline SVG element or marker defined in `svg_draw.go`; no external image references (the diagram must render offline, from the file alone).
- No icon dependency (no icon fonts, no SVG sprite packages) — consistent with the zero-dependency policy in [`../../08-tech-stack.md`](../../08-tech-stack.md).
- Status and key semantics must always survive being read as plain text: text beats colour, colour reinforces but never replaces a label.
- All text glyphs go through `escapeXML` before emission so names cannot break the document or inject markup.

## Cross-references

- UI/UX overview: [`../07-ui-ux-design.md`](../../07-ui-ux-design.md)
- Tokens (marker colours): [`design-tokens.md`](design-tokens.md)
- Components (reference link, key badge): [`components.md`](components.md)
- Architecture (SVG generator): [`../04-architecture.md`](../../04-architecture.md)
