# Roadmap

## Phase 1 — Core Wall

> Foundation: intercept the 10 distracting sites and show the suggestion wall.

- [x] `BLOCKED_DOMAINS` list matching (hostname + subdomains, `www.`-normalized)
- [x] `renderBlockedWall()` replaces the page DOM with the boredom wall
- [x] `BETTER_SITES` — 8 alternative sites presented as clickable links
- [x] Suggestion wheel with 20 offline activities and exponential spin easing
- [x] `sessionStorage` start-time tracking per session
- [x] Dual build output (`dist/v2`, `dist/v3`) with per-version manifests
- [x] Packaging pipeline: zip, xpi (`web-ext`), crx (Chrome)

## Phase 2 — Expanded Blocking

> Coverage: more distracting sites and smarter matching.

- [ ] Extend `BLOCKED_DOMAINS` with DNS-level distractors (e.g. `news.ycombinator.com`)
- [ ] Match on full URL paths (e.g. only `/feed`, `/explore`)
- [ ] Handle redirects that bounce through non-blocked domains
- [ ] Per-domain granular toggle without reinstalling

## Phase 3 — User Control

> UX: let users tune the wall without losing focus benefits.

- [ ] Options page to edit the blocked-domain list
- [ ] Allow-list (escape hatch for work-related use of a blocked site)
- [ ] Time-based budget (e.g. unblock after 25 minutes, then re-wall)
- [ ] `storage` synchronization of preferences across devices
- [ ] Popup with "saved you X minutes" counter

## Phase 4 — Store & Distribution

> Shipping: signed distributables on all three stores.

- [ ] Publish to the Chrome Web Store (MV3)
- [ ] Publish to Edge Add-ons
- [ ] Publish to Mozilla Add-ons (AMO) — MV2 / Firefox compatibility review
- [ ] Automated release tagging per `download/` artifacts
- [ ] Register with `browser_specific_settings.gecko.id` verified on AMO