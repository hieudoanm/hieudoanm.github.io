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
curl -fsSL https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/main/packages/app/headless/browserverless/languages/go/scripts/install.sh | bash
```

### Prebuilt binary

| No  | Platform | Architecture | Download Link                                               | Note                          |
| --- | -------- | ------------ | ----------------------------------------------------------- | ----------------------------- |
| 1   | Linux    | amd64        | [Download `browserverless`][download-linux-amd64]           | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `browserverless`][download-linux-arm64]           | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `browserverless`][download-darwin-amd64]          | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `browserverless`][download-darwin-arm64]          | Static binary, no deps needed |

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

## Usage

```bash
# Screenshot a URL
./browserverless screenshot https://example.com/

# Scrape full HTML to stdout
./browserverless scrape https://example.com/

# Start an HTTP server
./browserverless serve --bind 127.0.0.1:8080

# Check a running server
./browserverless health

# Expose the render tools to an MCP client
./browserverless mcp serve
```

## CLI Commands

| Command       | Description                                        | Example                                                 |
| ------------- | -------------------------------------------------- | ------------------------------------------------------- |
| `screenshot`  | Save a PNG screenshot of a URL                    | `browserverless screenshot https://example.com/`        |
| `scrape`      | Dump the full HTML of a URL to stdout or a file   | `browserverless scrape --output page.html <url>`        |
| `serve`       | Start an HTTP rendering API server                | `browserverless serve --bind 0.0.0.0:8080`             |
| `health`      | Check a running server's `/api/v1/health`         | `browserverless health`                                 |
| `mcp`         | Serve the Model Context Protocol over stdio       | `browserverless mcp serve`                              |
| `version`     | Print the version                                 | `browserverless version`                                |
| `help`        | Show usage text                                   | `browserverless help`                                   |

## HTTP API

| Method | Path                  | Description                                | Status |
| ------ | --------------------- | ------------------------------------------ | ------ |
| GET    | `/api/v1/health`      | Health check                               | 200    |
| GET    | `/api/v1/version`     | Server version string                      | 200    |
| POST   | `/api/v1/scrape`      | Full HTML of a rendered page               | 200    |
| POST   | `/api/v1/screenshot`  | PNG screenshot of a rendered page          | 200    |
| GET    | `/api/v1/openapi.json`| OpenAPI 3.0 spec                          | 200    |
| GET    | `/docs`               | Interactive API docs (Redoc)               | 200    |

Request body for scrape/screenshot: `{"url": "https://example.com/"}`.

## MCP Server

`browserverless mcp serve` speaks the Model Context Protocol over stdio
(newline-delimited JSON-RPC 2.0) so an LLM client can drive the same render
engine the CLI and HTTP API use. It is hand-rolled: no MCP SDK dependency.

| Tool                        | Arguments                        | Returns                                    |
| --------------------------- | -------------------------------- | ------------------------------------------ |
| `browserverless_scrape`     | `url`, `timeout_ms` (optional)   | Full HTML plus URL, title, render metrics  |
| `browserverless_screenshot` | `url`, `timeout_ms` (optional)   | PNG as an image block plus render metrics  |
| `browserverless_version`    | none                             | Binary version backing the server          |

By default the server renders in-process, so it needs no running HTTP server.
Point `--addr` at a running instance to share one warm engine instead:

```bash
browserverless serve --port 8080 &
browserverless mcp serve --addr http://127.0.0.1:8080
```

| Flag        | Default          | Purpose                                       |
| ----------- | ---------------- | --------------------------------------------- |
| `--addr`    | (empty)          | Proxy a running server; render in-process when empty |
| `--width`   | `1280`           | Viewport width (in-process rendering only)    |
| `--height`  | `720`            | Viewport height (in-process rendering only)   |
| `--timeout` | `30000` ms       | Load timeout (in-process rendering only)      |

Client configuration:

```json
{
  "mcpServers": {
    "browserverless": {
      "command": "browserverless",
      "args": ["mcp", "serve"]
    }
  }
}
```

Notes:

- stdout carries JSON-RPC frames only; diagnostics go to stderr.
- Closing stdin is the shutdown signal, so clients should just close the pipe.
- Tool failures come back as `isError` results the model can read, not as
  JSON-RPC errors. JSON-RPC errors are reserved for protocol and framing faults.
- `timeout_ms` adds a per-call deadline on top of the server default; omit it to
  use `--timeout`.

## Configuration

| Flag         | Default           | Purpose                          |
| ------------ | ----------------- | -------------------------------- |
| `--bind`     | `127.0.0.1:8080`  | Listen address (serve mode)     |
| `--port`     | (uses bind)       | Override port in `--bind`       |
| `--width`    | `1280`            | Viewport width                  |
| `--height`   | `720`             | Viewport height                 |
| `--timeout`  | `30000` ms        | Per-request load timeout (ms)   |
| `--output`   | `screenshot.png`  | Screenshot output path          |

## Documentation

| Document                                | Description                            |
| --------------------------------------- | ------------------------------------- |
| [Architecture](./docs/ARCHITECTURE.md)  | Tech stack, module map, request flow  |
| [Contributing](./docs/CONTRIBUTING.md)  | Setup, commands, conventions, testing |
| [Downloads](./docs/DOWNLOADS.md)        | Binary, Docker image, or source       |
| [Packaging](./docs/PACKAGING.md)        | Build + CI artifact pipeline          |
| [Roadmap](./docs/ROADMAP.md)            | Phased feature roadmap                |

## License

See [LICENSE](../LICENSE).