# pagify — Phase 3: Theme

## Goal

Embed the default theme (template, stylesheet, scripts) in the binary.

## Deliverables

- `internal/theme` — `go:embed` theme assets
- `default/template.html` — semantic document
- `default/styles.css` — design system on custom properties
- `default/script.js` — progressive enhancement
- `default/search.js` — client-side search filtering

## Acceptance criteria

- Building a site needs nothing but the `pagify` executable.
- Generated HTML is semantic (`header`, `nav`, `main`, `article`, `footer`).
- Light/dark theme toggle works and persists.
