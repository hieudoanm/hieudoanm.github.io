# Getting Started

Learn how to use **pagify** to build your documentation site.

## Installation

```bash
# Install via Go
go install github.com/hieudoanm/pagify@latest

# Or build from source
make build
```

## Create Your First Site

```bash
# Scaffold a starter project
pagify init my-docs

# Build it
pagify build ./my-docs/docs

# Preview locally
pagify serve ./my-docs/docs
```

## Write Content

Create `.md` files in your content directory:

```markdown
---
title: My Page
description: A helpful description
order: 1
---

# Page Title

Your content here...
```

## Frontmatter Options

| Field         | Description                              |
| ------------- | ---------------------------------------- |
| `title`       | Page title (overrides first `# Heading`) |
| `description` | SEO meta description                     |
| `order`       | Sort order in navigation                 |
| `label`       | Custom nav label                         |
| `draft`       | Set `true` to exclude from build         |

## Build & Deploy

```bash
# Build for production
pagify build ./docs --output ./dist

# Deploy ./dist to GitHub Pages, Netlify, Vercel, Cloudflare Pages...
```

> [!TIP]
> The `dist/` directory contains only static files — no server required.
