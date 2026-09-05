# Roadmap

## Phase 1 — Core Capture

> Foundation: capture the view or the full page from the popup.

- [x] Popup with "Capture view" / "Capture full page" actions
- [x] `CAPTURE_VIEW` / `CAPTURE_FULLPAGE` message dispatch in background
- [x] `SNAP_GET_LAYOUT` content metrics (scrollY, innerHeight, document size)
- [x] `SNAP_SCROLL_TO` chunk-wise scrolling for tall pages
- [x] `stitchChunks` `OffscreenCanvas` composition preserving aspect ratio
- [x] `downloads.download` delivery of the finished image
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Refinements

> Polish: richer output and tricky pages.

- [ ] Copy-to-clipboard via `clipboard.write` (blocked on protected pages)
- [ ] Format picker (PNG / JPEG) and quality slider
- [ ] Custom filename pattern in `storage`
- [ ] Handle full-page capture on fixed-background and lazy-loading pages

## Phase 3 — Advanced Capture

> Power: selection and PDF.

- [ ] Region selection (drag a box over the viewport to capture)
- [ ] Element capture via right-click context menu
- [ ] Multi-page "capture scroll container" support for embedded scrollers

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO