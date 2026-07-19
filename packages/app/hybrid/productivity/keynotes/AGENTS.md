# Agents

Keynotes is an offline-first, in-browser presentation tool (Next.js App Router,
static export, IndexedDB storage). Use this file to understand the project
before making changes.

## Project overview

- **Stack**: Next.js 16 (App Router, Turbopack, `output: export`), React 19,
  Tailwind 4 + DaisyUI, `idb` for IndexedDB, react-icons, Jest + Testing
  Library, Playwright, Tauri 2 (planned).
- **Data**: decks, slides, and settings live in IndexedDB via `src/lib/db.ts`.
  There is no backend; realtime collaboration is a mock over `BroadcastChannel`.
- **State**: `src/providers/DeckProvider.tsx` owns deck state, undo/redo,
  autosave, and the realtime mock. Consume it with the `useDeck()` hook.
- **Rendering**: the canvas renders `SlideObject`s through
  `src/components/canvas/ObjectRenderer.tsx`; `SlidePreview` renders static
  scaled slides; `PresentSlide` renders animated present mode.

## Commands

```bash
pnpm dev          # dev server (Turbopack)
pnpm build        # static export to out/ (uses generateStaticParams)
pnpm lint         # eslint . --fix
pnpm format       # prettier
pnpm test         # jest --passWithNoTests
pnpm exec jest <path>            # single test file
pnpm exec jest --coverage        # with coverage thresholds
pnpm exec tsc --noEmit           # typecheck
pnpm test:e2e     # playwright
```

## Conventions

1. **Static export constraints**: dynamic routes must define
   `generateStaticParams`. `use client` pages cannot export it — use a server
   `page.tsx` wrapper that returns a single default export from a sibling client
   component. `generateStaticParams` must return at least one route (e.g.
   `[{ id: 'new' }]`).
2. **Animation triggers**: `AnimationTrigger` is `'click' | 'with' | 'after'`.
   `src/components/present/presentSteps.ts` groups `'with'` objects into the
   previous step.
3. **Object rendering**: hidden animated objects in present mode must be hidden
   via an inline `opacity: 0` style override, not an `opacity-0` class
   (ObjectRenderer sets `opacity: obj.opacity` inline, which overrides classes).
4. **Icons**: `react-icons/fi` omits some icons (`FiRows`, `FiReply`,
   `FiStrikethrough`, `FiPalette`). Use `FiList`, `FiCornerUpLeft`, `FiType`,
   `FiDroplet` instead.
5. **Exports**: use the existing live names in `src/utils/exporters.ts`
   (`exportDeckJson`, `exportHtmlFile`, `exportPptxMock`, `exportSlidePng`,
   `exportSlideSvg`). There is no `exportToPdf` / `exportToPptx`.
6. **Types**: `src/types/deck.ts` is the single source of truth. `ShapeType` has
   no `'circle'` — use `'ellipse'`. `DeckSnapshot` requires a `label`.
7. **File size**: keep files ≤ 200 lines and functions ≤ 30 lines where
   practical. This is a documented tradeoff for `DeckProvider.tsx` and
   `SlideCanvas.tsx`.
8. **Testing**: unit tests live next to sources in `__tests__/` using Jest +
   Testing Library (jsdom). Mock `idb` with the in-memory pattern used in
   `src/lib/__tests__/db.test.ts`. Set `NEXT_PUBLIC_MOCK_DELAY` to a truthy
   value (e.g. `'1'`) in tests — `'0'` is falsy in `getMockDelay` and falls back
   to 800ms.

## Where things live

- Pages: `src/app/` (home, editor, present, presenter, print, templates)
- Canvas & rendering: `src/components/canvas/`
- Panels: `src/components/organisms/panels/`
- Present mode: `src/components/present/`
- Pure logic: `src/utils/` (geometry, color, animations, deckFactory, format,
  exporters)
- Docs: `docs/` (ROADMAP, FEATURES, ARCHITECTURE, CONTRIBUTING, PACKAGING,
  DOWNLOADS)
