# pagify

> Write Markdown. Run one command. Get a beautiful website.

`pagify` turns a directory of Markdown files into a complete, static website:
navigation, page rendering, search and a polished default theme, all from one
binary with no Node.js and no configuration.

```bash
pagify build ./docs
```

## Install

```bash
go install github.com/hieudoanm/pagify@latest
```

Or build from a checkout:

```bash
make build      # ./bin/pagify
make install    # $HOME/bin/pagify
```

## Commands

| Command | What it does |
| --- | --- |
| `pagify init [dir]` | Write a starter project: `docs/` with example pages |
| `pagify build [content]` | Build the site into `./dist` |
| `pagify serve [content]` | Build and serve on localhost, rebuilding on every request |

```bash
pagify init my-site                  # scaffold ./my-site/docs
pagify build                         # ./docs -> ./dist
pagify build ./docs --output ./public
pagify serve ./docs --port 8080
```

Both `build` and `serve` default the content directory to `./docs` and the
output to `./dist`, so the common case needs no arguments.

## Zero configuration

The directory layout is the whole configuration:

```text
docs/
├── index.md                 #  -> /
├── getting-started.md       #  -> /getting-started/
├── guide/
│   ├── index.md             #  -> /guide/
│   ├── installation.md      #  -> /guide/installation/
│   └── configuration.md     #  -> /guide/configuration/
└── reference/
    └── cli.md               #  -> /reference/cli/
```

Navigation follows the file tree, `index.md` becomes a section landing page,
and every page gets clean URLs with no `.html` extension. Nothing else to set
up.

A content directory with no `index.md` still gets a landing page: `pagify`
generates one from the navigation, so the site's own root URL never answers
with a 404.

## Frontmatter

All fields are optional. Without any, a page takes its title from its first
level-1 heading, or failing that from its file name.

```yaml
---
title: Getting Started
description: Learn how to get started with pagify.
order: 1
label: Start here
draft: false
---
```

The leading `# Heading` is lifted out of the body and rendered as the page
title, so the page shows it once and the outline starts at the second level.
`title` in frontmatter wins over the heading.

## Configuration

`pagify.yaml` at the content root is optional. Every field has a working
default, and a site with no config file builds exactly as well as one with a
full config file.

```yaml
title: My Documentation
language: en
basePath: /my-repo      # for a project page on GitHub Pages
theme: light            # initial colour scheme
footer: © 2026 Example
```

`basePath` is applied to every generated URL — navigation, assets, Markdown
links and search results — and `pagify serve` serves the same paths, so a
project page behaves locally exactly as it does once deployed.

## Markdown

Everything GitHub supports works: tables, task lists, strikethrough,
autolinks, footnotes, automatic heading anchors and raw HTML.

Callouts are written the GitHub way:

```markdown
> [!NOTE]
> Useful information.

> [!TIP]
> A shortcut.

> [!WARNING]
> Something to watch out for.

> [!DANGER]
> Something that can break.
```

`info`, `success`, `check`, `caution`, `attention` and `error` are accepted as
aliases. Links between pages are rewritten to their clean URLs, so
`[install](guide/installation.md)` in your source becomes `/guide/installation/`
in the output. Images and other files are copied to `assets/` and their
destinations rewritten to match.

## Output

```text
dist/
├── index.html
├── guide/
│   ├── index.html
│   └── installation/
│       └── index.html
└── assets/
    ├── styles.css
    ├── script.js
    ├── search.js
    ├── favicon.svg
    └── search-index.json
```

Plain static files: deploy the directory to GitHub Pages, Cloudflare Pages,
Netlify, Vercel or any web server. No backend, no runtime dependency.

The site is readable and navigable without JavaScript. It loads only two small
scripts, both progressive enhancements: theme and navigation behaviour, and
client-side search over the generated index.

## Development

```bash
make test        # go test ./...
make lint        # go vet ./...
make coverage    # coverage/coverage.html
make all         # format, lint, test, build
```

[AGENTS.md](./AGENTS.md) documents the architecture and the rules the code
follows. [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) explains how a build
flows from Markdown to HTML.

## Licence

GPL-3.0. See [LICENSE](./LICENSE).
