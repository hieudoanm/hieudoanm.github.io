# dbml (Go) — Design System: Design Tokens

dbml has no web application. Its user-facing surfaces are the CLI, the HTTP JSON API, and the SVG ER diagram rendered directly in Go. The only surface with visual design tokens is the SVG output; its palette, type scale, and spacing are defined as constants in `internal/dbml/svg.go` and emitted by `internal/dbml/svg_draw.go`. This page documents those values as the project's design tokens.

## 1. Colour

Single light theme. All values are hard-coded in `svg_draw.go`.

| Token value | Role                                            | Emitted as                          |
| ----------- | ----------------------------------------------- | ----------------------------------- |
| `#ffffff`   | Canvas background, default row fill              | root `<rect>`, row `<rect>`         |
| `#f8fafc`   | Alternate (zebra) row fill                       | row `<rect>` on odd indices         |
| `#f5f3ff`   | Primary-key row highlight                        | row `<rect>` when key is `PK`       |
| `#0f172a`   | Table/enum header bar fill; column-name text     | header `<rect>`, name `<text>`      |
| `#ffffff`   | Header title text (on dark bar)                  | title `<text>`                      |
| `#7c3aed`   | Accent: PK/UK badges, reference strokes, arrows  | badge text, link `<path>`, marker   |
| `#6366f1`   | Reference start-dot marker                       | `<marker id="dot">` circle          |
| `#64748b`   | Column type text (secondary)                     | type `<text>`                       |
| `#e2e8f0`   | Borders and column dividers                      | `<line>`, outline `<rect>`          |

`#64748b` on `#ffffff` clears the WCAG 2.1 AA 4.5:1 minimum for normal text; `#0f172a` and `#7c3aed` on light fills clear it with margin. See [`accessibility.md`](accessibility.md).

## 2. Typography

The root `<svg>` element carries `font-family="ui-monospace, SFMono-Regular, Menlo, monospace"`. There is no web-font request; the diagram renders offline.

| Size | Weight | Role                                        |
| ---- | ------ | ------------------------------------------- |
| 13px | bold   | Table and enum titles (header bar)          |
| 11px | normal | Column names and enum values                |
| 9px  | bold   | PK/UK key badges                            |
| 9px  | normal | Column SQL types (right-aligned)            |

## 3. Spacing and geometry

Constants live at the top of `internal/dbml/svg.go`:

| Constant    | Value | Meaning                                        |
| ----------- | ----- | ---------------------------------------------- |
| `svgMargin` | 48    | Canvas margin on every side                     |
| `svgGapX`   | 90    | Horizontal gap between grid columns            |
| `svgGapY`   | 70    | Vertical gap between grid rows                 |
| `svgCols`   | 3     | Boxes per grid row before wrapping             |
| `svgTableW` | 230   | Fixed table box width                          |
| `svgEnumW`  | 170   | Fixed enum box width                           |
| `svgHeaderH`| 34    | Header bar height                              |
| `svgRowH`   | 27    | Row height                                     |

## 4. Shape and stroke

| Property        | Value                | Where                             |
| --------------- | -------------------- | --------------------------------- |
| Corner radius   | `rx="6"`             | Header bar and outer box          |
| Outline stroke  | `#e2e8f0`, 1px       | Outer box border, row divider     |
| Reference stroke| `#7c3aed`, 1.6px     | Bezier relation paths             |
| Name inset      | 8px from left edge   | Column-name text x-offset         |
| Type inset      | 8px from right edge  | Type text right-anchor            |

## 5. Theme rules

- There is one theme. No dark mode, no user-selectable palette, no theming API.
- Colour never carries meaning alone: PK/UK are spelled out as text badges, types as text labels.
- Any new token must be added to `svg_draw.go` as the single source; do not scatter literals.

## Cross-references

- UI/UX overview: [`../07-ui-ux-design.md`](../../07-ui-ux-design.md)
- Architecture (SVG generator): [`../04-architecture.md`](../../04-architecture.md)
- Components built from these tokens: [`components.md`](components.md)
- Iconography (SVG markers): [`iconography.md`](iconography.md)
