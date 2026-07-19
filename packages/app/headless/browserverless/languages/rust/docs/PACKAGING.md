# Packaging

Browserverless ships as a Cargo-built release binary and Debian-based OCI container
images, published through a rolling GitHub Release.

## Binary

`cargo build --release` produces the `browserverless` binary:

```bash
cargo build --release
# target/release/browserverless
```

Unlike the Go apps in this package, Browserverless is **dynamically linked** against
Servo's graphics stack (surfman/GL, fontconfig/harfbuzz, GTK/X11/Wayland bits). There is
no static build; system dependencies must be present at runtime. See
[CONTRIBUTING](CONTRIBUTING) §Setup for them, and the `Dockerfile` below for the exact
runtime set used in a container.

## Container

Two Dockerfiles exist, both based on `debian:trixie-slim` and both downloading the
prebuilt binary from the rolling release:

| File                | Default port | Notes                                                                                                         |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `Dockerfile`        | 8080         | Minimal runtime: system graphics libs + `browserverless` user.                                                |
| `docker/Dockerfile` | 10000        | Adds `HOME`, `XDG_RUNTIME_DIR`, `XDG_CACHE_HOME` for headless runtime; non-root user with a home + cache dir. |

Runtime libraries installed by both: `libfontconfig1`, `libfreetype6`, `libgl1`,
`libegl1`, `libx11-6`, `libxcb-shape0`, `libxcb-xfixes0`, `libglib2.0-0`, `libgtk-3-0`,
`libharfbuzz0b`, `libdbus-1-3`, `libpango-1.0-0`, `libcairo2`, `ca-certificates`, `wget`.

Both expose the HTTP API and health-check it:

```text
EXPOSE ${PORT}
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/api/v1/health
```

### Build the image

```bash
# Root Dockerfile (port 8080)
cd packages/app/headless/browserverless/rust
docker build -t browserverless-server .
docker run -p 8080:8080 browserverless-server

# docker/Dockerfile (port 10000)
cd packages/app/headless/browserverless/rust/docker
docker build -t browserverless-server .
docker run -p 10000:10000 browserverless-server
```

### `docker-compose.yaml`

A `docker-compose.yaml` at the project root references the image and the 8080 port.

## CI Pipeline

`.github/workflows/ci-app-headless-browserverless.yaml` runs two jobs:

| Stage     | What it does                                                                                                                                                                                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rust`    | Sparse checkout of `packages/app/headless/browserverless/rust`; installs system deps + Rust (with clippy) + sccache; runs `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test --workspace`, `cargo build --release`; uploads `target/release/browserverless` as artifact `app-headless-browserverless`. |
| `publish` | Downloads the artifact, prefixes it `app-headless-browserverless-`, then (re)creates the rolling GitHub Release `app-headless-browserverless-latest` pointing at the pushed commit.                                                                                                                                      |

The publish job force-deletes and recreates the release/tag on every run (with retry), so
the download URLs in [DOWNLOADS](DOWNLOADS) always point at the newest build.

**Published asset:**

```txt
app-headless-browserverless-browserverless
```

## Checklist

1. `cargo fmt --all --check` clean
2. `cargo clippy --workspace --all-targets -- -D warnings` clean
3. `cargo test --workspace` green (includes the headless rendering + serve API tests)
4. `cargo build --release` succeeds and `./target/release/browserverless serve --help` runs
5. `docker build -t browserverless-server .` succeeds and the image answers
   `GET /api/v1/health` with `{"status":"ok"}`
