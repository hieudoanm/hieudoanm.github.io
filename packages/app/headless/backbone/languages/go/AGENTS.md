# Backbone (Go)

A lightweight Back-end as a Service in Go — SQLite storage, REST API, Admin
Dashboard, WebSockets, SSE, cron, webhooks, encrypted secrets and pub/sub, all
in a single static binary.

## Commands

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `go build ./...`       | Compile all packages                         |
| `go test ./...`        | All unit + E2E tests (`tests/` included)     |
| `go vet ./...`         | Static analysis                              |
| `gofmt -w .`           | Format all Go files                          |
| `make all`             | `format` + `lint` + `test` + `build`         |
| `make build`           | Build `bin/backbone` (CGO disabled)          |
| `make build-all`       | Cross-compile 4 platforms into `bin/`        |
| `make test`            | `go test ./...`                              |
| `make lint`            | `go vet ./...`                               |
| `make format`          | `go fmt ./...`                               |
| `make coverage`        | Generate HTML coverage report                |
| `make tidy`            | `go mod tidy`                                |
| `make install`         | Install to `~/bin/backbone`                  |
| `make clean`           | Remove `./bin` and `./coverage`              |

## Key Conventions

- Entrypoint is the module root `main.go` (`package main`); it opens the DB
  (`store.OpenDB`), migrates (`store.MigrateDB`), loads the AES key
  (`secrets.GetOrCreateKey`) and serves `httpapi.NewServer(db, dataDir, key)`.
  Keep the entrypoint thin — hand everything to `internal/httpapi`.
- Standard Go layout: `main.go` + `internal/` + `tests/`. Handlers live in
  `internal/httpapi` (register routes in `routes.go`); feature logic lives in
  `internal/<feature>` (store, auth, cache, cron, log, notification, pubsub,
  realtime, secrets, webhook, rbac, id, validation, events).
- `internal/store` owns SQLite schema + migrations and DB functions.
  `internal/httpapi` depends on store/feature packages; feature packages must
  NOT import `internal/httpapi` (avoid cycles). Webhook payload builders are
  exported from feature packages.
- Real-time: `internal/realtime` provides `NewWSHub` (`/ws`) and `NewSSEHub`
  (notification/log/pubsub streams). PubSub publishes fan out to SSE
  subscribers via its hub.
- Follow repo-wide Go rules from the root [AGENTS.md](../../../../../AGENTS.md):
  `error` last, handle errors explicitly, `var` zero-init over `:=`, `context` 
  first arg, no global state, table-driven tests, return early.
- Tests: colocated `*_test.go`, table-driven, behaviour-spec names. `httpapi`
  uses `newTestServer` + `newTestDB`; `main_test.go` re-executes itself as a
  subprocess (`GO_MAIN_TEST=1`) to verify real startup/shutdown.
- The `tests/` package builds the real binary (`go build ./..`) and runs
  end-to-end CRUD over HTTP — it is the slow but authoritative gate.

## Data

- Persistence: SQLite at `$BACKBONE_DATA/data.db` (default `~/.backbone/`).
  Uploads under `<dataDir>/uploads`; AES key file `<dataDir>/secrets.key` or
  `$BACKBONE_SECRETS_KEY`.
- Env vars: `PORT` (8080), `BACKBONE_DATA`, `JWT_SECRET`, `BACKBONE_SECRETS_KEY`.
- `bin/` is gitignored (build output). `internal/events` defines webhook event
  types and fan-out; `internal/log`/`internal/notification` integrate their
  SSE hubs.

## Documentation

| Document        | Description                                  |
| --------------- | -------------------------------------------- |
| [docs](./docs/) | Architecture, contributing, downloads, packaging, roadmap |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Tech stack, module map, request flow |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Setup, commands, conventions, testing |
| [docs/DOWNLOADS.md](./docs/DOWNLOADS.md) | Get the binary, Docker image, or source |
| [docs/PACKAGING.md](./docs/PACKAGING.md) | Binary + container + CI artifact pipeline |
| [docs/ROADMAP.md](./docs/ROADMAP.md) | Phased feature roadmap |