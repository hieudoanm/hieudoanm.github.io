# KeVIN (Kotlin)

> A Redis-style in-memory key/value store on the JVM — the same PING, SET, GET,
> KEYS, DEL protocol as the C, C++, Go and Rust implementations, with a Clikt
> CLI, a Mordant TUI and a Compose Multiplatform desktop GUI.

![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-JVM--21-blue)
![Kotlin](https://img.shields.io/badge/kotlin-2.4-blue)

---

## Latest release

CI builds and publishes the JVM artifacts on every push to the same rolling
release as the C and C++ builds:

- **Release:** `app-headless-kevin-latest`
- See [PACKAGING](docs/PACKAGING) for the pipeline and [ROADMAP](docs/ROADMAP)
  for what's next.

---

## Installation

```sh
git clone https://github.com/hieudoanm/hieudoanm.github.io
cd packages/app/headless/kevin/languages/kotlin
make install
```

The launcher is written to `$HOME/bin/kevin`. Requires a JDK 21 runtime.

---

## Usage

```sh
kevin serve                         # TCP server on 0.0.0.0:6379
kevin serve --port 7000             # custom port
kevin serve --bind 127.0.0.1        # custom bind address
kevin serve --data kevin.json       # persist to a JSON file
kevin serve --tui                   # key/value manager TUI
kevin serve --gui                   # key/value manager GUI
kevin mcp serve                     # MCP server on stdio
kevin mcp serve --data store.json   # MCP server persisted to a JSON snapshot
kevin mcp serve --addr host:6379    # MCP server proxying a running kevin serve
```

`--tui` and `--gui` are mutually exclusive. Both managers run alongside the TCP
server and share the same store, so you can edit keys in the manager while
clients talk to the server.

---

## Protocol

Line-based over TCP, one command per line:

| Command                    | Reply                                  | Notes                            |
| -------------------------- | -------------------------------------- | -------------------------------- |
| `PING`                     | `PONG`                                 |                                  |
| `SET key value`            | `OK`                                   | overwrites and clears any expiry |
| `SET key value EX seconds` | `OK`                                   | expires the key                  |
| `GET key`                  | value or `(nil)`                       |                                  |
| `KEYS`                     | keys joined by spaces                  | insertion order                  |
| `DEL key [key ...]`        | number deleted                         |                                  |
| `EXISTS key`               | `1` or `0`                             |                                  |
| `LEN`                      | key count                              |                                  |
| `FLUSHALL`, `FLUSHDB`      | `OK`                                   | removes every key                |
| `EXPIRE key seconds`       | `1` or `0`                             |                                  |
| `TTL key`                  | seconds, `-1` persistent, `-2` missing | rounds up                        |

Blank lines are ignored. Commands are case-insensitive.

```sh
$ printf 'SET name kevin\r\nGET name\r\n' | nc localhost 6379
OK
kevin
```

---

## Managers

`--tui` and `--gui` both present the same key/value manager.

- Search/filter across keys and values
- Set, edit, delete one key, or delete all keys
- Copy a value to the clipboard (GUI)
- Live key count in the window/tab title and a status line

TUI bindings: `tab` cycles focus, `enter` sets or edits, `↑`/`↓` move, `d`
deletes, `D` deletes everything (twice to confirm), `r` refreshes, `q` quits.

---

## Persistence

`--data <path>` loads the store at startup and writes it back on shutdown. The
file is a JSON snapshot:

```json
{
  "data": { "name": "kevin" },
  "expires": { "session": 1767225600000 }
}
```

`expires` holds epoch milliseconds and is omitted when no key expires. Writes go
to a temp file and are renamed into place, so a crash never leaves a partial
file. Expired keys are dropped when the snapshot loads.

---

## MCP (Model Context Protocol)

`kevin mcp serve` speaks newline-delimited
[JSON-RPC 2.0](https://www.jsonrpc.org/specification) on stdin/stdout — the
transport MCP clients expect. Logging goes to stderr, so stdout carries only
protocol frames.

```sh
# Back the tools with an in-process store
kevin mcp serve

# Back the tools with an in-process store persisted to a JSON snapshot
kevin mcp serve --data store.json

# Proxy a running server instead of holding data locally
kevin serve --port 6379 &
kevin mcp serve --addr 127.0.0.1:6379
```

`--addr` and `--data` are mutually exclusive: one proxies a remote server, the
other owns local data. There is no MCP SDK dependency — the protocol is a few
hundred lines of `kotlinx.serialization` over two streams.

### Tools

| No  | Tool           | Description                                                 |
| --- | -------------- | ----------------------------------------------------------- |
| 1   | `kevin_ping`   | Check that the store is reachable                           |
| 2   | `kevin_set`    | Store a value, optionally with a TTL                        |
| 3   | `kevin_get`    | Read a value                                                 |
| 4   | `kevin_del`    | Delete one or more keys, reporting the count                |
| 5   | `kevin_exists` | Test whether keys exist, reporting which                     |
| 6   | `kevin_keys`   | List all keys                                                |
| 7   | `kevin_len`    | Count the keys                                               |
| 8   | `kevin_ttl`    | Report a key's state: `missing`, `no-expiry` or `expiring`  |
| 9   | `kevin_expire` | Set a key's TTL in seconds                                   |
| 10  | `kevin_flush`  | Delete every key, which must be confirmed with `confirm`     |

Results are JSON documents, so a model can act on them without parsing prose.
A tool failure comes back as a result with `isError: true` and a readable
message, not as a transport error. Only framing problems, unknown methods and
unknown tools use JSON-RPC error codes.

### Client configuration

Point any MCP client at the launcher:

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

---

## Development

```sh
make test       # unit tests
make build      # bin/kevin.jar
make coverage   # HTML coverage report
make clean
```

See [CONTRIBUTING](docs/CONTRIBUTING) for the conventions and
[ARCHITECTURE](docs/ARCHITECTURE) for the module layout.

---

## License

GPL-3.0 — see [LICENSE](LICENSE).
