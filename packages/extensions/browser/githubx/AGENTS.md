# GitHubX - GitHub extension: keep you on github.com by sending external links to new tabs.

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

- One delegated click listener on `document`; `getAbsoluteUrl()` resolves
  protocol-relative, root-relative, and directory-relative hrefs against
  `github.com` before deciding
- Links that resolve outside `github.com` are `preventDefault()`-ed and opened
  via `window.open(url, '_blank')`; in-repo link clicks pass through untouched
- Skip `#` hash links and `javascript:` hrefs; never interfere with modifier
  keys, drags, or programmatic click() calls — only real user clicks on `<a>`
- No network calls, no storage, no background worker — pure click routing
- Cross-browser: Chromium (MV3) + Firefox (MV2)
