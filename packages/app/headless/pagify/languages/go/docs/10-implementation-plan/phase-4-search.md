# pagify — Phase 4: Search

## Goal

Client-side full-text search over a generated JSON index.

## Deliverables

- `internal/build/search` — reduce pages to plain text, write `assets/search-index.json`
- `default/search.js` — read index and filter in the browser

## Acceptance criteria

- `assets/search-index.json` exists after `pagify build`.
- Search returns matching pages without a network request.
