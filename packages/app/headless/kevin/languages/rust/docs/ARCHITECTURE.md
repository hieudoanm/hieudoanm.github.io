# Architecture

## Tech Stack

| Layer       | Choice                                                    |
| ----------- | --------------------------------------------------------- |
| Language    | Rust 2021 edition                                         |
| CLI         | clap 4 (derive API)                                       |
| Concurrency | Thread-per-connection (`std::thread`)                     |
| Storage     | `BTreeMap<String, Entry>` + `RwLock` (sorted, concurrent) |
| Persistence | Atomic JSON snapshot (`serde_json`, tmp + rename)         |
| Protocol    | Redis-style (PING, SET, GET, KEYS, DEL + TTL commands)    |
| MCP         | Newline-delimited JSON-RPC 2.0 over stdio, hand-rolled    |
| GUI         | slint 1 (Material design, opt-in `gui` feature)           |
| TUI         | ratatui 0.30 + crossterm (compiled into every build)      |
| Testing     | `cargo test` + criterion benchmarks                       |

## Directory Structure

```text
rust/
├── main.rs              # Entrypoint → calls kevin::run()
├── lib.rs               # Re-exports cli::run
├── cli.rs               # clap CLI: Cli / Commands::Serve / run_serve
├── db.rs                # In-memory DB (BTreeMap + RwLock + TTL)
│   ├── db.rs
│   ├── persist.rs       # Atomic JSON load/save
│   └── ttl.rs           # TTL helpers
├── handler.rs           # Protocol parsing (handle_line pure function)
├── server.rs            # TCP accept loop, thread-per-connection
├── gui.rs               # GUI entry point (stub when feature off)
│   └── real.rs          # slint Material window (when feature on)
│   └── ui.slint         # slint markup
├── tui.rs               # ratatui terminal manager (serve --tui)
├── mcp/                 # Model Context Protocol server (mcp serve)
│   ├── mod.rs           # new_server(store) wiring
│   ├── protocol.rs      # JSON-RPC 2.0 envelope: Request / Response / errors
│   ├── schema.rs        # InitializeResult, Tool, Schema, ToolResult
│   ├── server.rs        # Frame dispatch + stdio transport + shutdown
│   ├── store.rs         # Store trait + DbStore (in-process backend)
│   ├── tcp_store.rs     # TcpStore (proxies a remote kevin serve)
│   ├── session.rs       # Backend selection + --data snapshot lifecycle
│   └── tools/
│       ├── mod.rs       # Tool catalogue + registration
│       ├── schema.rs    # Per-tool JSON Schema
│       ├── args.rs      # Argument decoding and validation
│       └── handlers.rs  # Tool → Store calls
├── benches/
│   └── bench.rs         # criterion benchmarks (set/get/keys)
├── tests/
│   ├── handler.rs       # Table-driven handler protocol tests
│   ├── persist.rs       # Atomic persistence tests
│   ├── server.rs        # TCP integration + graceful shutdown
│   └── mcp.rs           # Tool contract over both backends + stdio transport
├── Makefile
├── Dockerfile
└── docs/
```

## Entrypoint (`main.rs`)

`main.rs` is thin: it calls `kevin::run()` and prints any error before exiting.
All CLI wiring lives in `cli.rs`, built on clap derive.

### `cli` (CLI)

`src/cli.rs` declares `Cli` with two subcommands: `Serve(ServeArgs)` and
`Mcp(McpArgs)` → `McpCommands::Serve(McpServeArgs)`. `ServeArgs` has `--port`
(default 6379), `--bind`, `--data`, `--gui` and `--tui` flags (`--gui` conflicts
with `--tui`). `run_serve`:

1. Creates `Arc<DB>` and optionally loads a `--data` JSON file
2. Opens a `TcpListener` on the bind address
3. Registers SIGINT/SIGTERM signal flags for graceful shutdown
4. Without `--gui`/`--tui`: calls `server::serve(listener, kv, stop)`
5. With `--gui` or `--tui`: spawns the server in a thread and runs the UI
   (`gui::run` / `tui::run`) on the main thread — closing the UI stops the
   server

