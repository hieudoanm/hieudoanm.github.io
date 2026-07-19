# pagify — Data Model: theme package

The `theme` package presents the default theme, embedded in the binary with `go:embed`.

## Files

- `theme.go` — loads the template; exposes assets as an `fs.FS`.
- `default/template.html` — semantic document (`header`, `nav`, `main`, `article`, `footer`, outline).
- `default/styles.css` — design system on custom properties.
- `default/script.js` — progressive enhancement (theme toggle, drawer, copy buttons, wide tables).
- `default/search.js` — reads the generated index and filters it in the browser.

## Responsibilities

- Control layout, typography, colours, navigation, code blocks, tables, callouts, animations, responsiveness.
- Never contain Markdown parsing logic.
