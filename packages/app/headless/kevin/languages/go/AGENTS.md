# KeVIN (Go)

A Redis-style in-memory key/value store in a single static Go binary — PING,
SET, GET, KEYS, DEL over TCP, behaviour-identical to the C (`kevin/c`) and C++
(`kevin/cpp`) implementations.

## Commands

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `go build ./...`       | Compile all packages                         |
| `go test ./...`        | All unit + TCP integration tests             |
| `go vet ./...`         | Static analysis                              |
| `gofmt -w .`           | Format all Go files                          |
| `make all`             | `format` + `lint` + `test` + `build`         |
| `make build`           | Build `bin/kv` (CGO disabled)                |
| `make build-all`       | Cross-compile 4 platforms into `bin/`        |
| `make test`            | `go test ./...`                              |
| `make lint`            | `go vet ./...`                               |
| `make format`          | `go fmt ./...`                               |
| `make coverage`        | Generate HTML coverage report                |
| `make tidy`            | `go mod tidy`                                |
| `make install`         | Install to `~/bin/kv`                        |
| `make clean`           | Remove `./bin` and `./coverage`              |

## Key Conventions

- Entrypoint is the module root `main.go` (`package main`); it parses `--port`
  (default 6379), opens a TCP listener, and hands everything to
  `server.New(db.New()).Serve(ctx, ln)`. Keep the entrypoint thin.
- Standard Go layout: `main.go` + `internal/db` (store) + `internal/server`
  (TCP accept loop + protocol handler). Storage lives in `internal/db`;
  parsing lives in `internal/server/handler.go`. `internal/db` must not
  import `internal/server` (avoid cycles).
- Protocol parsing mirrors the C reference exactly: strip trailing `\r\n`,
  skip empty/whitespace lines, tokenise on spaces, case-insensitive commands,
  `SET` preserves internal value spaces, `GET`/`DEL` require exactly one arg.
- `handleLine(line string, kv *db.DB) (string, bool)` is the core pure
  function — returns the response line plus whether a reply should be sent
  (empty/whitespace lines return `ok=false`). Keep it table-testable.
- Follow repo-wide Go rules from the root [AGENTS.md](../../../../../AGENTS.md):
  `error` last, handle errors explicitly, `var` zero-init over `:=`, no global
  state, table-driven tests, return early.
- Tests: `internal/db` colocated unit tests; `internal/server` has table-driven
  handler tests (no TCP) plus a real TCP `Server.Serve` integration test with
  concurrent clients.
- The binary listens on `:<port>` (default 6379). Server is stateless and
  in-memory; all data is lost on shutdown (same as C/C++).
- CI (`.github/workflows/ci-app-headless-kevin.yaml`) runs the `go` job with
  `make lint`, `make test`, `make build-all` and uploads `bin/*` to the rolling
  `app-headless-kevin-latest` release.

## Data

- In-memory `map[string]string` guarded by a `sync.RWMutex` — no persistence,
  no external storage.
- `--port` flag (default `6379`) is the only configuration; no env vars.
- `bin/` and `coverage/` are gitignored (build output).

## Documentation

| Document        | Description                                  |
| --------------- | -------------------------------------------- |
| [docs](./docs/) | Architecture, contributing, downloads, packaging, roadmap |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Tech stack, module map, request flow |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Setup, commands, conventions, testing |
| [docs/DOWNLOADS.md](./docs/DOWNLOADS.md) | Get the binary, Docker image, or source |
| [docs/PACKAGING.md](./docs/PACKAGING.md) | Binary + container + CI artifact pipeline |
| [docs/ROADMAP.md](./docs/ROADMAP.md) | Phased feature roadmap |