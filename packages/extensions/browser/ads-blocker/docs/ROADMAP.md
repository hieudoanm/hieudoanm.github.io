# Roadmap

## Phase 1 — Core Blocking

> Foundation: network blocking on both manifest versions plus DOM hiding.

- [x] MV2 `webRequest` listener cancels requests to 6 ad/tracking domains
- [x] MV3 `declarativeNetRequest` static ruleset `rules.json` for the same domains
- [x] Content script hides ad containers via `AD_SELECTORS` + `important`
      `display: none`
- [x] `MutationObserver` re-hides dynamically injected ad elements
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Expanded Filtering

> Coverage: more ad networks and lazy-loaded/iframed ads.

- [ ] Extend the DNR ruleset and `AD_DOMAINS` with additional ad networks
      (e.g. `adform.net`, `criteo.com`, `rubiconproject.com`)
- [ ] Add cosmetic filters for common obfuscated ad classes
- [ ] Hide iframe-based ads that load into existing containers
- [ ] Add full-domain blocking (e.g. `adserver.example.com`) without
      side-scoping to user content
- [ ] Ship `rules.json` updates as separate versioned rulesets

## Phase 3 — User Control

> UX: a minimal options flow to toggle behaviour.

- [ ] Options page enabling/disabling the extension without uninstalling
- [ ] Per-site allow-list (escape hatch for false positives)
- [ ] Toggle individual ad-domain rules
- [ ] `storage` synchronization of preferences across devices
- [ ] Popup with a "blocked today" counter

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO
