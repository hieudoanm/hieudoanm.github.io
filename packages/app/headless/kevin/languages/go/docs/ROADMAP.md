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
- [x] Makefile: format, lint, test, build, build-all, coverage, install, clean
- [x] Multi-stage `Dockerfile` (scratch image, `EXPOSE 6379`)
- [x] CI: `go` job in `ci-app-headless-kevin.yaml` + rolling GitHub Release

## Phase 2 — Protocol & behaviour

- [ ] `--port` flag parity documented in the C/C++ READMEs (currently Go-only)
- [ ] `TTL`/`EXPIRE` support (per-key expiry)
- [ ] `DEL` variadic keys (`DEL k1 k2`) for Redis-cli compatibility
- [ ] `FLUSHALL`/`FLUSHDB`
- [ ] `EXISTS` / `LEN`
- [ ] RESP2/RESP3 serialisation for full Redis client compatibility

## Phase 3 — Reliability & ops

- [ ] Shutdown persistence (snapshot on exit, load on start)
- [ ] `SIGINT`/`SIGTERM` graceful shutdown (present; verify + test)
- [ ] Structured logging to stdout/stderr with levels
- [ ] `--bind` flag for address selection
- [ ] Benchmarks (`BenchmarkSet`, `BenchmarkGet`, `BenchmarkKeys`) in CI

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
