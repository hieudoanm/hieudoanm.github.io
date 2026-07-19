# pagify — Data Model: build package

The `build` package ties the packages together and owns everything about one build.

## Files

- `config.go` — reads the optional `pagify.yaml` and fills in defaults.
- `render.go` — projects a `site.Page` onto the theme view model; prefixes URLs with the base path.
- `search.go` — reduces each page's rendered HTML to plain text; writes `assets/search-index.json`.
- `build.go` — runs config → discovery → render → write → search index → copy assets.

## Responsibilities

- Replace the output directory first (deleted pages cannot survive).
- Generate a landing page from navigation when no index page exists.
