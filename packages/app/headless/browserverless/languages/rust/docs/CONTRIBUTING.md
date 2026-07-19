# Contributing

Everything below is verified against the current implementation. The Servo version is pinned
in `Cargo.lock`; Servo's embedding API is pre-1.0 and changes between releases — always
re-verify against the pinned source (see [ARCHITECTURE](ARCHITECTURE) §Servo Integration
Notes).

## Setup

Prerequisites:

- Rust toolchain (edition 2021, resolver 2). The project has been built on macOS arm64.
- Platform graphics stack required by Servo (surfman backend, etc.). macOS works out of the
  box; headed mode additionally needs a windowing session.

## Build

```bash
cargo build                         # workspace debug build (3 crates)
cargo build -p browserverless-cli   # the binary package name
cargo build --release
```

`browserverless` is the bin **name**; the compile **package** is `browserverless-cli`.
Commands like `make screenshot` that use `-p cli` are **broken** — that name refers to the
stale custom-engine crate and is not a workspace member.

## Commands

| Command                                                           | Purpose                               |
| ----------------------------------------------------------------- | ------------------------------------- |
| `cargo build`                                                     | Workspace debug build                 |
| `cargo build --release`                                           | Release build                         |
| `cargo run -p browserverless-cli -- screenshot <url> [opts]`      | Headless screenshot of a URL          |
| `cargo run -p browserverless-cli -- scrape <url> [-o page.html]`  | Dump the full HTML of a URL           |
| `cargo run -p browserverless-cli -- headless <url> [--timeout N]` | Headless load-and-exit                |
| `cargo run -p browserverless-cli -- memory <url> [--observe N]`   | Measure peak RSS + duration           |
| `cargo run -p browserverless-cli -- serve --bind 127.0.0.1:8080`  | Serve the HTTP rendering API          |
| `cargo run -p browserverless-cli -- open`                         | Headed window (hardcoded example.com) |
| `RUST_LOG=debug cargo run ...`                                    | Verbose Servo/embedder logs           |

CLI screenshots flags: `--output` (default `screenshot.png`), `--width` (1280),
`--height` (720), `--timeout` (30 000 ms, pass to `load_timeout_ms`). The URL is
positional and must be absolute (`file://`, `http://`, `https://`). Server flags:
`--bind` (default 127.0.0.1:8080), `--port` (overrides the port in `--bind`),
`--width`/`--height` (serve viewport, default 1280x720), `--timeout` (30 000).

## Test / Check (must stay green before finishing a change)

```bash
cargo fmt --all --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test --workspace
```

CI runs the same gates via `.github/workflows/ci-app-headless-browserverless.yaml`
(see [PACKAGING](PACKAGING)).

## Makefile status

The `Makefile` `screenshot` target uses `-p cli` and is broken (see above). `test-css`,
`test-html`, `test-dom`, `test-style`, `test-layout`, `test-renderer`, `test-network`,
`test-gui`, `test-browser`, `test-integration` reference non-workspace crates and are
likewise dead or broken. Fix the Makefile or delete those targets when convenient.
Prefer the direct `cargo` commands above.

## Coding Conventions

Follow the repo-wide [Coding Convention](../../../../../../AGENTS.md) and the browserverless
[AGENTS.md](../AGENTS.md). In short for Rust:

- `Result<T, E>` for fallible functions, never `panic!`; `Option<T>` over sentinel values
- `match` over `if let` chains (exhaustive, compiler-verified)
- `thiserror` / `anyhow` for error types, `#[derive(Debug, Clone, PartialEq)]` liberally
- Prefer `&str` over `&String` in function params; iterators over indexed loops
- Keep `unsafe` in small, audited blocks with `// SAFETY:` comments
- `cargo clippy -- -D warnings` as the lint gate

Servo-specific rules (browserverless `AGENTS.md` §44): inspect the exact Servo version in
`Cargo.lock`, prefer the public embedding API, isolate unavoidable Servo internals at the
single boundary (`crates/browserverless/src/lib.rs`), document every workaround in
[ARCHITECTURE](ARCHITECTURE) §Servo Integration Notes, and add a regression test.

