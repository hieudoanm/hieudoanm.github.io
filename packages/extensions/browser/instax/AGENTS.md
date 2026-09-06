# InstaX - Instagram extension: double right-click a post to open every photo in new tabs.

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                              |
| ---------------------- | --------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, build pipeline, MV2/MV3 strategy        |
| `docs/ROADMAP.md`      | Phased feature roadmap with progress tracking       |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions |
| `docs/PACKAGING.md`    | Packaging and store-submission checklist            |
| `docs/DOWNLOADS.md`    | Download links per browser                          |

## Key Conventions

- The gesture is intended to be a **double right-click**: two `contextmenu`
  events within 400 ms, tracked by `lastRightClick`. Single right-clicks must
  keep behaving normally (context menu shows)
- Collect `<img>` sources from the right-clicked element **plus its siblings
  and their subtrees** (carousel images), `Set`-deduped and filtered to
  non-empty src — order: target images first, then siblings
- Open each source in a new tab with `noopener noreferrer` via a temporary
  anchor; the anchor is removed immediately after the click
- Keep the gesture gate (400 ms) and the selection scope explicit; the
  informative `console.log('Images found:', sources)` is the only log
- Cross-browser: Chromium (MV3) + Firefox (MV2)