### `db` (Storage)

`src/db.rs` holds the in-memory store: `BTreeMap<String, Entry>` behind a
`RwLock`. `Entry` has an optional `expires: Option<u128>` (epoch-ms) for TTL.
`DB::new()` creates an empty store. Methods: `set`, `get`, `del`, `del_many`,
`keys`, `len`, `flush`. The `TTL` enum (`Missing`, `NoExpiry`, `Remaining(i64)`)
represents the three states for the TTL command. Keys are returned in sorted
order (BTreeMap invariant).

### `handler` (Protocol)

`src/handler.rs` contains `handle_line(line, kv) -> (String, bool)`: a pure
function that parses one protocol line and returns the response. This makes
it easy to unit-test without TCP overhead. Parsing mirrors the C reference:
strip `\r\n`, skip empty lines, tokenise on spaces, case-insensitive commands.
`SET` preserves internal value spaces; EX parsing uses byte-safe ASCII
case-insensitive `b" EX "`.

### `server` (TCP)

`src/server.rs` runs the accept loop. Each accepted connection spawns a
`std::thread` that reads lines, calls `handle_line`, and writes the response.
The loop checks an `AtomicBool` flag between accepts to support graceful
shutdown on SIGINT/SIGTERM.

### `mcp` (Model Context Protocol)

`kevin mcp serve` is a second entry point that never touches the TCP listener.
`Session::open` picks a backend from the flags — `DbStore` over a fresh `DB`
(with optional `--data` snapshot) or `TcpStore` proxying `--addr` — and hands
it to `new_server`, which registers the ten KeVIN tools.

`src/mcp/server.rs` is transport-agnostic: `run_with(reader, writer, server)`
consumes lines and writes frames, so tests drive it in-process.
`serve_stdio` wires it to the real pipes, reading stdin on a background thread
that flips an `AtomicBool` at EOF so the main loop can shut down.

`Server::handle` is the dispatcher, and it is strictly sequential — one frame is
answered before the next is read, so a `TcpStore` connection needs no
synchronisation. A frame whose `id` is null or missing is a notification and is
never answered, whatever its method. Tool failures come back as a `ToolResult`
with `isError: true`; only framing problems (bad JSON, unknown method, unknown
tool) become JSON-RPC errors.

## Request Flow

### Redis protocol

```txt
client → TcpListener::accept → std::thread per conn
  → BufReader reads lines
  → handle_line(line, &db) → (response, should_reply)
  → stream.write(response)
  → on SIGINT/SIGTERM: stop flag set → listener loop exits → save --data
```

### MCP

```txt
MCP client → stdin line (JSON-RPC 2.0)
  → Server::handle(&Request)
  → notification? → drop silently
  → initialize | tools/list | tools/call
  → tools/call → decode args → Store method → ToolResult (JSON text)
  → stdout line (single frame, flushed); diagnostics on stderr
  → on EOF or SIGINT/SIGTERM: loop exits → save --data
```

## Configuration

| Flag     | Default   | Purpose                                      |
| -------- | --------- | -------------------------------------------- |
| `--port` | `6379`    | TCP listen port                              |
| `--bind` | `0.0.0.0` | Address to bind to                           |
| `--data` |           | Path to JSON persistence file                |
| `--gui`  | `false`   | Open slint Material GUI alongside the server |
| `--tui`  | `false`   | Open ratatui TUI alongside the server        |

`kevin mcp serve` flags:

| Flag     | Default | Purpose                                                      |
| -------- | ------- | ------------------------------------------------------------ |
| `--addr` |         | Proxy a `kevin serve` at this `host:port` instead of storing |
| `--data` |         | Path to a JSON snapshot, loaded on start and saved on exit   |

`--addr` conflicts with `--data`: a proxied server owns its own persistence.

`RUST_LOG` overrides the default `info` tracing level. Output goes to stderr —
mandatory for `mcp serve`, whose stdout is the protocol channel.
