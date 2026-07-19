# dbml (Go) — Design System: Accessibility

`docs/07-ui-ux-design.md` sets WCAG 2.1 AA as the design bar. dbml has no interactive web UI, so accessibility applies to what actually exists: terminal output, JSON responses, the Swagger UI page, and the SVG diagram as a viewed artifact.

## 1. CLI

- Output is plain text, one statement per line — the format screen readers, `grep`, and CI logs already handle well.
- Errors go to stderr and successes to stdout, so assistive tooling and redirection can separate them (`cmd/root.go`).
- No state is signalled by colour or glyph alone: `Generated ...` and `dbml: parse DBML: ...` are complete sentences and carry the machine-readable verdict — the exit status is always 0 (`main.go` discards `Execute()`'s return), so tooling must read stderr.
- OSC 8 hyperlinks in the serve box are emitted only when stdout is a character device (`isTerminal` in `cmd/box.go`); piped or captured output stays clean, escape-free text.
- `dbml --help` is keyboard-navigable by definition: it is text. There are no TUI widgets, focus traps, or custom keybindings.

## 2. HTTP API

- Responses are JSON with stable, self-describing keys (`sql`, `mermaid`, `svg`, `error`, `status`, `version`); error messages are human-readable sentences, not codes alone.
- `GET /api/v1/docs` serves the third-party Swagger UI page, which is itself keyboard navigable. Custom HTML is not added around it, so nothing dbml ships can degrade that page's accessibility.

## 3. SVG diagram

Grounded in `internal/dbml/svg_draw.go`:

- Contrast: `#0f172a` and `#64748b` text on `#ffffff`/`#f8fafc` fills meet the AA 4.5:1 normal-text threshold; `#ffffff` on the `#0f172a` header bar far exceeds it.
- Text, not decoration: PK/UK, types, and cardinality are all spelled-out text; the diagram is fully legible with no colour perception.
- All text is emitted through `escapeXML`, so a column named `name <div>` renders as literal text and cannot corrupt the document for parsing assistive tools (covered by `TestToSVGRendersTablesAndColumns`).
- The root `<svg>` uses a monospace `font-family` stack with wide system fallbacks (`ui-monospace, SFMono-Regular, Menlo, monospace`), so it renders without network access.

### Known gaps (not yet implemented)

- The root `<svg>` carries no `<title>`, `<desc>`, or ARIA role; screen readers announce the file with no summary.
- 9px type text and 9px badges are below comfortable reading size for low-vision users.
- The fixed three-column grid does not reflow — see [`responsive.md`](responsive.md).

These are recorded, not claimed as done. Any fix must keep the output deterministic (see [`animation.md`](animation.md) §3).

## 4. Principles

- Never rely on colour as the sole channel for meaning.
- Text in, text out: user-supplied names must round-trip as readable text in every format.
- No accessibility theatre: do not bolt ARIA onto SVG that could instead gain a real `<title>`.
- The zero-config promise includes assistive technology: nothing above requires a flag, plugin, or font download.

## Cross-references

- UI/UX overview: [`../07-ui-ux-design.md`](../../07-ui-ux-design.md)
- Tokens and contrast values: [`design-tokens.md`](design-tokens.md)
- Responsive behaviour: [`responsive.md`](responsive.md)
- API contract: [`../06-api-specification.md`](../../06-api-specification.md)
