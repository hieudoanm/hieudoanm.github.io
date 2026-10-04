---
title: Introducing pagify v0.1
description: Announcing the first release of pagify - a zero-config static site generator for documentation
date: 2024-01-15
category: releases
author: hieudoanm
---

# Introducing pagify v0.1

We're excited to announce the first release of **pagify** — a zero-configuration static site generator designed specifically for documentation.

## Why pagify?

Most documentation tools require complex configuration, Node.js dependencies, or a build pipeline. pagify takes a different approach:

- **Zero config** — Point it at a directory of Markdown files
- **Single binary** — No Node.js, no npm, no Python
- **Beautiful by default** — Polished theme with dark mode, search, and responsive design
- **Fast** — Builds complete sites in milliseconds

## Quick Start

```bash
# Install
go install github.com/hieudoanm/pagify@latest

# Create a docs folder
mkdir docs
echo "# Hello World" > docs/index.md

# Build
pagify build ./docs
```

Your site is ready in `./dist` — deploy anywhere!

## Features

### Markdown First

Write content in standard Markdown with GitHub-flavored extensions:

- Tables
- Task lists
- Footnotes
- Callouts (`> [!NOTE]`, `> [!TIP]`, etc.)
- Syntax highlighting

### Built-in Search

Client-side search index generated at build time. No backend required.

### Dark Mode

Automatic OS detection with manual toggle. Preference persists in localStorage.

### Responsive Design

Sidebar navigation on desktop, collapsible drawer on mobile.

## What's Next

- More themes
- Plugin system
- Multi-language support
- `pagify check` for link validation

## Get Involved

- ⭐ Star us on [GitHub](https://github.com/hieudoanm/pagify)
- 🐛 Report issues
- 💡 Request features
- 🤝 Contribute code

---

_Happy documenting!_
