# pagify

> Write Markdown. Run one command. Get a beautiful website.

`pagify` is a headless static-site generator for technical documentation: point
it at a folder of Markdown and it produces a complete, polished website —
navigation, search, dark mode, responsive layout — that deploys to any static
host.

```bash
pagify build ./docs
```

No configuration, no theme wiring, no Node.js.

## Why

Most Markdown tooling makes you choose between a beautiful result and a simple
toolchain. `pagify` aims at both:

- **Markdown first.** The directory layout is the configuration. Add a file and
  it appears in the navigation.
- **Static output.** Plain HTML, CSS and JavaScript. No backend, no runtime
  dependency, deployable to GitHub Pages, Cloudflare Pages, Netlify, Vercel or
  any web server.
- **A real theme.** The default theme is part of the product, not an afterthought
  bolted on afterwards.
- **One static binary.** The theme is embedded with `go:embed`, so building a
  site needs the executable and nothing else.

## Implementations

| Language | Location | Status |
| --- | --- | --- |
| Go | [`languages/go`](./languages/go) | Complete — CLI, build pipeline, default theme, preview server |

Start with the [Go implementation](./languages/go/README.md).

## Documentation

- [Go README](./languages/go/README.md) — install, commands, frontmatter, configuration, output
- [Architecture](./languages/go/docs/ARCHITECTURE.md) — how a build flows from Markdown to HTML
- [Contributing](./languages/go/docs/CONTRIBUTING.md) — workflow and the rules the code follows
- [AGENTS.md](./languages/go/AGENTS.md) — the specification this implementation is held to

## Licence

GPL-3.0.
