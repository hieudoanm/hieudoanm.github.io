# Roadmap

## Phase 1 — Core Gesture

> Foundation: open nearby images on a double right-click.

- [x] `contextmenu` listener with 400ms double-click window
- [x] `event.preventDefault()` to suppress the native menu on the gesture
- [x] Image collection from target + children + siblings
- [x] Deduplication by `src`
- [x] Open each image via hidden `<a target="_blank">` clicks
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Refinements

> Polish: broader capture and gentler gesture.

- [ ] Capture `<picture>` + `srcset` sources in addition to `<img>`
- [ ] Open at full original resolution by rewriting `cdninstagram` URLs
- [ ] Batch-open configurable (first N images vs. all)
- [ ] Visual flash/feedback when the gesture is accepted

## Phase 3 — User Control

> UX: an options page to tune behavior.

- [ ] Options page for the double-click delay (default 400ms)
- [ ] Toggle "include siblings" and "include child images"
- [ ] `storage` synchronization of preferences across devices

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO