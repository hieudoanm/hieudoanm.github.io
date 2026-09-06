# Browserverless

A lightweight browser runtime built on the **Servo** engine, with one Rust codebase and
two execution modes:

- **Headed** — interactive desktop window (winit + Servo `WindowRenderingContext`).
- **Headless** — offscreen rendering and PNG screenshots (Servo `SoftwareRenderingContext`),
  no window, desktop session, or monitor required.

The project intentionally does **not** roll its own HTML/CSS/JS engine and never embedded
Chromium/WebKit/Gecko. Servo owns the web platform; this repo is a thin embedder shell.

## Workspace

| Crate                                       | Responsibility                                  |
| ------------------------------------------- | ----------------------------------------------- |
| `crates/browserverless` (`browserverless`)  | Servo integration boundary: `BrowserContext`, `Page`, rendering setup |
| `crates/headless` (`headless`)              | Offscreen execution: load → wait → screenshot   |
| `crates/cli` (`browserverless-cli`)         | clap CLI + process startup                       |

The bin is `browserverless`; the compile package is `browserverless-cli`.

## Build

```bash
cargo build                    # workspace debug build
cargo build --release
```

## Run

```bash
# Screenshot a URL (headless)
cargo run -p browserverless-cli -- screenshot \
  https://example.com --output /tmp/example.png \
  --width 1280 --height 720 --timeout 60000

# Scrape the full HTML of a URL to a file (headless)
cargo run -p browserverless-cli -- scrape \
  https://example.com --output /tmp/example.html --timeout 60000

# Headless load-and-exit
cargo run -p browserverless-cli -- headless https://example.com --timeout 30000

# Measure peak RSS + duration for a URL (headless)
cargo run -p browserverless-cli -- memory \
  https://example.com --timeout 60000 --observe 8000

# Serve the headless rendering web API on http://127.0.0.1:8080
cargo run -p browserverless-cli -- serve --bind 127.0.0.1:8080

# Headed window (currently loads a hardcoded https://example.com)
cargo run -p browserverless-cli -- open
```

CLI flags: `screenshot <url> [--output screenshot.png] [--width 1280]
[--height 720] [--timeout 30000]`; `scrape <url> [-o page.html] [--timeout 30000]`
(omit `-o` to print to stdout); `memory <url> [--timeout 30000] [--observe 5000]`;
`serve [--bind 127.0.0.1:8080] [--port 8080] [--width 1280] [--height 720]
[--timeout 30000]` (`--port` overrides the port in `--bind`).
The URL is positional and must be absolute (`file://`, `http://`, `https://`).
Use a release build for meaningful timings (`cargo build --release`).

On startup the server prints a boxed banner with the `http://ip:port` URL and the
raw `ip:port`, using the machine's external (LAN) IP when discoverable. Each
request is logged to stdout as `[timestamp] req=N <METHOD> <path> -> <status>
(<duration>ms)`, e.g.

```text
[2026-08-28 09:10:42] req=1 POST /api/v1/scrape -> 200 (459ms)
```

### Server API

```text
GET  /api/v1/health            -> 200 {"status":"ok"}
GET  /api/v1/version           -> 200 <crate version>
POST /api/v1/scrape            -> 200 <full HTML of url> (text/html)
POST /api/v1/screenshot        -> 200 <PNG of url> (image/png)
                                  body: {"url": "https://..."}
```

The scrape body is the page's full HTML; the screenshot body is the page rendered
at the serve viewport (`--width`/`--height`, default 1280x720). Both carry
metadata about the URL and the request cost as response headers:

```
x-browserverless-url:          final URL after redirects (location.href)
x-browserverless-title:        page title (document.title)
x-browserverless-load-status:  "ok" or "partial" (timed out before full load)
x-browserverless-memory-kb:    peak RSS increase attributed to the request
x-browserverless-duration-ms:  wall time for the request
```

Only `http`/`https` targets are allowed (400 otherwise); missing `url` or invalid
JSON body is 400; a non-POST on `/api/v1/scrape` or `/api/v1/screenshot` is 405;
unknown paths are 404; render timeouts are 504. Details in `docs/SERVER.md`.

## Test / check

```bash
cargo test --workspace
cargo fmt --all --check
cargo clippy --workspace --all-targets -- -D warnings
```

CI runs these gates in `.github/workflows/ci-app-native-rust-browserverless.yaml`.

## Docs for agents

- `docs/ARCHITECTURE.md` — real architecture, data flow, invariants.
- `docs/HEADLESS.md` — headless pipeline + public API + pixel capture.
- `docs/DEVELOPMENT.md` — build/run/test, troubleshooting, Servo upgrade steps.
- `docs/SERVER.md` — server-mode design and the hard constraints that shape it.
- `docs/COMPATIBILITY.md` — verified render targets and known limitations.
- `docs/servo-patches.md` — Servo-specific workarounds and regression evidence.
- `docs/ROADMAP.md` — phase status vs `AGENTS.md` §46.

## Known constraints (summary)

- Servo initializes **once per process** (`opts`/`prefs` are process-global).
- Use one page per `BrowserContext`; multi-page in one context is unreliable today.
- Initial navigation must be passed via `WebViewBuilder::url()`, not `webview.load()`
  afterwards (a load race produced the all-white-screenshot bug; now fixed with a
  regression test). Details in `docs/servo-patches.md`.

## License

MIT (see `LICENSE`).