# Roadmap

## Phase 1 — Core Feature Set

> Foundation: all four site enhancements working on both manifest versions.

- [x] Claude.ai rate-limit tracking — content indicator (daily/weekly + reset)
- [x] Claude.ai rate-limit tracking — background badge (green/yellow/red)
- [x] Claude usage persistence (`localStorage` + `chrome.storage.local`)
- [x] Shopify / Shopify Plus detection with `CHECK_SHOPIFY` message replies
- [x] chess.com rating + username hiding with `MutationObserver`
- [x] YouTube caption-track transcript extraction
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Robustness

> Hardening: fewer false positives and friendlier failures.

- [ ] Fall back gracefully when `ytInitialPlayerResponse` is missing (SDC
      alternative transcript sources)
- [ ] Retry/backoff for the Claude indicator remount to cut flakiness
- [ ] Persist "currently shown" indicator state to avoid duplicate widgets
- [ ] Add the Claude weekly period into the badge tooltip

## Phase 3 — User Control

> UX: an options page to tune per-feature behaviour.

- [ ] Toggle each of the four features independently
- [ ] Chess focus: configurable selector set + class names
- [ ] Shopify: enable/disable silent detection + notification
- [ ] Badge threshold values configurable (defaults 60/90)
- [ ] `storage` synchronization of preferences across devices

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO
