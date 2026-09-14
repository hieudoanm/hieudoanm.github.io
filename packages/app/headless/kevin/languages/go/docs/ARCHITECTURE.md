# Architecture

## Tech Stack

| Layer       | Choice                                           |
| ----------- | ------------------------------------------------ |
| Language    | Go 1.26+ (module `github.com/hieudoanm/kevin`)   |
| Concurrency | Goroutine-per-connection                         |
| Storage     | In-memory `map[string]string` + `sync.RWMutex`   |
| Protocol    | Redis-style (PING, SET, GET, KEYS, DEL) over TCP |
| Testing     | Standard `go test`, table-driven tests           |

## Directory Structure

```txt
go/
├── main.go                 # Entrypoint (package main)
├── Makefile                # build, test, format, lint, build-all, coverage, install
├── Dockerfile              # Multi-stage scratch image
├── internal/
│   ├── db/                 # In-memory key/value store (RWMutex + map)
│   │   ├── db.go
│   │   └── db_test.go
│   └── server/             # TCP accept loop and protocol handler
│       ├── server.go
│       ├── handler.go
│       ├── handler_test.go
│       └── server_test.go
└── docs/
```

## Entrypoint (`main.go`)

`main.go` is the module root (`package main`). It:

1. Parses `--port` (default `6379`)
2. Opens a TCP listener on `:<port>`
3. Creates a `db.DB` and passes it to `server.New`
4. Calls `Serve(ctx, ln)` which accepts connections until SIGINT/SIGTERM
5. Logs the listening address; exits on error

The entrypoint is thin — all protocol and storage logic lives in `internal/`.

## Request Flow

```
client → net.Listen.Accept → goroutine per conn
  → bufio.Scanner reads lines
  → handleLine(line, db) → response string
  → conn.Write(response)
```

`handleLine` in `internal/server/handler.go` is a pure function (aside from
`db` mutations) that parses one protocol line and returns the response. This
makes it easy to unit test without TCP overhead.

### Protocol Parsing

Parsing mirrors the C reference exactly:

1. Strip trailing `\r\n` (Windows and POSIX line endings)
2. Skip empty/whitespace-only lines (no response)
3. Tokenise on spaces (consecutive spaces collapse, trailing spaces ignored)
4. Command is case-insensitive (`PING`, `ping`, `Ping` all work)
5. `SET key value` — value preserves internal spaces (`SET a b  c` → `b  c`)
6. `GET key` / `DEL key` — exactly one argument required (extra args → usage error)

## Modules

### `internal/db`

Concurrency-safe in-memory key/value store built on `map[string]string` and
`sync.RWMutex`. Methods: `New`, `Set`, `Get`, `Del`, `Keys`.

### `internal/server`

TCP server (`Server.Serve`) and protocol handler (`handleLine`). The server
accepts connections in a loop and spawns a goroutine per connection. The handler
dispatches on the first token and writes a single-line response per command.

## Configuration

| Flag | Default | Purpose         |
| ---- | ------- | --------------- |
| port | 6379    | TCP listen port |

No environment variables are read; behaviour is identical to the C and C++
implementations.
