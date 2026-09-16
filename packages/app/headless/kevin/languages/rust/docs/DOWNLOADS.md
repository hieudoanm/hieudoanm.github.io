# KeVIN (Rust)

> A Redis-style in-memory key/value store — PING, SET, GET, KEYS, DEL — in a
> single static Rust binary. Same protocol as the C, C++ and Go builds, with
> optional slint Material GUI and JSON persistence.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-release-blue)
![Rust](https://img.shields.io/badge/rust-2021%20edition-blue)

---

## Latest release

- **Version:** `app-headless-kevin-latest` — rebuilt automatically on every
  push (see [PACKAGING](PACKAGING)).
- **What's new:** see the [ROADMAP](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the option that fits your environment.

### Prebuilt binary

| No  | Platform | Architecture | Download Link                          | Note                          |
| --- | -------- | ------------ | -------------------------------------- | ----------------------------- |
| 1   | Linux    | amd64        | [Download `kevin`][linux-amd64]        | Static binary, no deps needed |
| 2   | Linux    | arm64        | [Download `kevin`][linux-arm64]        | Static binary, no deps needed |
| 3   | macOS    | amd64        | [Download `kevin`][darwin-amd64]       | Static binary, no deps needed |
| 4   | macOS    | arm64        | [Download `kevin`][darwin-arm64]       | Static binary, no deps needed |

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

## About

KeVIN is a tiny in-memory key/value store that speaks the wire protocol Redis
already understands. Everything lives in RAM — reads and writes never touch the
disk — and one connection gets its own OS thread. It is the Rust counterpart of
the C, C++ and Go implementations in this package, kept behaviour-identical.

## Features

### 🔌 Redis-style protocol

- `PING` → `PONG`, `SET key value` → `OK`, `GET key` → value or `(nil)`,
  `KEYS` → sorted space-separated keys, `DEL key` → `1`/`0`
- Commands are case-insensitive; multi-word values are preserved
- TTL commands: `SET key value EX 60`, `TTL key`, `EXPIRE key 60`
- Additional: `EXISTS`, `LEN`, `FLUSHALL`, `FLUSHDB`
- Redis-style errors: `ERR unknown command`, `ERR usage: ...`, etc.

### ⚡ In-memory storage

- `BTreeMap<String, Entry>` guarded by `RwLock` — concurrent reads are
  lock-free, writes are serialised (see [ARCHITECTURE](ARCHITECTURE))
- Sorted keys by default (BTreeMap invariant)

### 🧵 Concurrency

- Thread-per-connection accept loop handles many clients at once

### 💾 Optional persistence

- `serve --data <file>` stores a JSON snapshot on SIGINT/SIGTERM and loads it
  on start. Atomic save via tmp file + rename.

### 🖥️ Optional GUI

- slint Material window behind the `gui` cargo feature (`--features gui`)

### 🚀 Portable

- `cargo build --release` produces a static binary for any supported platform
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
