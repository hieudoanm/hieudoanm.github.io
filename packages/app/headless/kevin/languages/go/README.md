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

The CLI is built with [cobra](https://cobra.dev) and exposes two subcommands,
`serve` and `mcp serve`:

```bash
# Start the server on the Redis default port
./kevin serve --port 6379

# Open the key/value manager GUI alongside the server (see build-gui below)
./kevin serve --gui

# Open the key/value manager TUI alongside the server (compiled into every build)
./kevin serve --tui

# Talk to it with any Redis-cli-compatible tool or plain TCP:
#   printf 'SET foo bar\nGET foo\n' | nc 127.0.0.1 6379

# Expose the store to LLM clients over the Model Context Protocol
./kevin mcp serve
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

## MCP (Model Context Protocol)

`kevin mcp serve` speaks newline-delimited
[JSON-RPC 2.0](https://www.jsonrpc.org/specification) on stdin/stdout — the
transport MCP clients expect. Logs go to stderr so stdout carries only protocol
frames.

```bash
# Back the tools with an in-process store
./kevin mcp serve

# Back the tools with an in-process store persisted to a JSON snapshot
./kevin mcp serve --data store.json

# Proxy a running server instead of holding data locally
kevin serve --port 6379 &
./kevin mcp serve --addr 127.0.0.1:6379
```

`--addr` and `--data` are mutually exclusive: one proxies a remote server, the
other owns local data. There is no MCP SDK dependency — the protocol is a few
hundred lines of `encoding/json` over two pipes.

### Tools

| No  | Tool           | Description                                                 |
| --- | -------------- | ----------------------------------------------------------- |
| 1   | `kevin_ping`   | Check that the store is reachable                           |
| 2   | `kevin_set`    | Store a value, optionally with a TTL                        |
| 3   | `kevin_get`    | Read a value                                                 |
| 4   | `kevin_del`    | Delete one or more keys, reporting the count                |
| 5   | `kevin_exists` | Test whether keys exist, reporting which                     |
| 6   | `kevin_keys`   | List all keys, sorted                                        |
| 7   | `kevin_len`    | Count the keys                                               |
| 8   | `kevin_ttl`    | Report a key's state: `missing`, `no-expiry` or `expiring`  |
| 9   | `kevin_expire` | Set a key's TTL in seconds                                   |
| 10  | `kevin_flush`  | Delete every key                                             |

Results are JSON documents, so a model can act on them without parsing prose.
Tool failures come back as an error result the model can read, not as a
transport error.

### Client configuration

Point any MCP client at the binary:

```json
{
  "mcpServers": {
    "kevin": {
      "command": "kevin",
      "args": ["mcp", "serve"]
    }
  }
}
```

### Proxy mode limits

The inline KeVIN protocol is whitespace-tokenised, so keys and values cannot
contain spaces or newlines when `kevin mcp serve --addr` proxies over TCP. With
the default in-process store there is no such restriction, because nothing is
re-encoded. The proxy reports the offending token rather than silently
corrupting it.

## Configuration

`serve` flags:

| Flag     | Default | Purpose                                             |
| -------- | ------- | --------------------------------------------------- |
| `--port` | `6379`  | TCP listen port                                     |
| `--gui`  | `false` | Open the key/value manager GUI alongside the server |
| `--tui`  | `false` | Open the key/value manager TUI alongside the server |

`mcp serve` flags:

| Flag     | Default | Purpose                                                       |
| -------- | ------- | ------------------------------------------------------------- |
| `--data` |         | Path to a JSON snapshot, loaded on start and saved on exit     |
| `--addr` |         | Proxy a `kevin serve` at this `address` instead of storing data |

`--data` conflicts with `--addr`.

The TCP server is stateless and in-memory — all data is lost on shutdown,
matching the C and C++ implementations. (`kevin mcp serve --data` is the
exception: it snapshots on exit.)

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

## TUI

`kevin serve --tui` opens a terminal UI built with
[bubbletea](https://github.com/charmbracelet/bubbletea) to inspect and edit
key/value pairs while the TCP server runs in the background. Because the TUI is
pure Go (no CGO), it is compiled into every build:

```bash
make build            # the default bin/kevin already includes the TUI
./bin/kevin serve --tui --port 6379
```

Keys: `tab` cycles Key/Search → Value → table; `enter` sets the inputs or loads
the selected row into them; `↑/↓` move through the table; `d` deletes the
selected row; `D` deletes all keys (with confirmation); `r` refreshes the
fields; `q` or `Ctrl-C` quits and stops the server. `--gui` and `--tui` are
mutually exclusive.

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
