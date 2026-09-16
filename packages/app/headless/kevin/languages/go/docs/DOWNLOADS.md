# KeVIN (Go)

> A Redis-style in-memory key/value store — PING, SET, GET, KEYS, DEL — in a
> single static Go binary. Same protocol as the C and C++ builds, no external
> dependencies.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-CGO_ENABLED%3D0-blue)
![Go](https://img.shields.io/badge/go-1.26%2B-blue)

---

## Latest release

- **Version:** `app-headless-kevin-latest` — rebuilt automatically on every
  push (see [PACKAGING](PACKAGING)).
- **What's new:** see the [ROADMAP](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the option that fits your environment.

### Install script

```bash
curl -fsSL https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/master/packages/app/headless/kevin/languages/go/scripts/install.sh | bash
```

### Prebuilt binary

| No  | Platform | Architecture | Download Link                             | Note                          |
| --- | -------- | ------------ | ----------------------------------------- | ----------------------------- |
| 1   | Linux    | amd64        | [Download `kevin`][download-linux-amd64]  | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `kevin`][download-linux-arm64]  | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `kevin`][download-darwin-amd64] | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `kevin`][download-darwin-arm64] | Static binary, no deps needed |

[download-linux-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-kevin-linux-amd64
[download-linux-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-kevin-linux-arm64
[download-darwin-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-kevin-darwin-amd64
[download-darwin-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-kevin-darwin-arm64

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

## About

KeVIN is a tiny in-memory key/value store that speaks the wire protocol Redis
already understands. Everything lives in RAM — reads and writes never touch the
disk — and one connection gets its own goroutine. It is the Go counterpart of
the C and C++ implementations in this package, kept behaviour-identical.

## Features

### 🔌 Redis-style protocol

- `PING` → `PONG`, `SET key value` → `OK`, `GET key` → value or `(nil)`,
  `KEYS` → space-separated keys, `DEL key` → `1`/`0`
- Commands are case-insensitive; multi-word values are preserved
- Redis-style errors: `ERR unknown command`, `ERR usage: SET key value`, etc.

### ⚡ In-memory storage

- `map[string]string` guarded by a `sync.RWMutex` — concurrent reads are
  lock-free, writes are serialised (see [ARCHITECTURE](ARCHITECTURE))

### 🧵 Concurrency

- Goroutine-per-connection accept loop handles many clients at once

### 🚀 Portable

- `CGO_ENABLED=0` static binary for Linux/macOS on amd64 and arm64
- Multi-stage `Dockerfile` publishes a scratch image with `EXPOSE 6379`

---

## First run

- Start with `./kevin serve --port 6379` (Redis default port)
- Point any Redis tool or client at `localhost:6379` and send commands

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](../LICENSE).
