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
| GUI         | slint 1 (Material design, opt-in `gui` feature)           |
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
├── benches/
│   └── bench.rs         # criterion benchmarks (set/get/keys)
├── tests/
│   ├── handler.rs       # Table-driven handler protocol tests
│   ├── persist.rs       # Atomic persistence tests
│   └── server.rs        # TCP integration + graceful shutdown
├── Makefile
├── Dockerfile
└── docs/
```

## Entrypoint (`main.rs`)

`main.rs` is thin: it calls `kevin::run()` and prints any error before exiting.
All CLI wiring lives in `cli.rs`, built on clap derive.

### `cli` (CLI)

`src/cli.rs` declares `Cli` with a single subcommand, `Serve(ServeArgs)`.
`ServeArgs` has `--port` (default 6379), `--bind`, `--data` and `--gui` flags.
`run_serve`:

1. Creates `Arc<DB>` and optionally loads a `--data` JSON file
2. Opens a `TcpListener` on the bind address
3. Registers SIGINT/SIGTERM signal flags for graceful shutdown
4. Without `--gui`: calls `server::serve(listener, kv, stop)`
5. With `--gui`: spawns the server in a thread and runs `gui::run(kv)` on the
   main thread — closing the GUI window stops the server

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

## Request Flow

```
client → TcpListener::accept → std::thread per conn
  → BufReader reads lines
  → handle_line(line, &db) → (response, should_reply)
  → stream.write(response)
  → on SIGINT/SIGTERM: stop flag set → listener loop exits → save --data
```

## Configuration

| Flag     | Default   | Purpose                                      |
| -------- | --------- | -------------------------------------------- |
| `--port` | `6379`    | TCP listen port                              |
| `--bind` | `0.0.0.0` | Address to bind to                           |
| `--data` |           | Path to JSON persistence file                |
| `--gui`  | `false`   | Open slint Material GUI alongside the server |

`RUST_LOG` overrides the default `info` tracing level.
