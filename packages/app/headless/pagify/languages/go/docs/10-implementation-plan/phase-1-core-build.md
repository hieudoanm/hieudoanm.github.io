# pagify — Phase 1: Core Build

## Goal

Convert a directory of Markdown files into static HTML in `dist/`.

## Deliverables

- `internal/site` — file discovery, frontmatter, URL rules
- `internal/markdown` — Goldmark parsing and rendering
- `internal/build` — pipeline orchestration, page writing, asset copy
- `dist/` output replacing previous output on each build

## Acceptance criteria

- `pagify build ./docs` produces `dist/index.html` plus page HTML.
- Non-Markdown assets are copied preserving relative paths.
- Hidden files, `.bak`/`.backup`, `_partials`, and `pagify.yaml` are skipped.
- A second build replaces `dist/` (deleted pages do not survive).
