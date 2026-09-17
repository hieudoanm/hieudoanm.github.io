# Roadmap

> Phased roadmap. Shipped items map to the KeVIN (Rust) feature set; the
> implementation mirrors the Go port's behaviour.

## Phase 1 — Foundation (shipped)

- [x] clap derive CLI (`src/cli.rs`) with a single `serve` subcommand
- [x] In-memory store (`BTreeMap<String, Entry>` + `RwLock`)
- [x] Thread-per-connection TCP server (`std::thread`)
- [x] Redis-style protocol: PING, SET, GET, KEYS, DEL (case-insensitive)
- [x] Redis-style errors (`ERR unknown command`, `ERR usage: ...`)
- [x] Value-with-spaces support and exact C/C++/Go parity
- [x] Table-driven tests: handler protocol tests, DB unit tests
- [x] Makefile: format, lint, test, bench, build, build-gui, install, clean
- [x] Multi-stage `Dockerfile` (scratch image, `EXPOSE 6379`)

## Phase 2 — Protocol & behaviour (shipped)

- [x] `TTL`/`EXPIRE` support (per-key expiry, lazy deletion of expired keys)
- [x] `SET key value EX N` to store a value with an expiry
- [x] `DEL` variadic keys (`DEL k1 k2`) for Redis-cli compatibility
- [x] `FLUSHALL`/`FLUSHDB`
- [x] `EXISTS` / `LEN`
- [x] `KEYS` returns sorted keys (BTreeMap invariant)

## Phase 3 — Reliability & ops (shipped)

- [x] Shutdown persistence via `serve --data <file>` (JSON snapshot on exit,
      load on start, atomic temp-file write)
- [x] `SIGINT`/`SIGTERM` graceful shutdown (verified + tested)
- [x] Structured logging with `tracing` + `tracing-subscriber` (`RUST_LOG`
      override, default `info`)
- [x] `--bind` flag for address selection (default `0.0.0.0`)
- [x] Criterion benchmarks (`set`, `get`, `keys`)
- [x] slint Material GUI behind the `gui` cargo feature (`serve --gui`)
- [x] ratatui TUI compiled into every build (`serve --tui`, conflicts with `--gui`)

## Phase 4 — Ecosystem

- [ ] CI integration: add a `rust` job to `ci-app-headless-kevin.yaml`
- [ ] Cross-compilation for all four platforms in the CI pipeline
- [ ] `scripts/install.sh` downloading the rolling release
- [ ] Windows (amd64/arm64) builds
- [ ] Homebrew tap / Scoop / winget manifests
- [ ] Multi-language parity: ensure every new protocol command ships in C,
      C++, Go and Rust simultaneously

## Phase 5 — Production

- [ ] Pluggable storage backend (append-only file, on-disk)
- [ ] Authentication (`AUTH`)
- [ ] Config file / env vars for server options
- [ ] Prometheus metrics endpoint
