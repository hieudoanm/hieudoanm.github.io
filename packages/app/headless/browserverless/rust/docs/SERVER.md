# Server mode

Implemented as the `browserverless serve` subcommand (`crates/cli/src/serve.rs`,
exposed through the `browserverless_cli::serve` lib module). Thin HTTP layer over
`headless::HeadlessBrowser` — never a custom HTML renderer; Servo renders.

## Endpoints

```text
GET  /api/v1/health            -> 200 {"status":"ok"}
GET  /api/v1/version           -> 200 <crate version>
POST /api/v1/scrape            -> 200 <full HTML of url> (text/html; charset=utf-8)
POST /api/v1/screenshot        -> 200 <PNG of url> (image/png)
```

`POST /api/v1/scrape` and `POST /api/v1/screenshot` take a JSON body:

```json
{ "url": "https://example.com/" }
```

The `url` field is parsed with a minimal std-only JSON string extractor (supports
standard string escapes; surrogate pairs are not decoded). Errors are JSON
`{"error":"..."}`:

- `400` — missing `url`, malformed JSON body, non-string `url`, invalid/unsupported
  URL scheme
- `404` — unknown path
- `405` — non-POST on `/api/v1/scrape` or `/api/v1/screenshot`
- `504` — render timed out (load timeout exceeded)
- `500` — other render failures

Request bodies are capped at 64 KiB.

### Scrape / screenshot metadata

The 200 scrape body is the raw page HTML; the 200 screenshot body is the page
rendered at the serve viewport (`--width`/`--height`, default 1280x720) encoded
as PNG. Metadata about the URL and request cost is returned as headers on both:

```
x-browserverless-url:          final URL after redirects (location.href)
x-browserverless-title:        page title; empty string when unavailable
x-browserverless-load-status:  "ok" or "partial" (load timed out; partial DOM)
x-browserverless-memory-kb:    process peak-RSS increase for the request
x-browserverless-duration-ms:  wall time for the request
```

Header values are ASCII-sanitized (non-ASCII/control characters become `?`).

## How it honors the hard constraints

1. **One Servo instance per OS process** (`servo-config` opts are process-global
   anyway) → the server builds exactly one `HeadlessBrowser` and serializes every
   request through a single accept loop on its own dedicated thread.
2. **Multiple pages in one `BrowserContext` are not reliable yet** → each request
   creates one `Page` via `HeadlessBrowser` internals and drops it before the next
   request, in line with the one-page-at-a-time model. Known limitation: a
   long-lived single context is reused across requests (see `servo-patches.md` #6);
   a per-request fork/heavier isolation is out of MVP scope.
3. **`SoftwareRenderingContext` needs a dedicated thread** → the whole server (Servo
   init + accept + render) runs on one worker thread, never an async executor.

## URL policy (AGENTS.md §21)

MVP is explicit trusted mode and the insecure behavior is documented:
only `http`/`https` schemes are accepted. Blocked: `file`, `data`, `javascript`,
custom schemes. Not yet implemented (hardening phase): blocking localhost/private
networks/link-local, domain allowlists.

## Limits (AGENTS.md §36) and logging (AGENTS.md §34)

- Per-request load timeout (`--timeout`, default 30s).
- Max request body 64 KiB; response is the loaded page's serialized DOM.
- Every request logs a structured line at `info`:
  `request_id method target status duration_ms`. Never logs cookies/auth/body.

## Run

```bash
browserverless serve --bind 127.0.0.1:8080 --timeout 60000
curl -X POST 'http://127.0.0.1:8080/api/v1/scrape' \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com/"}'
curl -X POST 'http://127.0.0.1:8080/api/v1/screenshot' \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com/"}' -o screenshot.png
```

`--port <PORT>` overrides the port in `--bind` (default 8080). On startup a boxed
banner shows the listening URL (`http://ip:port`) and raw `ip:port`, using the
machine's external (LAN) IP when discoverable (falling back to the bound
address). Every request is written to stdout as
`[YYYY-MM-DD HH:MM:SS] req=<n> <METHOD> <path> -> <status> (<duration>ms)`.
When stdout is a terminal the banner and logs are ANSI-colored (status by class:
green 2xx, cyan 3xx, yellow 4xx, red 5xx); piped output stays plain.

## Tests

`crates/cli/tests/serve_api.rs` plus unit tests in `serve.rs`. One caveat: Servo
is process-global, so the test binary contains a **single** integration test that
exercises health/version/scrape/screenshot/scheme-blocking/400/404/405 in one
process.

## Out of MVP scope (hardening, AGENTS.md §8)

Separate `server` crate + `browserverless-server` bin, concurrency limits,
request cancellation, JSON + full render (PNG) endpoints, SSRF hardening
(private-network blocking, allowlists), graceful shutdown, memory limits.