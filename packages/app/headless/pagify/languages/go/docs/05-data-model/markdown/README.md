# pagify — Data Model: markdown package

The `markdown` package owns Goldmark and knows nothing about visual design.

## Files

- `render.go` — single shared Goldmark instance (GFM, footnotes, heading IDs, raw HTML passthrough).
- `transform.go` — AST walk: heading outline, link resolution, callout marking.
- `callout.go` — renders a marked blockquote as the theme's `<aside>`.
- `title.go` — lifts the leading H1 out of the body as the page title.
- `outline.go` — flattens heading inline markup into plain text for navigation.

## Responsibilities

- Parse GitHub-Flavored Markdown (tables, task lists, footnotes, callouts).
- Keep styling decisions out of the parser.
