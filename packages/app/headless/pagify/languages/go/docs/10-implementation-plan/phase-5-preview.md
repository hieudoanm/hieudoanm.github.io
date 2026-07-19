# pagify — Phase 5: Preview

## Goal

Local development server that rebuilds on every request.

## Deliverables

- `internal/server/preview.go` — per-request rebuild server
- `basePath` support for GitHub Project Pages

## Acceptance criteria

- `pagify preview ./docs` serves the site at localhost.
- Editing Markdown and refreshing shows the latest content.
- Site served under the configured `basePath`.
