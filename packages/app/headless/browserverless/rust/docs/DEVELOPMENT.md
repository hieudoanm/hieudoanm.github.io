# Development guide

Everything below is verified against the current implementation. The Servo version is pinned
in `Cargo.lock`; Servo's embedding API is pre-1.0 and changes between releases — always
re-verify against the pinned source (see `servo-patches.md`).

## Prerequisites

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

## Run

```bash
# Screenshot (headless)
cargo run -p browserverless-cli -- screenshot \
  https://example.com --output /tmp/example.png \
  --width 1280 --height 720 --timeout 60000

# Headless load-and-exit
cargo run -p browserverless-cli -- headless https://example.com --timeout 30000

# Headed window (note: loads a hardcoded https://example.com; the `open` URL arg is ignored)
cargo run -p browserverless-cli -- open
```

Use `RUST_LOG=debug cargo run ...` for verbose Servo/embedder logs.

## Test

```bash
cargo test --workspace             # unit + integration tests
cargo test -p headless             # includes the rendering regression test
cargo test -p headless -- --nocapture
```

## Check (must stay green before finishing a change)

```bash
cargo fmt --all --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test --workspace
```

CI runs the same gates via
`.github/workflows/ci-app-native-rust-browserverless.yaml`.

## Makefile status

`Makefile` `screenshot` uses `-p cli` and is broken (see above). `test-css`, `test-html`,
`test-dom`, `test-style`, `test-layout`, `test-renderer`, `test-network`, `test-gui`,
`test-browser`, `test-integration` reference non-workspace crates and are likewise dead or
broken. Fix the Makefile or delete those targets when convenient. Prefer the direct `cargo`
commands above.

## Stale crate directories (dead code)

`crates/css`, `crates/dom`, `crates/gui`, `crates/html`, `crates/layout`, `crates/network`,
`crates/paint`, `crates/renderer`, `crates/style` are leftovers from a prototyping phase
where the project had its own small engine. They are **not** workspace members (see root
`Cargo.toml`) and do not compile in the current build. They are safe to delete, but do not
reintroduce them — see `AGENTS.md` §0-§58 (Servo-only; never implement a second engine).
`tests/css/*`, `tests/html/*`, and most `tasks/*` contend those eras; `tests/rendering/mvp.html`
is current and used for the MVP acceptance test.

## Troubleshooting

### "all-white screenshot"

Symptoms: saved PNG is uniformly white; `readback distinct_colors=1`.
Cause to rule out first: the navigation never reached the page. See `servo-patches.md` —
the fix is to pass the URL via `WebViewBuilder::url()` on `new_page`, never relying on an
uncoupled `webview.load()` right after build.

### `LoadUrl for unknown browsing context` (WARN from constellation)

A `webview.load()` was issued before the constellation registered the browsing context; the
navigation is **dropped silently**, leaving the initial `about:blank` (white). Do not add
more `load()` calls; pre-spin the event loop before issuing a load and prefer builder-supplied
URLs for the initial navigation.

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

Per `AGENTS.md` §2/§41:

1. Change the pin in `Cargo.toml` / update `Cargo.lock`.
2. `cargo build --workspace`.
3. Fix embedding API breakages at the single boundary (`crates/browserverless/src/lib.rs`).
4. `cargo test --workspace`, then real-URL smoke tests (see `COMPATIBILITY.md`).
5. Record any new workaround in `docs/servo-patches.md`; update compatibility notes.