---
title: Basic Docs
language: en
basePath: ""
theme: light
footer: "© 2024 Basic Docs Example"
---

# Welcome to Basic Docs

This is a minimal **pagify** example showing how to create a documentation site with zero configuration.

## Quick Start

```bash
pagify build ./docs
```

The output appears in `./dist` — ready to deploy anywhere.

## Features

- **Zero config** — just Markdown files in a directory
- **Clean URLs** — no `.html` extensions
- **Auto navigation** — built from your file tree
- **Search** — client-side, no backend needed
- **Dark mode** — automatic + manual toggle
- **Responsive** — works on mobile, tablet, desktop

## Project Structure

```text
docs/
├── index.md              # Home page
├── getting-started.md    # First guide
├── guide/
│   ├── index.md          # Section landing
│   ├── installation.md
│   └── configuration.md
└── reference/
    └── cli.md
```

## Next Steps

Read the [Getting Started](./getting-started/) guide to learn more.