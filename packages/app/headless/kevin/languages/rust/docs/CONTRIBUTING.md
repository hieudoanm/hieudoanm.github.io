# Contributing

## Setup

```bash
cd packages/app/headless/kevin/rust
cargo build --release
```

## Commands

| Command                       | Purpose                                     |
| ----------------------------- | ------------------------------------------- |
| `cargo check`                 | Type-check without building                 |
| `cargo test`                  | Run all unit + integration tests            |
| `cargo clippy -- -D warnings` | Lint (deny warnings)                        |
| `cargo fmt`                   | Format all Rust files                       |
| `cargo bench`                 | Criterion benchmarks (set/get/keys)         |
| `make all`                    | `format` + `lint` + `test` + `build`        |
| `make build`                  | `cargo build --release`                     |
| `make build-gui`              | `cargo build --release --features gui`      |
| `make test`                   | `cargo test --all-targets`                  |
| `make lint`                   | `cargo clippy --all-targets -- -D warnings` |
| `make format`                 | `cargo fmt`                                 |
| `make bench`                  | `cargo bench`                               |
| `make install`                | `cargo install --path .`                    |

## Coding Conventions

Follow the repo-wide [Rust conventions](../../../../../../../.skills/languages/rust/rust.md):

- `Result<T, E>` for fallible functions, never `panic!`
- `Option<T>` over sentinel values (`-1`, `null`, empty strings)
- `impl Trait` in argument positions; prefer `&str` over `&String`
- `match` over `if let` chains; exhaustive branches
- `clippy -- -D warnings` must pass with zero diagnostics
- No comments (unless explicitly requested)
- Files ≤ 200 lines; functions ≤ 30 lines
- Table-driven tests with descriptive names

Crate-specific:

- CLI: clap derive (`#[derive(Parser)]`, `#[derive(Subcommand)]`)
- Errors: `anyhow::Result` for application code; domain errors via `thiserror`
  if needed later
- Tracing: `tracing` + `tracing-subscriber` with `EnvFilter`
- Shared state: `Arc<DB>` (not `Rc`) so it works across threads
- GUI closures: `Arc<Mutex<App>>` (slint callbacks must be `Send + 'static`)
- `slint-build` is always in `[build-dependencies]`; `build.rs` skips
  compilation at runtime when the `gui` feature is off
- TUI (`src/tui.rs`) uses `ratatui` + `crossterm`; it is always compiled, so
  `serve --tui` works in every build. Key input is filtered on
  `KeyEventKind::Press`, and `--gui`/`--tui` are declared `conflicts_with`.

## Testing Conventions

- Colocate `#[cfg(test)] mod tests` with the code they test (`src/db.rs`,
  `src/handler.rs`, `src/mcp/`)
- Integration tests in `tests/` (`handler.rs`, `persist.rs`, `server.rs`,
  `mcp.rs`) — 129 tests in total
- `tests/handler.rs` exercises `handle_line` with table-driven cases — no TCP
- `tests/server.rs` runs end-to-end tests over a real TCP connection with
  graceful shutdown verification
- `tests/persist.rs` verifies atomic save/load and expired-key pruning
- `tests/mcp.rs` drives the tool contract through the wire protocol against
  both store backends, checks snapshot persistence across a restart, and spawns
  the real binary to assert stdout carries only JSON-RPC — an in-process test
  cannot catch log lines leaking into the protocol stream
- Each test creates its own `DB::new()` — no shared mutable state

## Docs

Update `docs/ARCHITECTURE.md` when the module layout or protocol changes.
Update `README.md` when adding or changing commands.
Keep `docs/ROADMAP.md` checkboxes in sync with what actually ships.
