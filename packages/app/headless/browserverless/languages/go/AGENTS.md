# Browserverless (Go)

> Lightweight headless browser server built on go-webengine — screenshot,
> scrape, and serve-mode execution from one static, pure-Go binary.

## Commands

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `go build ./...` | Compile all packages                      |
| `go test ./...`  | All unit + integration tests              |
| `go vet ./...`   | Static analysis                           |
| `gofmt -w .`     | Format all Go files                       |
| `make all`       | `format` + `lint` + `test` + `build`      |
| `make build`     | Build `bin/browserverless` (CGO disabled) |
| `make build-all` | Cross-compile 4 platforms into `bin/`     |
| `make test`      | `go test ./...`                           |
| `make lint`      | `go vet ./...`                            |
| `make format`    | `go fmt ./...`                            |
| `make coverage`  | Generate HTML coverage report             |
| `make tidy`      | `go mod tidy`                             |
| `make install`   | Install to `~/bin/browserverless`         |
| `make clean`     | Remove `./bin` and `./coverage`           |

## Key Conventions

- CLI entrypoint is `main.go`; subcommands `screenshot`, `scrape`, `serve`,
  `health`, `help`, `version` dispatched by hand-rolled `flag.NewFlagSet`.
  Keep the entrypoint thin — all logic lives in `internal/`.
- Standard Go layout: `main.go` + `internal/headless` (engine wrapper) +
  `internal/server` (HTTP handler + server lifecycle) + `internal/version`.
  Packages must not form import cycles.
- Engine: `github.com/go-webengine/engine` (pure-Go, CGO=0). The
  `internal/headless` package wraps `engine.Engine` behind a small
  `Browser` struct exposing `Scrape` and `Screenshot` only. Never call
  `engine.Engine` directly from outside `internal/headless`.
- `renderError` in `internal/server/handler.go` maps `context.DeadlineExceeded`
  → 504 and all other errors → 500. This is the single classification point.
- `internal/server/handler.go` uses `internal/version.Version` (a `var`) to
  stamp the OpenAPI spec and `/api/v1/version`. Override at build via
  `-ldflags "-X .../version.Version=x.y.z"`.
- Follow repo-wide Go rules from the root [AGENTS.md](../../../../../AGENTS.md):
  `error` last, handle errors explicitly, `var` zero-init over `:=`, no global
  state, table-driven tests, return early.
- Tests: `internal/headless` has unit tests (defaults, IsTimeout) plus a local
  httptest integration test that exercises Scrape and Screenshot over a local
  HTTP server — no external network required. `internal/server` has a fake
  renderer test for all HTTP routes (200/400/404/405/500/504). `main_test.go`
  tests CLI dispatch, flag help, and the `health` subcommand.
- The `tests/` package builds the real binary (`go build ./..`) and runs
  end-to-end tests over HTTP against live `serve` plus the CLI
  (`version`/`help`/`scrape`/`screenshot`/`health`) — the slow but
  authoritative gate. Renders target a local `httptest` fixture server, so no
  external network is required.
- API surface mirrors the Rust reference: GET `/api/v1/health`,
  `/api/v1/version`, `/api/v1/openapi.json`, `/docs`; POST `/api/v1/scrape`,
  `/api/v1/screenshot`. Meta headers (`x-browserverless-*`) on 200 responses.
- `--timeout` flag value in milliseconds (default 30000). Flags go before the
  positional URL: `browserverless screenshot --timeout 5000 <url>`.
- CI (`.github/workflows/ci-app-headless-browserverless.yaml`) runs the `go`
  job with `make lint`, `make test`, `make build-all` and uploads `bin/*` to
  the rolling `app-headless-browserverless-latest` release.

## Data

- Stateless HTTP server — every request spawns a fresh render; no session
  state, no persistence, no external storage between requests.
- Engine: `go-webengine` (pure-Go, CGO=0, no OS graphics dependency).

## Documentation

| Document                                       | Description                                               |
| ---------------------------------------------- | --------------------------------------------------------- |
| [docs](./docs/)                                | Architecture, contributing, downloads, packaging, roadmap |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Tech stack, module map, request flow                      |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Setup, commands, conventions, testing                     |
| [docs/DOWNLOADS.md](./docs/DOWNLOADS.md)       | Get the binary, Docker image, or source                   |
| [docs/PACKAGING.md](./docs/PACKAGING.md)       | Binary + container + CI artifact pipeline                 |
| [docs/ROADMAP.md](./docs/ROADMAP.md)           | Phased feature roadmap                                    |
