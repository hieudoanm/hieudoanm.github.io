# pagify — FEATURE-04: Client-Side Search

## 1. Summary

Search runs entirely in the browser over a generated JSON index; no backend required.

## 2. Behaviour

- `internal/build/search` reduces each page's rendered HTML to plain text.
- Writes `assets/search-index.json`.
- Script, style, and `data-no-search` content is skipped.
- `default/search.js` reads the index once and filters it in the browser.

## 3. Acceptance criteria

- `assets/search-index.json` exists after `pagify build`.
- Search returns matching pages without a network request.
- A site with no search box does not download `search.js`.
