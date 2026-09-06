# New Tab - haven on every new tab: redirect to the hieudoanm home app instead of the browser's default new-tab page.

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

- The redirect target is the single constant `TARGET_URL` in
  `src/background.ts` — the only place to change the landing URL
- Listen on both `tabs.onCreated` (via `pendingUrl`, fires before navigation
  completes) and `tabs.onUpdated` (catches late navigations into
  `chrome://newtab`)
- Redirect **only** new-tab / home / private-browsing URLs
  (`chrome://newtab`, `about:newtab`, `about:home`, `about:privatebrowsing`);
  every other URL is left completely untouched
- Content script-free by design; no storage, minimal permissions (`tabs`)
- Cross-browser: Chromium (MV3) + Firefox (MV2)
