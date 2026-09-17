# dbml (Go) — Design System: Responsive Design

The consolidated design doc requires the design to work on mobile, tablet, and desktop. dbml has no web app, so "responsive" means: the SVG scales to any viewer, terminal output adapts to its host, and JSON is viewport-independent. There are no breakpoints to define.

## 1. SVG: scalable by construction

The root `<svg>` element (`writeSVGHead` in `internal/dbml/svg_draw.go`) writes `width`, `height`, and `viewBox="0 0 <width> <height>"` from the same coordinate space. Consequences:

- Any viewer — browser, editor preview, GitHub, phone — scales the whole diagram uniformly to its pane; there is no fixed pixel size a user can be trapped outside of.
- The diagram is resolution-independent: the same file is correct at 1× and 3× density.
- Rendering is fit-to-pane, not reflow: the three-column grid (`svgCols = 3`) is baked into the coordinates. Narrow viewers show the full canvas smaller; boxes do not wrap into more columns.

Recommended consumption: view at fit-width, or let the host viewer zoom. For very large schemas the canvas grows right and down; viewers scroll or scale.

## 2. Fixed-width caveats

Boxes are fixed at `svgTableW = 230` / `svgEnumW = 170` px. Long column types are right-anchored 8px from the box edge, and long names left-anchored 8px in; sufficiently long text can overflow its box because the renderer does not measure strings. This is a known trade-off of the dependency-free renderer — see [`layout.md`](layout.md) §5.

## 3. Terminal

- No line assumes a terminal width. Success and error messages are single lines that wrap at the host's width.
- The `serve` startup box computes its own width from content (`cmd/box.go`): the frame grows to the widest row, so it is correct at any window size. It never tries to detect or adapt to `COLUMNS`.
- Hyperlinks degrade gracefully: OSC 8 escapes appear only on real terminals; pipes and logs get plain URLs.

## 4. HTTP

JSON has no viewport. The one rendered page, Swagger UI at `GET /api/v1/docs`, ships its own responsive layout from the vendor bundle; dbml adds no fixed-width wrapper around it.

## 5. Summary by surface

| Surface        | Narrow viewport behaviour                             | Reflows? |
| -------------- | ----------------------------------------------------- | -------- |
| SVG diagram    | Scales uniformly via `viewBox`; scrolls or fits        | No       |
| CLI output     | Lines wrap at terminal width                          | Yes      |
| Serve box      | Width computed from content                           | Yes      |
| JSON responses | Not visual                                            | n/a      |
| Swagger UI     | Vendor responsive layout                              | Yes      |

## Cross-references

- UI/UX overview: [`../07-ui-ux-design.md`](../../07-ui-ux-design.md)
- Layout constants: [`layout.md`](layout.md)
- Tokens (fixed dimensions): [`design-tokens.md`](design-tokens.md)
- Architecture (SVG generator): [`../04-architecture.md`](../../04-architecture.md)
