# KeVIN (Rust)

A Redis-style in-memory key/value store in a single static Rust binary — PING,
SET, GET, KEYS, DEL over TCP, behaviour-identical to the C, C++ and Go
implementations. Ships a built-in ratatui TUI (`serve --tui`) plus an
optional slint Material GUI (`--gui` feature).

## Commands

| Command                              | Description                                  |
| ------------------------------------ | -------------------------------------------- |
| `cargo check`                        | Type-check without building                  |
| `cargo build --release`              | Optimised build (no GUI; includes ratatui TUI) |
| `cargo build --release --features gui` | Build with slint GUI (`--gui`)               |
| `cargo test`                         | Run all unit + integration tests             |
| `cargo clippy -- -D warnings`        | Lint (deny warnings)                         |
| `cargo fmt`                          | Format all Rust files                        |
| `cargo bench`                        | Criterion benchmarks (set/get/keys)          |
| `make all`                           | `format` + `lint` + `test` + `build`         |
| `make build`                         | `cargo build --release`                      |
| `make build-gui`                     | `cargo build --release --features gui`       |
| `make test`                          | `cargo test --all-targets`                   |
| `make lint`                          | `cargo clippy --all-targets -- -D warnings`  |
| `make format`                        | `cargo fmt`                                  |
| `make bench`                         | `cargo bench`                                |
| `make install`                       | `cargo install --path .`                     |
| `make clean`                         | `cargo clean`                                |

## Key Conventions

- CLI built with clap derive: `src/main.rs` stays thin and calls
  `kevin::run()`. `src/cli.rs` declares the `Cli` struct with one subcommand,
  `serve`, parsed via `#[derive(Parser)]`. `serve` accepts `--port` (default
  6379), `--bind`, `--data`, `--gui` and `--tui` flags (`--gui` conflicts with
  `--tui`).
- Source layout: `src/main.rs` → `src/lib.rs` → `src/cli.rs` (clap wiring) →
  `src/db.rs` (in-memory store) + `src/db/ttl.rs` + `src/db/persist.rs` →
  `src/handler.rs` (protocol parsing) + `src/server.rs` (TCP accept loop) +
  `src/gui.rs` + `src/gui/ui.slint` + `src/gui/real.rs` (optional GUI) +
  `src/tui.rs` (ratatui terminal manager).
- `DB` is `Arc<DB>` shared between server and UI. In-memory storage is a
  `BTreeMap<String, Entry>` + `RwLock` (sorted keys, concurrent reads). TTL
  is per-key, measured as epoch-ms `u128` for precision.
- `--gui` opens a slint Material window sharing the same `DB` as the TCP
  server. The GUI feature is opt-in: `cargo build --features gui`. Without
  the feature, `gui::run` returns an error. GUI callback closures use
  `Arc<Mutex<App>>` (not `Rc<RefCell>`) to satisfy slint's `Send` bound.
- `--tui` opens a ratatui terminal manager sharing the same `DB` as the TCP
  server. ratatui/crossterm are plain (non-optional) dependencies so the TUI
  ships in every build; `run_with_ui` dispatches `--gui`/`--tui` to a UI fn
  with `Arc<DB>`, running the server on a background thread.
- Protocol parsing mirrors the C reference exactly: strip trailing `\r\n`,
  skip empty/whitespace lines, tokenise on spaces, case-insensitive commands.
  `SET` preserves internal value spaces; EX parsing uses byte-safe ASCII
  case-insensitive `b" EX "`. Commands: PING, SET, GET, KEYS, DEL (variadic),
  EXPIRE, TTL, EXISTS, LEN, FLUSHALL, FLUSHDB.
- `handle_line(line: &str, kv: &DB) -> (String, bool)` is the core pure
  function — returns (response, should_reply). Keep it table-testable.
- Follow repo-wide Rust conventions from the root
  [AGENTS.md](../../../../../AGENTS.md): `Result`, `Option` over sentinels,
  `impl Trait`, `match`, `clippy -- -D warnings` clean, no comments,
  `#[derive(Debug)]`, `&str` over `&String`, files ≤ 200 lines.
- `slint-build` is a non-optional build dependency. `build.rs` uses a runtime
  gate (`CARGO_FEATURE_GUI` env var) to skip compilation when the feature is
  off, avoiding `cfg` in the build script while keeping the slint compiler
  available when the feature is enabled.
- Tests: 55 tests across `src/` (unit), `tests/handler.rs` (protocol table
  tests), `tests/persist.rs` (atomic save/load), `tests/server.rs` (TCP
  integration + graceful shutdown). Each test creates its own `DB::new()`.
- The binary listens on `:<port>` (default 6379). Persistence is optional:
  `--data <file>` writes JSON `{data, expires}` on SIGINT/SIGTERM and loads
  on start. Atomic save uses a tmp file + rename, 0600 permissions.
- CI workflow (`ci-app-headless-kevin.yaml`) currently runs Go only; Rust CI
  integration is pending.

## Data

- In-memory `BTreeMap<String, Entry>` guarded by `RwLock` (sorted keys,
  concurrent reads). Optional JSON persistence via `--data <file>`.
- `serve --port`, `--bind`, `--data`, `--gui` and `--tui` are the only
  configuration. Structured logging via `RUST_LOG` (default: `info`).
- `target/` is gitignored (build output).

## Documentation

| Document                                       | Description                                               |
| ---------------------------------------------- | --------------------------------------------------------- |
| [docs](./docs/)                                | Architecture, contributing, downloads, packaging, roadmap |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Tech stack, module map, request flow                      |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Setup, commands, conventions, testing                     |
| [docs/DOWNLOADS.md](./docs/DOWNLOADS.md)       | Get the binary, Docker image, or source                   |
| [docs/PACKAGING.md](./docs/PACKAGING.md)       | Binary + container + CI artifact pipeline                 |
| [docs/ROADMAP.md](./docs/ROADMAP.md)           | Phased feature roadmap                                    |
