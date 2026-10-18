# cv — UI and UX Design

UI tokens, layout, states, and accessibility across the 64 templates and 8 visual families.

Detailed design documentation lives in [`07-ui-ux-design/`](./07-ui-ux-design/).

## Design system (Material Design 3)

- Colour roles: primary/on-primary/primary-container, secondary, tertiary, error, surface/on-surface, surface-container, outline, inverse
- Type scale: display-large, headline-large, title-large, body-large/medium/small, label-large/medium/small
- Shape tokens: small 4px, medium 12px, large 16px, extra-large 28px
- Theme switching persisted in `localStorage` under `cv-theme` (`cv-light` / `cv-dark`), honoring `prefers-color-scheme`

## GUI prototype

cv has no compiled GUI yet (CLI + HTTP server only). The interactive HTML prototype lives under
`docs/07-ui-ux-design/prototypes/html/`:

- `00-components.html` — CV editor window (personal info, experience, education, skills, template selector, Export PDF/Preview), light and dark themes, with a live PDF-style preview pane

Screenshots are generated with Playwright via `prototypes/screenshot.sh`.
