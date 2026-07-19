# dbml (Go) — UI/UX Design

## 1. Purpose

This document defines the UI/UX design for dbml's HTTP server and CLI: tokens, layout, states, and accessibility.

The design must be:

- Clear and technical (DBML conversion tool).
- Accessible (WCAG 2.1 AA).
- Responsive (mobile, tablet, desktop).
- Consistent across screens.
- Explicit about loading, empty, validation-error, network-error, unexpected-error, and success.

## Design system (Material Design 3)

dbml's real surface is the SVG ER diagram emitted by `internal/dbml/svg_draw.go`, with the tokens in
[`07-ui-ux-design/system/design-tokens.md`](./07-ui-ux-design/system/design-tokens.md). The GUI prototype below adapts those tokens to a Material Design 3 structure, using dbml's violet brand (`#7c3aed`) as the MD3 primary role:

- Colour roles: primary/on-primary/primary-container, secondary, tertiary, error, surface/on-surface, surface-container, outline, inverse
- Type scale: display-large, headline-large, title-large, body-large/medium/small, label-large/medium/small
- Shape tokens: small 4px, medium 12px, large 16px, extra-large 28px
- Theme switching persisted in `localStorage` under `dbml-theme` (`dbml-light` / `dbml-dark`), honoring `prefers-color-scheme`

## GUI prototype

dbml ships no compiled GUI (CLI + HTTP JSON API + MCP only). The interactive HTML prototype lives under
`docs/07-ui-ux-design/prototypes/html/`:

- `00-components.html` — DBML converter window (DBML source editor, input/output paths, format selector, Convert/Export, live output preview), light and dark themes

Screenshots are generated with Playwright via `prototypes/screenshot.sh`.

## 2. Design Tokens

| Document | Covers |
| -------- | ------ |
| [`design-tokens.md`](./07-ui-ux-design/system/design-tokens.md) | Colour, type, space, themes |

## 3. Components

| Document | Covers |
| -------- | ------ |
| [`components.md`](./07-ui-ux-design/system/components.md) | Buttons, file input, selects, alerts |

## 4. Layout

| Document | Covers |
| -------- | ------ |
| [`layout.md`](./07-ui-ux-design/system/layout.md) | Navbar, content width, breakpoints |

## 5. Screen Designs

| Document | Covers |
| -------- | ------ |
| [`screens.md`](./07-ui-ux-design/system/screens.md) | Home, Convert, Result |

## 6. States

| Document | Covers |
| -------- | ------ |
| [`states.md`](./07-ui-ux-design/system/states.md) | Global UI states |

## 7. Accessibility

| Document | Covers |
| -------- | ------ |
| [`accessibility.md`](./07-ui-ux-design/system/accessibility.md) | Keyboard, SR, contrast |

## 8. Responsive Design

| Document | Covers |
| -------- | ------ |
| [`responsive.md`](./07-ui-ux-design/system/responsive.md) | Viewports |

## 9. Animation

| Document | Covers |
| -------- | ------ |
| [`animation.md`](./07-ui-ux-design/system/animation.md) | Motion |

## 10. Iconography

| Document | Covers |
| -------- | ------ |
| [`iconography.md`](./07-ui-ux-design/system/iconography.md) | Icons |

## Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- API: [`06-api-specification.md`](06-api-specification.md)
