# ClaudeX - Claude.ai extension: track API rate-limit usage with a toolbar badge.

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

- Two surfaces, two storage channels, one shape: the content script keeps
  `localStorage['claude_limit_data']` and renders the inline indicator; the
  background keeps `chrome.storage.local['claudeLimit']` and drives the action
  badge. When parsing changes, update **both** `src/content.ts` and
  `src/background.ts`
- Only inspect responses whose URL contains `/rate_limits` or `/usage`
  (`WATCHED` list); parse tolerantly across response shapes (top-level array,
  `rate_limits`/`limits` objects, usage objects, `*_message_count` fallbacks)
- Daily/weekly percentage drives the badge: ≥90 red `#e53e3e`, ≥60 amber
  `#d69e2e`, otherwise green `#38a169`; clear the badge when no data exists
- Never log or expose message body contents; content-script logs are prefixed
  `[ClaudeX]` and kept at `console.debug` for parse errors
- Prompt units are picked from `claude-limit-indicator` / `claude-limit-styles`
  DOM ids and the retry window (MutationObserver + 1s/3s fallbacks, 60s
  refresh) — keep mounts idempotent (`replaceWith`, never duplicate)
- Cross-browser: Chromium (MV3, `chrome.action`) + Firefox (MV2,
  `chrome.browserAction`) — resolve the badge API via the `action ?? browserAction`
  fallback
