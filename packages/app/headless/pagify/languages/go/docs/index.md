# pagify documentation

The reference for the Go implementation: how it is put together, and how to work
on it.

- [Architecture](./ARCHITECTURE.md) — how a build flows from Markdown to HTML,
  package by package, and why the code is split the way it is.
- [Contributing](./CONTRIBUTING.md) — the workflow before a pull request, and the
  rules that keep the codebase consistent.

## Quick reference

```bash
pagify build ./docs        # ./docs -> ./dist
pagify serve ./docs        # rebuild on every request
pagify init ./my-site      # scaffold a project
```

Configuration is optional. Everything in `pagify.yaml` has a working default,
and the directory layout alone determines the navigation and the URLs.

See the [implementation README](../README.md) for the full command, frontmatter
and configuration reference.
