# Resume Builder — Documentation

Free Resume Builder is a simple, **fully offline** resume editor: write your
details, pick one of 32 templates, preview on real paper sizes, and export to
HTML / print to PDF. It runs as a static PWA and a Tauri desktop app — no
backend, no accounts, no network.

## Contents

- [Architecture](./architecture.md) — structure, data flow, build/deploy model
- [Data model](./data-model.md) — `ResumeData`, persistence, JSON/YAML import &
  export
- [Templates](./templates.md) — how templates work and how to add a new one
- [Development](./development.md) — setup, commands, testing, quality gates

## At a glance

| Area        | Detail                                                            |
| ----------- | ----------------------------------------------------------------- |
| Pages       | `/` builder · `/about/` · `/version/` · 404 / error               |
| Editor tabs | Editor · Templates (32) · Data (import/export)                    |
| Paper sizes | A3 · A4 · A5 · A6 · B5                                            |
| Export      | HTML file download · Print / PDF via `window.print()`             |
| Persistence | `localStorage` (`resume.data`, `resume.template`, `resume.paper`) |
| Runtime     | Next.js static export (`out/`) + service worker + Tauri shell     |

## Quick start

```sh
pnpm install        # from the repo root (pnpm workspace)
pnpm dev            # http://localhost:3000
pnpm test           # unit tests (90% coverage gate)
pnpm build          # static export to out/
```

Everything is client-side; you can open the built `out/` directory without a
server.
