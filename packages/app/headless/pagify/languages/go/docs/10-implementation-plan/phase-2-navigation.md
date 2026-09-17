# pagify — Phase 2: Navigation

## Goal

Infer navigation and URLs from the Markdown file structure.

## Deliverables

- `internal/nav` — sidebar built from the file tree
- Clean URL rules (`guide/install.md` → `/guide/install/`)
- `index.md`/`README.md` as directory landing pages
- Root landing page moved to the front of navigation

## Acceptance criteria

- `docs/guides/install.md` → `/guides/install/` and `dist/guides/install/index.html`.
- Directories become nav groups; directories with `index.md` are groups and links.
- `.md` links render as clean URLs.
