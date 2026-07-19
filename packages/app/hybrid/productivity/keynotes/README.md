# Open Keynotes

Keynotes is an offline-first, in-browser presentation tool modeled on
PowerPoint, Google Slides, and Apple Keynote. Everything runs in the browser:
decks, slides, and settings are stored in IndexedDB — no server required.

## Features

- **Editor** — deck/slide management, layouts, WYSIWYG canvas, rich text,
  multi-select, undo/redo, autosave, zoom & pan, page setup
- **Formatting** — fills, strokes, effects, themes, color tools, font controls,
  arrange/align/distribute, rotate & flip, grouping, position & size panel
- **Content** — images, media, charts, tables, diagrams, icons, equations,
  hyperlinks, embeds
- **Animation & transitions** — entrance/emphasis/exit animations, triggers,
  timing, slide transitions, auto-advance
- **Slide system** — slide master, template gallery, custom sizes, header &
  footer, speaker notes, outline view, sections, duplicate/hide slides
- **Presentation** — fullscreen mode, presenter view (next slide, notes, timer),
  Q&A, auto-advance
- **Import / export** — native JSON project files, export to PPTX (mock), PDF
  (print route), and HTML presentations
- **Collaboration** — realtime (mock via BroadcastChannel), threaded comments,
  version history (snapshots with restore)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs fully in the
browser; data lives in IndexedDB.

## Scripts

| Script          | Description                      |
| --------------- | -------------------------------- |
| `pnpm dev`      | Start the dev server (Turbopack) |
| `pnpm build`    | Static export to `out/`          |
| `pnpm start`    | Serve the production build       |
| `pnpm lint`     | ESLint (with `--fix`)            |
| `pnpm format`   | Prettier                         |
| `pnpm test`     | Jest unit tests                  |
| `pnpm test:e2e` | Playwright end-to-end tests      |
| `pnpm analyze`  | Bundle analysis                  |

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack, static export)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4 + [DaisyUI](https://daisyui.com)
- [idb](https://github.com/jakearchibald/idb) for IndexedDB storage
- [react-icons](https://react-icons.github.io/react-icons)
- Jest + Testing Library, Playwright
- Tauri 2 (desktop build planned, see Phase 9)

## Project structure

```
src/
  app/            Next.js App Router pages (home, editor, present, presenter, print, templates)
  components/     React components (canvas, panels, present, objects, organisms)
  data/           Themes, templates
  hooks/          Shared hooks
  lib/            IndexedDB data access
  providers/      DeckProvider (state, undo/redo, autosave, realtime mock)
  types/          Deck, slide, object, theme types
  utils/          Pure logic (geometry, color, animations, exporters, deck factory)
```

## Documentation

- [docs/ROADMAP.md](docs/ROADMAP.md) — phased feature roadmap
- [docs/FEATURES.md](docs/FEATURES.md) — feature overview
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — architecture notes
- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — contribution guide
- [docs/PACKAGING.md](docs/PACKAGING.md) — packaging & release notes
- [docs/DOWNLOADS.md](docs/DOWNLOADS.md) — download links

## License

GPL-3.0. See the repository root for details.
