# ChessX - Chess.com focus extension: hide ratings, live-game overlays, and user taglines.

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

- Every element to hide is named in the `HIDE_CLASSES` array in
  `src/content.ts` (live-game start/over overlays, user taglines, ratings) —
  re-verify this list whenever Chess.com markup changes
- A single `MutationObserver` (with `WebKitMutationObserver` fallback) on
  `childList` + `subtree` re-applies hiding after Chess.com's SPA re-renders;
  new matches must feed through `hideRatings()`
- Avoid expensive re-scans: only rerun when nodes are actually added/removed
- Activity is declarative and idempotent — it never mutates game state, clicks,
  or sends any data; no background worker, no storage, no permissions beyond
  what the manifest declares
- Cross-browser: Chromium (MV3) + Firefox (MV2)
