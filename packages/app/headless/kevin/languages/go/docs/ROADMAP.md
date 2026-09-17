# Roadmap

> Phased roadmap. Shipped items map to the KeVIN (Go) feature set; the C
> and C++ implementations share the same protocol and roadmap above.

## Phase 1 — Foundation (shipped)

- [x] Go module layout (`main.go` + `internal/db` + `internal/server`)
- [x] In-memory store (`map[string]string` + `sync.RWMutex`)
- [x] TCP server with goroutine-per-connection
- [x] Redis-style protocol: PING, SET, GET, KEYS, DEL (case-insensitive)
- [x] Redis-style errors (`ERR unknown command`, `ERR usage: ...`)
- [x] Value-with-spaces support and exact C/C++ parity
- [x] Tests: DB unit tests, handler table tests, TCP integration + concurrent clients
- [x] Makefile: format, lint, test, build, build-gui, build-all, coverage, install, clean
- [x] Multi-stage `Dockerfile` (scratch image, `EXPOSE 6379`)
- [x] CI: `go` job in `ci-app-headless-kevin.yaml` + rolling GitHub Release
- [x] cobra CLI (`cmd/`) with a single `serve` subcommand (`--port`, `--gui`)
- [x] fyne key/value manager GUI behind the `gui` build tag (`serve --gui`)
- [x] bubbletea key/value manager TUI compiled into every build (`serve --tui`)

## Phase 2 — Protocol & behaviour

- [x] `TTL`/`EXPIRE` support (per-key expiry, lazy deletion of expired keys)
- [x] `SET key value EX N` to store a value with an expiry
- [x] `DEL` variadic keys (`DEL k1 k2`) for Redis-cli compatibility
- [x] `FLUSHALL`/`FLUSHDB`
- [x] `EXISTS` / `LEN`
- [x] ~~RESP2/RESP3 serialisation~~ — skipped by decision (inline protocol only;
      RESP-speaking Redis clients will not work)
- [x] ~~`--port` flag parity documented in the C/C++ READMEs~~ — skipped by
      decision (docs parity deferred)

## Phase 3 — Reliability & ops

- [x] Shutdown persistence via `serve --data <file>` (JSON snapshot on exit,
      load on start, atomic temp-file write)
- [x] `SIGINT`/`SIGTERM` graceful shutdown (verified + tested)
- [x] Structured logging with `log/slog` (INFO/WARN/ERROR by default,
      DEBUG per-command)
- [x] `--bind` flag for address selection (default `0.0.0.0`)
- [x] Benchmarks (`BenchmarkSet`, `BenchmarkGet`, `BenchmarkKeys`)
- [ ] Benchmarks wired into CI (`ci-app-headless-kevin.yaml`)

## Phase 4 — Ecosystem

- [ ] Redis replication (read-replica mode)
- [x] `scripts/install.sh` downloading the rolling release
- [ ] Windows (amd64/arm64) in `PLATFORMS` for `make build-all`
- [ ] Homebrew tap / Scoop / winget manifests
- [ ] Multi-language parity: ensure every new protocol command ships in C,
      C++ and Go simultaneously

## Phase 5 — Production

- [ ] Pluggable storage backend (append-only file, on-disk)
- [ ] Authentication (`AUTH`)
- [ ] Config file / env vars for server options
- [ ] Prometheus metrics endpoint
