# Browserverless

> A lightweight browser runtime built on the **Servo** engine — headed, headless, and
> server-mode execution from one Rust codebase.

![Engine](https://img.shields.io/badge/engine-Servo-orange)
![Platform](https://img.shields.io/badge/platform-cross--platform-blue)
![Build](https://img.shields.io/badge/build-cargo%20%7C%20Rust-blue)

---

## Latest release

- **Version:** `app-headless-browserverless-latest` — rebuilt automatically on every
  push (see [PACKAGING](PACKAGING)).
- **What's new:** see the [ROADMAP](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the option that fits your environment.

### Prebuilt binary

CI publishes a single Linux binary to the rolling release:

```txt
https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-headless-browserverless-latest/app-headless-browserverless-browserverless
```

The binary is dynamically linked against Servo's graphics stack libraries on the target
system (see [PACKAGING](PACKAGING) §Container for the full runtime-set in a container).

```bash
chmod +x browserverless
./browserverless serve --bind 127.0.0.1:8080
```

### Docker

Two Dockerfiles ship the prebuilt binary on a `debian:trixie-slim` runtime:

```bash
# Root Dockerfile (default port 8080)
cd packages/app/headless/browserverless/rust
docker build -t browserverless-server .
docker run -p 8080:8080 browserverless-server

# docker/Dockerfile (default port 10000, correct HOME/XDG runtime dirs for headless)
cd packages/app/headless/browserverless/rust/docker
docker build -t browserverless-server .
docker run -p 10000:10000 browserverless-server
```

Both serve `GET /api/v1/health` (also used as the image `HEALTHCHECK`).

### Build from source

Requires Rust (edition 2021, resolver 2) and Servo's platform graphics stack.

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/headless/browserverless/rust
cargo build --release
./target/release/browserverless --help
```

See [PACKAGING](PACKAGING) for the CI artifact pipeline and [CONTRIBUTING](CONTRIBUTING)
for setup and dev commands.

---

## Features

### 🖥️ Headed mode

Interactive desktop browser via winit + Servo `WindowRenderingContext`. Scroll and
resize are forwarded. The navigation shell is minimal (no back/forward/address-bar yet).

### 📸 Headless rendering

Offscreen rendering via Servo `SoftwareRenderingContext` — no window, desktop session, or
monitor required. Renders a URL to PNG with configurable viewport size, load timeout,
and post-load wait. Verified against real websites, including `example.com`, Wikipedia,
and Instagram (see [ARCHITECTURE](ARCHITECTURE) §Compatibility).

```bash
cargo run -p browserverless-cli -- screenshot https://example.com \
  --output /tmp/example.png --width 1280 --height 720 --timeout 60000
```

### 🌐 Server API

HTTP rendering service (`browserverless serve`) backed by the same Servo engine — never a
custom HTML renderer:

```text
GET  /api/v1/health            -> 200 {"status":"ok"}
GET  /api/v1/version           -> 200 <crate version>
POST /api/v1/scrape            -> 200 <full HTML of url>
POST /api/v1/screenshot        -> 200 <PNG of url>
```

Requests are isolated (one page at a time), bodies are capped at 64 KiB, and every request
logs a structured line. Full API details (metadata headers, error codes, URL policy) in
[ARCHITECTURE](ARCHITECTURE) §Server Mode.

### 📊 Memory profiling

`memory <url>` measures process peak-RSS increase and duration for a URL — useful for
resource budgets.

---

## About

Browserverless is an intentionally lightweight embedder shell around Servo. It does not
roll its own HTML/CSS/JS engine and never embeds Chromium, WebKit, or Gecko. Servo owns the
web platform; the application provides headed, headless, and server-mode shells on top.

## First run

```bash
# Headless screenshot
cargo run -p browserverless-cli -- screenshot https://example.com \
  --output /tmp/example.png --width 1280 --height 720

# Server mode
cargo run -p browserverless-cli -- serve --bind 127.0.0.1:8080
curl -X POST http://127.0.0.1:8080/api/v1/screenshot \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com"}' -o screenshot.png
```

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

MIT (see [LICENSE](../LICENSE)).