## Testing Conventions

- Colocate `*_test.rs` files in the same crate (Rust convention).
- **The headless rendering test is a single test.** Servo's `opts`/`prefs` are
  process-global; a second `HeadlessBrowser::new` in the same process panics
  (`Already initialized`). Run the full pipeline with `cargo test -p headless`.
- **The serve test is likewise a single test.** `crates/cli/tests/serve_api.rs` exercises
  health/version/scrape/screenshot/scheme-blocking/400/404/405 in one process.
- Screenshot correctness is asserted against `tests/rendering/mvp.html` (AGENTS §47 golden
  geometry) and real rendered pixels — not empty/blank images.

## Stale crate directories (dead code)

`crates/css`, `crates/dom`, `crates/gui`, `crates/html`, `crates/layout`, `crates/network`,
`crates/paint`, `crates/renderer`, `crates/style` are leftovers from a prototyping phase
where the project had its own small engine. They are **not** workspace members (see root
`Cargo.toml`) and do not compile in the current build. They are safe to delete, but do not
reintroduce them — see browserverless `AGENTS.md` §0–§58 (Servo-only; never implement a
second engine). `tests/css/*`, `tests/html/*`, and most `tasks/*` contend those eras;
`tests/rendering/mvp.html` is current and used for the MVP acceptance test.

## Troubleshooting

### "all-white screenshot"

Symptoms: saved PNG is uniformly white; `readback distinct_colors=1`.
Cause to rule out first: the navigation never reached the page. See [ARCHITECTURE](ARCHITECTURE)
§Servo Integration Notes §1 — pass the URL via `WebViewBuilder::url()` on `new_page`, never
relying on an uncoupled `webview.load()` right after build.

### `LoadUrl for unknown browsing context` (WARN from constellation)

A `webview.load()` was issued before the constellation registered the browsing context; the
navigation is **dropped silently**, leaving the initial `about:blank` (white). Do not add
more `load()` calls; pre-spin the event loop before issuing a load and prefer
builder-supplied URLs for the initial navigation.

### `readback after present` is black

Expected. The software surface is double-buffered (surfman); `present()` swaps in a cleared
buffer. Read the surface **before** present, or use `take_screenshot` (the PNG path) which
reads the WebRender scene directly.

### `Cropping texture upload Box2D((0, 0), (0, 1))` warnings

Harmless noise from webrender 0.68 debug asserts on near-empty crop rects. Not the cause
of rendering bugs.

### `UNSUPPORTED ... GL_* is unloadable and bound to sampler type (Float)`

Harmless GL-context noise on macOS; screenshots still render correctly.

### Timeout on heavy pages

`HeadlessConfig::load_timeout_ms` (or CLI `--timeout`) defaults to 30 s. Debug-build Servo
rendering of heavyweight sites (e.g. Wikipedia) benefits from 60–120 s. The regression test
uses 60 s.

### `Already initialized: Opts {...}` panic

You attempted to construct a **second** Servo instance in the same process. Servo's
`opts`/`prefs` are process-global and can only be set once. Run each Servo instance in its
own process. This also explains why the headless rendering test is a single test — the
second `HeadlessBrowser::new` would panic.

## Servo upgrades

Per browserverless `AGENTS.md` §2/§41:

1. Change the pin in `Cargo.toml` / update `Cargo.lock`.
2. `cargo build --workspace`.
3. Fix embedding API breakages at the single boundary (`crates/browserverless/src/lib.rs`).
4. `cargo test --workspace`, then real-URL smoke tests (see [ARCHITECTURE](ARCHITECTURE) §Compatibility).
5. Record any new workaround in [ARCHITECTURE](ARCHITECTURE) §Servo Integration Notes;
   update the compatibility notes.

## Docs

- Update [ARCHITECTURE](ARCHITECTURE) when the module layout, server API, headless/headed
  pipeline, or Servo integration changes.
- Update `README.md` when adding or changing CLI commands.
- Keep [ROADMAP](ROADMAP) checkboxes in sync with what actually ships.
