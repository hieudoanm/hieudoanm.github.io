# Architecture

## Tech Stack

| Layer       | Choice                                                 |
| ----------- | ------------------------------------------------------ |
| Language    | Go 1.26+ (module `github.com/hieudoanm/kevin`)         |
| Concurrency | Goroutine-per-connection                               |
| Storage     | In-memory `map[string]string` + `sync.RWMutex`         |
| Protocol    | Redis-style (PING, SET, GET, KEYS, DEL) over TCP       |
| MCP         | Newline-delimited JSON-RPC 2.0 over stdio, hand-rolled |
| GUI         | fyne window (`gui` build tag, CGO required)            |
| TUI         | bubbletea terminal UI (compiled into every build)      |
| Testing     | Standard `go test`, table-driven tests                 |

## Directory Structure

```txt
go/
├── main.go                 # Entrypoint (package main) → calls cmd
├── cmd/                    # cobra CLI (root + serve + mcp subcommands)
│   ├── root.go
│   ├── serve.go
│   └── mcp_serve.go        # `mcp serve` (--data, --addr)
├── Makefile                # build, build-gui, test, format, lint, build-all, coverage, install
├── Dockerfile              # Multi-stage scratch image
├── internal/
│   ├── db/                 # In-memory key/value store (RWMutex + map)
│   │   ├── db.go
│   │   └── db_test.go
│   ├── gui/                # fyne key/value manager (build tag `gui`)
│   │   ├── gui.go          #   non-gui stub → ErrUnavailable
│   │   └── gui_fyne.go     #   `//go:build gui` fyne window
│   ├── tui/                # bubbletea terminal key/value manager
│   │   └── tui.go          #   model, key handling, view
│   ├── server/             # TCP accept loop and protocol handler
│   │   ├── server.go
│   │   ├── handler.go
│   │   ├── handler_test.go
│   │   └── server_test.go
│   └── mcp/                # Model Context Protocol server
│       ├── protocol.go     #   JSON-RPC 2.0 envelope: Request / Response
│       ├── server.go       #   frame dispatch + stdio transport + shutdown
│       ├── store.go        #   Store interface + in-process backend
│       ├── tcpstore.go     #   TCP proxy to a remote kevin serve
│       └── tools.go        #   tool catalogue, schemas, handlers
└── docs/
```

## Entrypoint (`main.go`)

`main.go` is the module root (`package main`) and stays thin: it calls
`cmd.NewRootCommand().Execute()` and exits on error. All CLI wiring lives in
`cmd/`, built on [cobra](https://cobra.dev).

### `cmd` (CLI)

The root command (`cmd/root.go`) declares the binary and registers two
subcommands: `serve` (`cmd/serve.go`) and `mcp` (`cmd/mcp_serve.go`).
`serve`:

1. Parses `--port` (default `6379`), `--gui` and `--tui` (default `false`)
2. Opens a TCP listener on `:<port>` and creates a `db.DB`
3. Without `--gui`/`--tui`: calls `server.Serve(ctx, ln)` until SIGINT/SIGTERM
4. With `--gui` or `--tui`: runs the server in a goroutine and opens the UI
   (`internal/gui` / `internal/tui`) on the same `db.DB`, so keys edited in the
   UI are visible over TCP immediately

The fyne GUI lives behind the `gui` build tag because it requires CGO. The
default (CGO-free) build compiles `internal/gui/gui.go`, a stub whose `Run`
returns `ErrUnavailable`; `make build-gui` compiles the real window via
`//go:build gui`. The bubbletea TUI (`internal/tui`) is pure Go and is compiled
into every build, so `serve --tui` works out of the box. `--gui` and `--tui`
are mutually exclusive.

`mcp serve` parses `--data` (snapshot file) and `--addr` (proxy target), which
are mutually exclusive, then builds a `mcp.Server` over a `mcp.Store` — either
the in-process backend or the TCP proxy — and runs it over stdio.

### `internal/mcp`

`server.go` is transport-agnostic: `Serve(in io.Reader, out io.Writer)` consumes
lines and writes frames, so tests drive it in-process. The stdio path wires it to
the real pipes and stops on EOF or SIGINT/SIGTERM. Dispatch is strictly
sequential — one frame is answered before the next is read — so a proxied store
needs no locking. A frame with a nil `ID` is a notification and is never
answered, whatever its method. Tool failures come back as a `ToolResult` with
`IsError: true`; only framing problems (bad JSON, unknown method, unknown tool)
become JSON-RPC errors.

`store.go` defines the `Store` interface and the in-process implementation;
`tcpstore.go` implements the same interface over a socket to a remote
`kevin serve`. That proxy is what makes `--addr` possible, and it re-encodes
every call into the inline KeVIN protocol — hence the no-spaces rule.

## Request Flow

```txt
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

### MCP

```
MCP client → stdin line (JSON-RPC 2.0)
  → mcp.Server.handle(req)
  → req.ID == nil? → drop silently (notification)
  → initialize | tools/list | tools/call
  → tools/call → decode arguments → Store call → ToolResult (JSON text)
  → stdout line (single frame); diagnostics on stderr
  → on EOF or SIGINT/SIGTERM: return
```

## Modules

### `internal/db`

Concurrency-safe in-memory key/value store built on `map[string]string` and
`sync.RWMutex`. Methods: `New`, `Set`, `Get`, `Del`, `Keys`.

### `internal/server`

TCP server (`Server.Serve`) and protocol handler (`handleLine`). The server
accepts connections in a loop and spawns a goroutine per connection. The handler
dispatches on the first token and writes a single-line response per command.

### `internal/mcp`

`Store` is the seam that keeps the protocol layer store-agnostic: the in-process
backend wraps `*db.DB`, the TCP proxy wraps a `net.Conn`, and the ten tools in
`tools.go` are written once against the interface.

## Configuration

| Flag     | Default | Purpose                                                   |
| -------- | ------- | --------------------------------------------------------- |
| `--port` | `6379`  | TCP listen port                                           |
| `--gui`  | `false` | Open the fyne key/value manager alongside the server      |
| `--tui`  | `false` | Open the bubbletea key/value manager alongside the server |

`kevin mcp serve` flags:

| Flag     | Default | Purpose                                                    |
| -------- | ------- | ---------------------------------------------------------- |
| `--data` |         | Path to a JSON snapshot, loaded on start and saved on exit |
| `--addr` |         | Proxy a `kevin serve` at this address instead of storing   |

`--data` conflicts with `--addr`: a proxied server owns its own persistence.

No environment variables are read; behaviour is identical to the C and C++
implementations (the GUI, TUI and MCP server are Go/Rust-only).
