# Browserverless (Go)

> Lightweight go-webengine-powered headless browser server — screenshot, scrape,
> and serve-mode execution from one static, pure-Go binary.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-CGO_ENABLED%3D0-blue)
![Go](https://img.shields.io/badge/go-1.26%2B-blue)

---

## Latest release

- **Version:** `app-headless-browserverless-latest` — rebuilt automatically on
  every push (see [PACKAGING](PACKAGING)).
- **What's new:** see the [ROADMAP](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the option that fits your environment.

### Install script

```bash
curl -fsSL https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/master/packages/app/headless/browserverless/languages/go/scripts/install.sh | bash
```

### Prebuilt binary

| No  | Platform | Architecture | Download Link                                      | Note                          |
| --- | -------- | ------------ | -------------------------------------------------- | ----------------------------- |
| 1   | Linux    | amd64        | [Download `browserverless`][download-linux-amd64]  | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `browserverless`][download-linux-arm64]  | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `browserverless`][download-darwin-amd64] | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `browserverless`][download-darwin-arm64] | Static binary, no deps needed |

[download-linux-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-browserverless-latest/app-headless-browserverless-browserverless-linux-amd64
[download-linux-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-browserverless-latest/app-headless-browserverless-browserverless-linux-arm64
[download-darwin-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-browserverless-latest/app-headless-browserverless-browserverless-darwin-amd64
[download-darwin-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-browserverless-latest/app-headless-browserverless-browserverless-darwin-arm64

```bash
chmod +x browserverless
./browserverless version
```

### Docker

A multi-stage `Dockerfile` builds the same static binary into a scratch image:

```bash
cd packages/app/headless/browserverless/languages/go
docker build -t browserverless .
docker run -p 8080:8080 browserverless
```

Prefer a build without the Go toolchain? The release-based image at
`docker/Dockerfile` installs the latest published binary from GitHub via
`scripts/install.sh`:

```bash
cd packages/app/headless/browserverless/languages/go
docker build -f docker/Dockerfile -t browserverless .
docker run -p 8080:8080 browserverless
```

### Build from source

Prefer to build it yourself? Clone, build, and run in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/headless/browserverless/languages/go
make build
./bin/browserverless version
```

See [PACKAGING](PACKAGING) for the CI artifact pipeline and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Browserverless is a headless browser server powered by go-webengine — a
pure-Go, CGO-free browser engine. It renders real web pages and serves the
results over an HTTP API or as a CLI tool. No Chromium, no system browser,
no OS graphics dependency.

## Features

### Pure-Go engine

`github.com/go-webengine/engine` — CGO=0, no external graphics library.
Renders HTML, CSS, and basic JavaScript into pixel-perfect output.

### CLI screenshot and scrape

```bash
browserverless screenshot https://example.com/ -o shot.png
browserverless scrape https://example.com/ > page.html
```

### HTTP rendering API

`browserverless serve` starts an HTTP server exposing:

- `POST /api/v1/scrape` → full page HTML
- `POST /api/v1/screenshot` → PNG image
- `GET /api/v1/health` → `{"status":"ok"}`
- `GET /api/v1/version` → version string
- `GET /docs` → interactive API docs (Redoc)

### Cross-platform static binary

`CGO_ENABLED=0` — Linux/macOS on amd64 and arm64, no runtime dependencies.

### Health check

`browserverless health` performs a single HTTP GET against a running server's
`/api/v1/health` endpoint — used by the Docker `HEALTHCHECK`.

---

## First run

- Screenshot: `browserverless screenshot https://example.com/`
- Start server: `browserverless serve`
- Check server: `browserverless health`

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](../LICENSE).
