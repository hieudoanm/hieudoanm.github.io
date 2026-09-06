# Bored - block distracting sites and, instead of staring at a wall, spin a wheel to find something better to do.

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

- The block list lives in `src/content.ts` (`BLOCKED_DOMAINS`): facebook,
  x/twitter, instagram, reddit, tiktok, youtube, netflix, twitch, discord —
  when one loads, the content script replaces the page with the "bored"
  interstitial built from `BETTER_SITES` and `SUGGESTIONS`
- Keep `BETTER_SITES` (redirect shortcuts) and `SUGGESTIONS` (spin-wheel ideas)
  family-friendly and dependency-free; they render without any network call
- Content script is self-contained and offline-only; nothing about the user's
  browsing ever leaves the page
- Cross-browser: Chromium (MV3) + Firefox (MV2)
