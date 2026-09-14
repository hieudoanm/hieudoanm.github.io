# Architecture

## Tech Stack

| Layer       | Choice                                                          |
| ----------- | --------------------------------------------------------------- |
| Language    | Go 1.26+ (module `github.com/hieudoanm/browserverless`)         |
| Engine      | `github.com/go-webengine/engine` (pure-Go, CGO=0)               |
| Concurrency | Goroutine-per-request (net/http default)                        |
| Storage     | Stateless — every request renders independently                 |
| Testing     | Standard `go test`, table-driven tests, local httptest fixtures |
| CLI         | `flag.NewFlagSet`, flags-before-positional-URL convention       |

## Directory Structure

```txt
go/
├── main.go                     # Entrypoint (package main), CLI dispatch
├── go.mod / go.sum             # Module definition
├── Makefile                    # build, test, format, lint, build-all, coverage
├── Dockerfile                  # Multi-stage scratch image
├── .dockerignore
├── scripts/install.sh          # curl-based binary installer
├── internal/
│   ├── headless/               # go-webengine wrapper (Browser, Scrape, Screenshot)
│   │   ├── headless.go
│   │   └── headless_test.go
│   ├── server/                 # HTTP handler, server lifecycle, OpenAPI, docs page
│   │   ├── handler.go
│   │   ├── handler_test.go
│   │   ├── server.go
│   │   ├── server_test.go
│   │   ├── docs.go
│   │   ├── resources.go        # //go:embed openapi.json
│   │   └── openapi.json
│   └── version/
│       └── version.go          # var Version (override with -ldflags)
├── tests/
│   └── integration_test.go     # E2E: real binary, live serve API + CLI
├── docs/                       # These documents
└── AGENTS.md / README.md
```

## Entrypoint (`main.go`)

`main.go` is the module root (`package main`). It:

1. Dispatches to `screenshot`, `scrape`, `serve`, `health`, `help`, `version`
2. Parses flags with `flag.NewFlagSet` per subcommand
3. Creates an `internal/headless.Browser` (or passes it to `internal/server.Serve`)
4. `health` performs an HTTP GET against `/api/v1/health` — used for Docker
   `HEALTHCHECK`

The entrypoint is thin — all rendering and HTTP logic lives in `internal/`.

## Request Flow (CLI)

```
main.go  →  headless.Browser.Screenshot(ctx, url)
            headless.Browser.Scrape(ctx, url)
  │
  ├─ Scrape:  engine.Fetch(ctx, url) → Document { URL, Title, HTML }
  └─ Screenshot: engine.Render(ctx, url, rect) → image.RGBA + RenderInfo
                  engine.EncodePNG(img)         → []byte
```

## Request Flow (Server)

```
net/http ServeHTTP
  → Handler.ServeHTTP
    → route()
      ├─ GET /api/v1/health         → 200 {"status":"ok"}
      ├─ GET /api/v1/version        → 200 version.Version
      ├─ GET /api/v1/openapi.json   → 200 embedded spec
      ├─ GET /docs                  → 200 Redoc HTML page
      ├─ POST /api/v1/scrape        → scrapeTarget → renderer.Scrape → 200 text/html
      ├─ POST /api/v1/screenshot    → screenshotTarget → renderer.Screenshot → 200 image/png
      ├─ 405 on non-POST to scrape/screenshot
      └─ 404 default
```

Every 200 scrape/screenshot response carries metadata headers:

```
x-browserverless-url          final URL after redirects
x-browserverless-title        page title
x-browserverless-load-status  "ok" (always; "partial" not emitted in Go)
x-browserverless-memory-kb    heap allocation increase for the request
x-browserverless-duration-ms  wall time in milliseconds
```

## Modules

### `internal/headless`

Thin wrapper around `go-webengine/engine`. Exposes `Browser` with two methods:

- `Scrape(ctx, url) (ScrapeResult, error)` — returns decoded UTF-8 HTML, URL,
  title. TimedOut is always `false` (documented deviation from Rust).
- `Screenshot(ctx, url) (ScreenshotResult, error)` — renders to the viewport
  rectangle then encodes as PNG.

Timeouts are applied via `context.WithTimeout` and classified with
`errors.Is(err, context.DeadlineExceeded)`.

### `internal/server`

`Renderer` interface (`Scrape` / `Screenshot`), `Handler` (http.Handler), and
`Serve(ctx, Config)` which:

1. Resolves the bind address (`resolveBind`)
2. Opens a TCP listener
3. Prints a boxed banner with LAN IP
4. Starts `http.Server.Serve`
5. Shuts down cleanly on SIGINT/SIGTERM

Request logging writes to stdout in Rust-compatible format:

```
[15:04:05] req=3 POST /api/v1/scrape -> 200 (230ms)
```

ANSI color when stdout is a TTY.

### `internal/version`

Single `var Version = "0.1.0"`. Override at build time:

```bash
go build -ldflags "-X github.com/hieudoanm/browserverless/internal/version.Version=1.2.3"
```

## URL Policy

Only `http` and `https` schemes are accepted (identical to the Rust reference).
`file://`, `data:`, `javascript:`, and other schemes return 400. No
localhost/private-network blocking is implemented yet (see ROADMAP).

## Configuration

| Flag        | Default           | Purpose                       |
| ----------- | ----------------- | ----------------------------- |
| `--bind`    | `127.0.0.1:8080`  | Listen address for serve mode |
| `--port`    | (none, uses bind) | Overrides port in `--bind`    |
| `--width`   | `1280`            | Viewport width                |
| `--height`  | `720`             | Viewport height               |
| `--timeout` | `30000` ms        | Per-request load timeout (ms) |
| `--output`  | `screenshot.png`  | Screenshot output path        |

No environment variables are read.
