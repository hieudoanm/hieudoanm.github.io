# Roadmap

## Phase 1 — Core Tracking

> Foundation: track rate-limit usage on both manifest versions.

- [x] `window.fetch` patch for `/rate_limits` + `/usage` responses
- [x] Array parsing (`rate_limits` / `limits`) and object parsing
      (`daily` / `weekly` / `*_message_count`)
- [x] `localStorage` snapshot for the inline indicator
- [x] Inline daily/weekly indicator with reset countdowns
- [x] `MutationObserver` + retry remount of the indicator
- [x] `chrome.storage.local` badge state (`claudeLimit`)
- [x] Toolbar badge with green/yellow/red thresholds
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Robustness

> Hardening: friendlier failures and fewer false positives.

- [ ] Send `CLAUDE_API_RESPONSE` messages from content → background so the
      badge updates from live responses, not just storage changes
- [ ] Retry/backoff for the indicator remount to cut flakiness
- [ ] Persist "currently shown" indicator state to avoid duplicate widgets
- [ ] Add the weekly period into the badge tooltip

## Phase 3 — User Control

> UX: an options page to tune behaviour.

- [ ] Toggle inline indicator vs. badge independently
- [ ] Badge threshold values configurable (defaults 60/90)
- [ ] Choose daily vs. weekly emphasis on the badge
- [ ] `storage` synchronization of preferences across devices

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO
