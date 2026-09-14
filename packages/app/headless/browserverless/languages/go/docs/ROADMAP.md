# Roadmap

> Phased roadmap for the Go implementation of Browserverless, powered by
> go-webengine.

## Phase 1 — Foundation (shipped)

- [x] Go module layout (`main.go` + `internal/headless` + `internal/server` + `internal/version`)
- [x] go-webengine integration: `Fetch` for scrape, `Render` + `EncodePNG` for screenshot
- [x] CLI: `screenshot`, `scrape`, `serve`, `help`, `version`
- [x] HTTP API: `/api/v1/health`, `/version`, `/scrape`, `/screenshot`, `/openapi.json`, `/docs`
- [x] Meta headers (`x-browserverless-*`) on 200 responses
- [x] Timeout → 504, other errors → 500; HTTP-only URL validation
- [x] Tests: headless local httptest integration, server fake renderer tests, CLI dispatch tests
- [x] Makefile: format, lint, test, build, build-all, coverage, install, clean
- [x] Multi-stage `Dockerfile` (scratch image, `EXPOSE 8080`, `HEALTHCHECK`)
- [x] `health` subcommand for Docker HEALTHCHECK support
- [x] CI: `go` job in `ci-app-headless-browserverless.yaml` + rolling GitHub Release
- [x] `scripts/install.sh` downloading the rolling release

## Phase 2 — Rendering hardening

- [ ] Full-page (off-viewport) screenshot support
- [ ] `--full-page` flag to capture entire scrollable content
- [ ] `--device-scale-factor` flag (DPI / retina)
- [ ] `--wait-after-load` flag for JS-heavy pages
- [ ] Configurable viewport via JSON body on the HTTP API
- [ ] Structured JSON logging option (`--log=json`)

## Phase 3 — Reliability & ops

- [ ] Request concurrency limits (`--max-concurrent`)
- [ ] Per-request cancellation via client disconnect detection
- [ ] Graceful request draining on SIGTERM
- [ ] Memory usage ceiling (`--max-memory-mb`) with eviction on breach
- [ ] Request body streaming (remove 64 KiB cap when scraping)
- [ ] Benchmark suite (`BenchmarkScreenshot`, `BenchmarkScrape`) in CI

## Phase 4 — Compatibility & ecosystem

- [ ] `data:` URL support for inline HTML rendering
- [ ] `file:` URL support for local HTML (opt-in, `--allow-file`)
- [ ] Private-network / localhost blocking (`--ssrf-protection`)
- [ ] Domain allowlist / blocklist (`--allow`, `--deny`)
- [ ] Windows (amd64/arm64) in `PLATFORMS` for `make build-all`
- [ ] Homebrew tap / Scoop / winget manifests

## Phase 5 — Product

- [ ] PDF output (`--format pdf`)
- [ ] Multi-tab / concurrent page support
- [ ] WebSocket endpoint for streaming render events
- [ ] Persistent session state (cookies, local storage) via `--session-id`
- [ ] Prometheus metrics endpoint (`/metrics`)
- [ ] Multi-language parity: ensure new features ship in Rust and Go
