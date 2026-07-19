# pagify — FEATURE-02: Zero-Config Discovery & Navigation

## 1. Summary

pagify infers pages, URLs, and navigation from the Markdown file structure with no manual navigation file.

## 2. Behaviour

- `internal/site` walks the content directory once.
- Hidden files, `.bak`/`.backup` siblings, `_partials`, and `pagify.yaml` are skipped.
- Each file resolves to a URL and output path; `index.md`/`README.md` are directory landing pages.
- `internal/nav` builds the sidebar from the file tree; directories become groups.
- The root landing page moves to the front of navigation.

## 3. Acceptance criteria

- `docs/guides/install.md` → `/guides/install/` and `dist/guides/install/index.html`.
- `docs/index.md` is the site landing page and appears first in navigation.
- A directory with `index.md` is both a nav group and a link.
- No manual navigation file is required.
