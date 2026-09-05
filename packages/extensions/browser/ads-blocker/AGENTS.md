# Agents

# Ads Blocker - block ads and banners across every web page.

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

- MV3 network blocking lives in `public/manifest/v3/rules.json` (DNR), MV2 in
  `src/background.ts` (`webRequest`) — keep the two domain lists in sync
- Content script in `src/content.ts` is idempotent and offline-only
- `console.*` logs prefixed with `[AdBlocker]`
- Cross-browser: Chromium (MV3) + Firefox (MV2)
