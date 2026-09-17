# Packaging

KeVIN ships as a single static Rust binary and an OCI container image, alongside
the C, C++ and Go builds in the same rolling release.

## Binary

`make build` (or `cargo build --release`) produces an optimised binary in
`target/release/kevin`. The default build is CLI-only with no GUI dependencies;
the ratatui TUI (`serve --tui`) is included because it is pure Rust.

```bash
cargo build --release
# target/release/kevin
```

For the GUI variant:

```bash
cargo build --release --features gui
# target/release/kevin (with slint GUI support)
```

## Container

The `Dockerfile` is a two-stage build:

1. `rust:1-alpine` builder compiles a musl static binary (`--release`)
2. `scratch` runtime ships `/kevin` and `EXPOSE 6379`

The entrypoint is the server binary directly — no shell, no OS layer.

## CI Pipeline

`.github/workflows/ci-app-headless-kevin.yaml` runs jobs that feed one rolling
release. The Go job currently runs; Rust CI integration is pending.

| Stage     | What it does                                                   |
| --------- | -------------------------------------------------------------- |
| `c`       | make lint + test + build for the C implementation              |
| `cpp`     | make lint + test + build for the C++ implementation            |
| `go`      | make lint + test + build-all for the Go implementation         |
| `rust`    | (planned) make lint + test + build for the Rust implementation |
| `publish` | Publishes a rolling GitHub Release from the uploaded binaries  |

Rust artifacts (planned upload name `app-headless-kevin-rust`):

- `app-headless-kevin-rust-kevin-linux-amd64`
- `app-headless-kevin-rust-kevin-linux-arm64`
- `app-headless-kevin-rust-kevin-darwin-amd64`
- `app-headless-kevin-rust-kevin-darwin-arm64`

The release tag `app-headless-kevin-latest` is force-updated on every push, so
the download URLs in [DOWNLOADS](DOWNLOADS) always point at the newest build.

## Checklist

1. `cargo clippy --all-targets -- -D warnings` clean
2. `cargo fmt -- --check` empty
3. `cargo test --all-targets` green (55 tests)
4. `cargo build --release` succeeds and
   `printf 'PING\r\n' | nc 127.0.0.1 <port>` replies `PONG`
5. `docker build -t kevin-server .` succeeds and the image serves `PONG`
