# Roadmap

## Phase 1 — Core Detection

> Foundation: detect Shopify and Shopify Plus on both manifest versions.

- [x] Shopify detection: `window.Shopify`, checkout meta tag, `cdn.shopify.com`
      scripts, `/cart.js`
- [x] Shopify Plus detection: `checkout.shopify`, `Shopify.checkout`, wallet meta
- [x] Typed `ShopifyDetectionResult` with full indicator breakdown
- [x] `CHECK_SHOPIFY` message replies
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Robustness

> Hardening: fewer false positives and friendlier failures.

- [ ] Re-check detection on SPA route changes (some storefronts replace the
      document on navigation)
- [ ] Debounce repeated `CHECK_SHOPIFY` replies to avoid stale results
- [ ] Validate signals against a timeout so slow loads don't yield `false`

## Phase 3 — User Control

> UX: an options page and a toolbar affordance.

- [ ] Popup showing the detected result with per-indicator toggles
- [ ] Enable/disable silent detection + notification per site
- [ ] `storage` synchronization of preferences across devices

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO
