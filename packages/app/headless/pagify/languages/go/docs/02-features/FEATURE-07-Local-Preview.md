# pagify — FEATURE-07: Local Preview Server

## 1. Summary

`pagify preview <dir>` runs a local development server that rebuilds the site on every request.

## 2. Behaviour

- Rebuilds per request instead of watching the filesystem, removing missed-change bugs.
- Honours `basePath` so GitHub Project Pages previews match the deploy prefix.
- Serves static files only.
- Live reload may be added later.

## 3. Acceptance criteria

- `pagify preview ./docs` serves the site at localhost.
- Editing Markdown and refreshing shows the updated page.
- The preview serves under the configured base path.
