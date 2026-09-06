# Roadmap

## Phase 1 — Core Hiding

> Foundation: hide ratings and usernames on every chess.com page.

- [x] `HIDE_CLASSES` list — live-game start/over, tagline rating, username,
      `user-rating`
- [x] `hideElement()` — `display: none` via `getElementsByClassName`
- [x] `hideRatings()` — one pass over the fixed class list
- [x] `MutationObserver` re-hide on added/removed nodes (document subtrees)
- [x] WebKit fallback (`WebKitMutationObserver`)
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Refinements

> Polish: keep hiding accurate as chess.com evolves.

- [ ] Configurable selector set + class names (roadmap-only class changes)
- [ ] Support chess.com page variants that restructure tagline markup
- [ ] Debounce the observer callback to batch rapid DOM churn

## Phase 3 — User Control

> UX: optional preferences with a minimal options page.

- [ ] Options page to enable/disable hiding per element type
- [ ] Allow hiding ratings only (keep usernames) and vice versa
- [ ] `storage` synchronization of preferences across devices

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO
