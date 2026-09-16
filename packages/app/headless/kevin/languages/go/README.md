# KeVIN (Go)

> A Redis-style in-memory key/value store in a single static Go binary — the
> same PING, SET, GET, KEYS, DEL protocol as the C and C++ implementations,
> with no external dependencies.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-CGO_ENABLED%3D0-blue)
![Go](https://img.shields.io/badge/go-1.26%2B-blue)

---

## Latest release

CI builds and publishes the Go binary on every push to the same rolling release
as the C and C++ builds:

- **Release:** `app-headless-kevin-latest`
- See [PACKAGING](PACKAGING) for the pipeline and [ROADMAP](ROADMAP) for what's
  next.

---

## Installation

Pick the option that fits your environment.

### Prebuilt binary

| No  | Platform | Architecture | Download Link                    | Note                          |
| --- | -------- | ------------ | -------------------------------- | ----------------------------- |
| 1   | Linux    | amd64        | [Download `kevin`][linux-amd64]  | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `kevin`][linux-arm64]  | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `kevin`][darwin-amd64] | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `kevin`][darwin-arm64] | Static binary, no deps needed |

[linux-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-go-kv-linux-amd64
[linux-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-go-kv-linux-arm64
[darwin-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-go-kv-darwin-amd64
[darwin-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-go-kv-darwin-arm64

```bash
chmod +x kevin
./kevin serve --port 6379
```

### Docker

A multi-stage `Dockerfile` builds the same static binary into a scratch image:

```bash
cd packages/app/headless/kevin/go
docker build -t kevin-server .
docker run -p 6379:6379 kevin-server
```

### Build from source

Prefer to build it yourself? Clone, build, and run in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/headless/kevin/go
go build -o bin/kevin .
./bin/kevin serve --port 6379
```

See [PACKAGING](PACKAGING) for the CI artifact pipeline and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## Usage

The CLI is built with [cobra](https://cobra.dev) and exposes a single
subcommand:

```bash
# Start the server on the Redis default port
./kevin serve --port 6379

# Open the key/value manager GUI alongside the server (see build-gui below)
./kevin serve --gui

# Talk to it with any Redis-cli-compatible tool or plain TCP:
#   printf 'SET foo bar\nGET foo\n' | nc 127.0.0.1 6379
```

## Commands

| Command         | Description                              | Example                       |
| --------------- | ---------------------------------------- | ----------------------------- |
| `PING`          | Liveness check                           | `PING` → `PONG`               |
| `SET key value` | Store a value (value may contain spaces) | `SET foo bar` → `OK`          |
| `GET key`       | Retrieve a value                         | `GET foo` → `bar`, or `(nil)` |
| `KEYS`          | List all keys (space-separated)          | `KEYS` → `foo bar`            |
| `DEL key`       | Delete a key                             | `DEL foo` → `1` or `0`        |

Commands are case-insensitive. Unknown commands and missing arguments return a
Redis-style `ERR unknown command` / `ERR usage: ...` response.

## Configuration

| Flag     | Default | Purpose                                             |
| -------- | ------- | --------------------------------------------------- |
| `--port` | `6379`  | TCP listen port                                     |
| `--gui`  | `false` | Open the key/value manager GUI alongside the server |

The server is stateless and in-memory — all data is lost on shutdown, matching
the C and C++ implementations.

## GUI

`kevin serve --gui` opens a minimal [fyne](https://fyne.io) window to inspect
and edit key/value pairs while the TCP server runs in the background. Because
fyne requires CGO, the GUI-linked binary is built separately:

```bash
make build-gui       # builds bin/kevin-gui
./bin/kevin-gui serve --gui --port 6379
```

Plain `make build` / `make build-all` remain CGO-free; `serve --gui` then
reports that GUI support is not compiled in.

## Documentation

| Document                               | Description                           |
| -------------------------------------- | ------------------------------------- |
| [Architecture](./docs/ARCHITECTURE.md) | Tech stack, module map, request flow  |
| [Contributing](./docs/CONTRIBUTING.md) | Setup, commands, conventions, testing |
| [Downloads](./docs/DOWNLOADS.md)       | Binary, Docker image, or source       |
| [Packaging](./docs/PACKAGING.md)       | Build + CI artifact pipeline          |
| [Roadmap](./docs/ROADMAP.md)           | Phased feature roadmap                |

## License

See [LICENSE](../LICENSE).
