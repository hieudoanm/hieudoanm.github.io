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
