# pagify — FEATURE-01: Markdown Build

## 1. Summary

`pagify build <dir>` converts a directory of Markdown files into a static website in `dist/`.

## 2. Behaviour

- Discover Markdown files recursively.
- Parse Markdown with Goldmark (GFM, footnotes, heading IDs, callouts).
- Build site metadata and navigation.
- Render HTML per page via the theme template.
- Copy theme assets and content assets.
- Write the static site to `dist/`, replacing any previous output.

## 3. Acceptance criteria

- Running `pagify build` on a directory of Markdown produces `dist/index.html` plus page HTML.
- Non-Markdown assets are copied to `dist/` preserving relative paths.
- A second build replaces `dist/` so deleted pages do not survive.
- The build succeeds with no `pagify.yaml` present.
