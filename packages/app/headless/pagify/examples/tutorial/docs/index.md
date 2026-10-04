---
title: pagify Tutorial
language: en
theme: auto
footer: "© 2024 pagify Tutorial"
---

# pagify Tutorial

Learn pagify by building a documentation site step by step.

## Prerequisites

- Go 1.21+ (for building from source)
- No Node.js, npm, or Python required

## Step 1: Install pagify

```bash
# Via Go
go install github.com/hieudoanm/pagify@latest

# Or build from source
git clone https://github.com/hieudoanm/pagify
cd pagify
make build
./bin/pagify --version
```

## Step 2: Create Your Content

```bash
mkdir -p my-docs/docs
```

Create `my-docs/docs/index.md`:

```markdown
---
title: My Project
theme: auto
footer: "© 2024 My Project"
---

# Welcome to My Project

This is the home page of my documentation site.

## Quick Links

- [Getting Started](./getting-started/)
- [API Reference](./reference/)
```

Create `my-docs/docs/getting-started.md`:

```markdown
---
title: Getting Started
description: Learn how to get started with My Project
---

# Getting Started

Welcome! This guide will help you get up and running.

## Installation

```bash
# Install the CLI
go install github.com/my/project@latest
```

## Configuration

Create a config file:

```yaml
# config.yaml
setting: value
```

## Next Steps

Read the [API Reference](./reference/) to learn more.
```

Create `my-docs/docs/reference/index.md`:

```markdown
---
title: API Reference
---

# API Reference

## Commands

### `my-project run`

Runs the application.

### `my-project build`

Builds the project.
```

## Step 3: Build Your Site

```bash
pagify build ./my-docs/docs --output ./my-docs/dist
```

## Step 4: Preview Locally

```bash
pagify serve ./my-docs/docs --port 8080
```

Open http://localhost:8080 in your browser.

## Step 5: Deploy

Upload the `dist/` folder to any static host:

- **GitHub Pages** — Push to `gh-pages` branch
- **Netlify** — Drag and drop `dist/` folder
- **Vercel** — `vercel deploy dist/`
- **Cloudflare Pages** — Connect Git repository

## Congratulations! 🎉

You've built and deployed your first pagify site!

## Next Steps

- Read the [Customization Guide](../blog/customizing-your-site/)
- Explore [Markdown Features](../blog/writing-markdown-for-pagify/)
- Check the [API Reference](../reference/)