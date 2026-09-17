# KeVIN (Go)

A Redis-style in-memory key/value store in a single static Go binary — PING,
SET, GET, KEYS, DEL over TCP, behaviour-identical to the C (`kevin/c`) and C++
(`kevin/cpp`) implementations.

## Commands

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `go build ./...` | Compile all packages                      |
| `go test ./...`  | All unit + TCP integration tests          |
| `go vet ./...`   | Static analysis                           |
| `gofmt -w .`     | Format all Go files                       |
| `make all`       | `format` + `lint` + `test` + `build`      |
| `make build`     | Build `bin/kevin` (CGO disabled, includes `--tui`) |
| `make build-gui` | Build `bin/kevin-gui` with fyne (`--gui`)          |
| `make build-all` | Cross-compile 4 platforms into `bin/`     |
| `make test`      | `go test ./...`                           |
| `make lint`      | `go vet ./...`                            |
| `make format`    | `go fmt ./...`                            |
| `make coverage`  | Generate HTML coverage report             |
| `make tidy`      | `go mod tidy`                             |
| `make install`   | Install to `~/bin/kevin`                  |
| `make clean`     | Remove `./bin` and `./coverage`           |

## Key Conventions

- CLI is built with cobra: `main.go` (`package main`) stays thin and calls
  `cmd.NewRootCommand().Execute()`. The root command declares one subcommand,
  `serve`, wire in `cmd/root.go` + `cmd/serve.go`. `serve` dialogs `--port`
  (default 6379), `--gui` and `--tui`. Without either UI flag, `serve` calls
  `server.New(db.New()).Serve(ctx, ln)`.
- Standard Go layout: `main.go` + `cmd/` (cobra CLI) + `internal/db` (store) +
  `internal/server` (TCP accept loop + protocol handler) + `internal/gui`
  (fyne key/value manager) + `internal/tui` (bubbletea terminal manager).
  Storage lives in `internal/db`; parsing lives in
  `internal/server/handler.go`. `internal/db` must not import `internal/server`
  (avoid cycles).
- `--gui` opens the fyne window on the same `db.DB` as the TCP server. fyne
  requires CGO, so the window lives behind the `gui` build tag:
  `internal/gui/gui_fyne.go` (`//go:build gui`) is the real window;
  `internal/gui/gui.go` (no tag) is a stub whose `Run` returns
  `gui.ErrUnavailable`. The UI uses the custom theme in
  `internal/gui/theme.go` (both variants) per
  `packages/app/headless/FYNE.md`. Default builds stay CGO-free;
  `make build-gui` links the window.
- `--tui` opens the bubbletea terminal manager (`internal/tui`) on the same
  `db.DB` as the TCP server. It is pure Go (no CGO) so it compiles into every
  build; `serveWithTUI` mirrors `serveWithGUI` (server in a goroutine, TUI on
  the main thread, quitting it stops the server). `--gui` and `--tui` are
  mutually exclusive (`errors.New` in `serve`'s `RunE`).
- Protocol parsing mirrors the C reference exactly: strip trailing `\r\n`,
  skip empty/whitespace lines, tokenise on spaces, case-insensitive commands,
  `SET` preserves internal value spaces, `GET`/`DEL` require exactly one arg.
- `handleLine(line string, kv *db.DB) (string, bool)` is the core pure
  function — returns the response line plus whether a reply should be sent
  (empty/whitespace lines return `ok=false`). Keep it table-testable.
- Follow repo-wide Go rules from the root [AGENTS.md](../../../../../AGENTS.md):
  `error` last, handle errors explicitly, `var` zero-init over `:=`, no global
  state, table-driven tests, return early. Follow the cobra subsection: `RunE`
  over `Run`, thin `RunE` bodies, nested commands via `AddCommand`, persistent
  flags for shared options.
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
- `serve --port` (default `6379`), `serve --gui` and `serve --tui` are the
  only configuration; no env vars.
- `bin/` and `coverage/` are gitignored (build output).

## Documentation

| Document                                       | Description                                               |
| ---------------------------------------------- | --------------------------------------------------------- |
| [docs](./docs/)                                | Architecture, contributing, downloads, packaging, roadmap |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Tech stack, module map, request flow                      |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Setup, commands, conventions, testing                     |
| [docs/DOWNLOADS.md](./docs/DOWNLOADS.md)       | Get the binary, Docker image, or source                   |
| [docs/PACKAGING.md](./docs/PACKAGING.md)       | Binary + container + CI artifact pipeline                 |
| [docs/ROADMAP.md](./docs/ROADMAP.md)           | Phased feature roadmap                                    |
