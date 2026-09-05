# Roadmap

## Phase 1 — Core Redirect

> Foundation: every new tab lands on the hieudoanm home page.

- [x] `TARGET_URL` constant pointing at `https://hieudoanm.github.io/app/`
- [x] `isNewTab()` prefix matching for chrome://newtab, about:newtab,
      about:home, about:privatebrowsing
- [x] `tabs.onCreated` hook covering `tab.url` and `tab.pendingUrl`
- [x] `tabs.onUpdated` hook covering `changeInfo.url`
- [x] `chrome.tabs.update` redirect with no user-visible UI
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Robustness

> Hardening: cover edge cases across browsers.

- [ ] Handle `edge://newtab` and `brave://newtab` prefixes on Chromium edges
- [ ] Avoid redirect loops when the home page itself is opened in a new tab
- [ ] Respect user intent — only redirect genuine default new-tab URLs, never
      about:blank or mid-session navigations

## Phase 3 — User Control

> UX: optional configurability.

- [ ] Options page to customize `TARGET_URL`
- [ ] Toggle "redirect new private windows" separately (Firefox)
- [ ] `storage` synchronization of preferences across devices

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO