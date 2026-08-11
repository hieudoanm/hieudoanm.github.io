# Diagram

A small, deterministic **diagram editor** for a plain-text DSL. Type the diagram
on the left, and a styled SVG preview updates live on the right. Ships as a web
app (static export / PWA), desktop app (Tauri), and mobile app (Tauri Mobile).

## Features

- Live preview as you type
- Strict line-level parsing with error highlighting
- Deterministic auto-layout (layered ranking; same text → same diagram)
- Shapes: rectangle, round, ellipse, diamond, cylinder
- Tech icons on nodes: `node db: PostgreSQL [cylinder, icon=database]`
- 128 built-in examples (Uber, Twitter, YouTube, Slack, Stripe, Google Maps, and
  more) with interview questions
- Directed edges with labels; back edges (cycles) routed as curves
- Diagram title support
- Dark / light theme
- New / Open / Save (`.diagram`) / Export SVG
- Persists your work in `localStorage`

## Getting Started

```bash
pnpm install
pnpm dev --filter=@hieudoanm.github.io/diagram
```

Then open [http://localhost:3000/diagram](http://localhost:3000/diagram).

## The DSL

```text
title: Web App Architecture

node web: Web Client [round, icon=browser]
node api: API Server [round, icon=server]
node auth: Auth Service [ellipse, icon=auth]
node db: PostgreSQL [cylinder, icon=database]

edge web -> api: HTTPS
edge api -> db: reads
edge api -> auth: tokens
```

Full reference: [`docs/SYNTAX.md`](./docs/SYNTAX.md). Read the example library
at [`/posts/`](/posts/) or browse the sources in [`src/posts/`](./src/posts/).

## Post library

Each post in [`src/posts/`](./src/posts/) is a markdown file with YAML
frontmatter:

```yaml
---
title: Uber — Ride Hailing
difficulty: easy # easy | medium | hard
category: travel # one of the coarse buckets below
author: Hieu Doan
tags: delivery, matching, mobile, payments
---
```

`difficulty` is derived from answer depth and diagram complexity; `category` is
one of: `infrastructure`, `storage`, `security`, `search`, `ai`, `social`,
`communication`, `media`, `productivity`, `ecommerce`, `finance`, `travel`,
`gaming`.

## Development Commands

| Task       | Command                                               |
| ---------- | ----------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/diagram`      |
| Build      | `pnpm build --filter=@hieudoanm.github.io/diagram`    |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/diagram`     |
| Format     | `pnpm format --filter=@hieudoanm.github.io/diagram`   |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/diagram`     |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/diagram` |

## Documentation

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — pipeline and module layout
- [`docs/SYNTAX.md`](./docs/SYNTAX.md) — full DSL reference
- [`/posts/`](/posts/) — 128 example interviews with questions, answers, and
  diagrams (sources live in [`src/posts/`](./src/posts/))
- [`docs/ROADMAP.md`](./docs/ROADMAP.md) — planned work
- [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md) — development workflow
- [`docs/PACKAGING.md`](./docs/PACKAGING.md) — shipping checklist
- [`docs/DOWNLOADS.md`](./docs/DOWNLOADS.md) — prebuilt downloads
