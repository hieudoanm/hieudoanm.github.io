# KeVIN (Rust)

> A Redis-style in-memory key/value store in a single static Rust binary — the
> same PING, SET, GET, KEYS, DEL protocol as the C, C++ and Go implementations,
> with no external runtime dependencies.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-release-blue)
![Rust](https://img.shields.io/badge/rust-2021%20edition-blue)

---

## Latest release

CI builds and publishes the Rust binary on every push to the same rolling release
as the C, C++ and Go builds:

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

[linux-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-rust-kevin-linux-amd64
[linux-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-rust-kevin-linux-arm64
[darwin-amd64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-rust-kevin-darwin-amd64
[darwin-arm64]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-kevin-latest/app-headless-kevin-rust-kevin-darwin-arm64

```bash
chmod +x kevin
./kevin serve --port 6379
```

### Docker

A multi-stage `Dockerfile` builds the same static binary into a scratch image:

```bash
cd packages/app/headless/kevin/rust
docker build -t kevin-server .
docker run -p 6379:6379 kevin-server
```

### Build from source

Prefer to build it yourself? Clone, build, and run in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/headless/kevin/rust
cargo build --release
./target/release/kevin serve --port 6379
```

See [PACKAGING](PACKAGING) for the CI artifact pipeline and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## Usage

The CLI is built with [clap](https://docs.rs/clap/) (derive API) and exposes a
single subcommand:

```bash
# Start the server on the Redis default port
./kevin serve --port 6379

# Persist to a JSON file (loaded on start, saved on shutdown)
./kevin serve --port 6379 --data store.json

# Open the key/value manager GUI alongside the server (requires --features gui build)
./kevin serve --gui

# Talk to it with any Redis-cli-compatible tool or plain TCP:
#   printf 'SET foo bar\nGET foo\n' | nc 127.0.0.1 6379
```

## Commands

| Command         | Description                               | Example                          |
| --------------- | ----------------------------------------- | -------------------------------- |
| `PING`          | Liveness check                            | `PING` → `PONG`                  |
| `SET key value` | Store a value (value may contain spaces)  | `SET foo bar` → `OK`             |
| `GET key`       | Retrieve a value                          | `GET foo` → `bar`, or `(nil)`    |
| `KEYS`          | List all keys (sorted, space-separated)   | `KEYS` → `foo bar`               |
| `DEL key`       | Delete one or more keys (variadic)        | `DEL foo` → `1`, `DEL a b` → `2` |
| `EXISTS key`    | Check if a key exists                     | `EXISTS foo` → `1` or `0`        |
| `LEN`           | Number of keys                            | `LEN` → `1`                      |
| `EXPIRE key N`  | Set a key's TTL in seconds                | `EXPIRE foo 60` → `1`            |
| `TTL key`       | Time-to-live in seconds (-1/-2 sentinels) | `TTL foo` → `59`                 |
| `FLUSHALL`      | Delete all keys                           | `FLUSHALL` → `OK`                |
| `FLUSHDB`       | Alias for FLUSHALL                        | `FLUSHDB` → `OK`                 |

Commands are case-insensitive. Unknown commands and missing arguments return a
Redis-style `ERR unknown command` / `ERR usage: ...` response.

## Configuration

| Flag     | Default   | Purpose                                                  |
| -------- | --------- | -------------------------------------------------------- |
| `--port` | `6379`    | TCP listen port                                          |
| `--bind` | `0.0.0.0` | Address to bind to                                       |
| `--data` |           | Path to JSON data file (load on start, save on shutdown) |
| `--gui`  | `false`   | Open the slint Material GUI alongside the server         |

`RUST_LOG` controls logging level (default: `info`).

## GUI

`kevin serve --gui` opens a minimal [slint](https://slint.dev/) Material window
to inspect and edit key/value pairs while the TCP server runs in the background.
Because the GUI feature requires the slint compiler and additional native
libraries, it is opt-in:

```bash
cargo build --release --features gui   # builds with GUI support
./target/release/kevin serve --gui --port 6379
```

Plain `cargo build --release` / `make build` stay GUI-free; `serve --gui` then
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
