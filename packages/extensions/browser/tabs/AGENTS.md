# Tabs - redirect new tabs to the hieudoanm home page and capture the current view or the full scrolling page as PNG/JPEG/WebP, copy or download.

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                              |
| ---------------------- | --------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, build pipeline, MV2/MV3 strategy        |
| `docs/ROADMAP.md`      | Phased feature roadmap with progress tracking       |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions |
| `docs/PACKAGING.md`    | Packaging and store-submission checklist            |
| `docs/DOWNLOADS.md`    | Download links per browser                          |

## Key Conventions

- New-tab interception lives entirely in the background; the redirect target is
  the single constant `TARGET_URL` in `src/lib/newtab.ts` — the only place to
  change the landing URL
- Listen on both `tabs.onCreated` (via `pendingUrl`, fires before navigation
  completes) and `tabs.onUpdated` (catches late navigations into
  `chrome://newtab`); redirect **only** new-tab / home / private-browsing URLs
  and leave every other URL untouched
- The popup checkbox `redirectNewTabs` (default on) is persisted in
  `storage.sync`; the background reads it before each redirect
- The block list lives in `src/lib/block.ts` (`BLOCKED_DOMAINS`): facebook,
  x/twitter, instagram, reddit, tiktok, youtube, netflix, twitch, discord —
  when one loads, `maybeRenderBlockWall()` in `src/content.ts` replaces the
  page with the offline focus wall built from `BETTER_SITES` and `SUGGESTIONS`;
  the `blockDistractingSites` toggle (default on, `storage.sync`) gates it and
  is the only config the wall reads
- Ad blocking lives in `src/lib/ads.ts`: `AD_SELECTORS` hides ad banners via an
  idempotent `MutationObserver`, `AD_NETWORK_DOMAINS` feeds the network blocker;
  the `blockAds` toggle (default on, `storage.sync`) gates it, with MV2 network
  blocking in `background.ts` via `webRequest` and MV3 via the static DNR
  ruleset `ruleset_block` in `public/manifest/v3/rules.json` — keep the two
  domain lists in sync
- Keep `BETTER_SITES` (jump shortcuts) and `SUGGESTIONS` (spin-wheel ideas)
  family-friendly and dependency-free; they render without any network call
- The block wall and the capture content script coexist in `content.ts`: the
  block only fires on a blocked domain, the capture listeners only answer
  `SNAP_` messages — never let the wall intercept non-blocked pages
- Two message actions arrive from the popup: `captureView` and
  `captureFullPage`; both respond with `{ dataUrl }` or `{ error }` and the
  background **must return `true`** from the listener to keep the channel open
  for async capture
- Full-page capture is split: the content script measures layout only
  (`scrollHeight`/`clientHeight`/`scrollY`/`dpr`) and drives scrolling; the
  background scrolls `clientHeight`-sized steps with `SETTLE_EXTRA_MS = 80`
  settle time, then `stitchChunks()` in `src/lib/stitch.ts` composites chunks
  on an `OffscreenCanvas` (white fill, `createImageBitmap` decode, then
  `convertToBlob` → PNG data URL)
- Formats other than PNG/JPEG are re-encoded server-side of the document (in
  the background) with default quality 92; keep capture math in the background
  and pure image work in `src/lib/stitch.ts`
- Popup flow stays idempotent: single `lastDataUrl` + filename, busy guard;
  autodownload default is PNG named from the tab's hostname/path
- Errors are prefixed `Snapshot:` so they read consistently in the popup
  status line; never dump raw data URLs to logs
- Cross-browser: Chromium (MV3) + Firefox (MV2)
- Everything runs fully offline: redirect target, block wall, ad blocking,
  and capture all work with no network calls and no data leaving the page or
  device
