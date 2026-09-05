# Roadmap

## Phase 1 — Core Interception

> Foundation: open external links in a new tab from every GitHub page.

- [x] `document`-level `click` listener with `closest('a')` ancestor lookup
- [x] `isGitHubUrl()` external-link detection (non-github.com → new tab)
- [x] `getAbsoluteUrl()` relative-href resolution against `https://github.com`
- [x] Skip `#` fragment and `javascript:` URIs
- [x] `event.preventDefault()` + `window.open(url, '_blank')` navigation
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Refinements

> Polish: smarter link handling and fewer surprises.

- [ ] Preserve modifiers — respect `Ctrl/Cmd+click` (new tab already) without
      double-opening
- [ ] Open in background tab via `browser.tabs` when modifier + middle click
- [ ] Handle `ghcr.io`, `gist.githubusercontent.com`, and other GitHub subdomains
      as "internal"
- [ ] Skip links already targeting `_blank` (author opted out)

## Phase 3 — User Control

> UX: optional toggles with a minimal options page.

- [ ] Options page to choose "new tab vs. same tab" for external links
- [ ] Allow-list of additional domains to treat as internal
- [ ] `storage` synchronization of preferences across devices

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO