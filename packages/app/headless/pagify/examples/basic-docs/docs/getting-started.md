# Getting Started

Learn how to use **pagify** to build your documentation site.

## Installation

Install pagify via one of these methods:

```bash
# Install via Go
go install github.com/hieudoanm/pagify@latest

# Or build from source
make build
```

See the [Installation](./guide/installation.md) page for full details on every install method.

## Create Your First Site

```bash
# Scaffold a starter project
pagify init my-docs

# Build it
pagify build ./my-docs/docs

# Preview locally
pagify preview ./my-docs/docs
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

## Learn More

- Read the [Guide](./guide/index.md) section for installation and configuration.
- Browse [Configuration](./guide/configuration.md) to customise your site.
- Return to the [home page](./index.md) for an overview.

## Next Steps

- [Guide](./guide/index.md)
- [Configuration](./guide/configuration.md)
- [Home](./index.md)

> [!TIP]
> The `dist/` directory contains only static files — no server required.