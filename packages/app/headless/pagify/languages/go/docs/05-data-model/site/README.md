# pagify — Data Model: site package

The `site` package answers "what pages exist and where do they go".

## Files

- `discover.go` — walks the content directory once, collecting Markdown files and copying non-Markdown files as assets.
- `page.go` — splits frontmatter from the body; resolves each file to a URL and output path.
- `url.go` — owns every URL and output-path rule.
- `nav.go` — builds the sidebar from the file tree.
- `resolve.go` — rewrites Markdown link and image destinations.

## Responsibilities

- Skip hidden files, `.bak`/`.backup` siblings, `_partials` directories, and `pagify.yaml`.
- Resolve `index.md`/`README.md` as directory landing pages.
- Move the root landing page to the front of navigation.
