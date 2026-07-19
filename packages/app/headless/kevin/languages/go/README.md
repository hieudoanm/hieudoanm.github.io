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

| No  | Platform | Architecture | Download Link                        | Note                          |
| --- | -------- | ------------ | ------------------------------------ | ----------------------------- |
| 1   | Linux    | amd64        | [Download `kv`][linux-amd64]         | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `kv`][linux-arm64]         | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `kv`][darwin-amd64]        | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `kv`][darwin-arm64]        | Static binary, no deps needed |

[linux-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-go-kv-linux-amd64
[linux-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-go-kv-linux-arm64
[darwin-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-go-kv-darwin-amd64
[darwin-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-go-kv-darwin-arm64

```
chmod +x kv
./kv --port 6379
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
go build -o bin/kv .
./bin/kv --port 6379
```

See [PACKAGING](PACKAGING) for the CI artifact pipeline and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## Usage

```bash
# Start the server on the Redis default port
./kv --port 6379

# Talk to it with any Redis-cli-compatible tool or plain TCP:
#   printf 'SET foo bar\nGET foo\n' | nc 127.0.0.1 6379
```

## Commands

| Command        | Description                                      | Example                          |
| -------------- | ------------------------------------------------ | -------------------------------- |
| `PING`         | Liveness check                                   | `PING` → `PONG`                 |
| `SET key value`| Store a value (value may contain spaces)         | `SET foo bar` → `OK`            |
| `GET key`      | Retrieve a value                                | `GET foo` → `bar`, or `(nil)`   |
| `KEYS`         | List all keys (space-separated)                  | `KEYS` → `foo bar`              |
| `DEL key`      | Delete a key                                    | `DEL foo` → `1` or `0`          |

Commands are case-insensitive. Unknown commands and missing arguments return a
Redis-style `ERR unknown command` / `ERR usage: ...` response.

## Configuration

| Flag   | Default | Purpose         |
| ------ | ------- | --------------- |
| `--port` | `6379` | TCP listen port |

The server is stateless and in-memory — all data is lost on shutdown, matching
the C and C++ implementations.

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