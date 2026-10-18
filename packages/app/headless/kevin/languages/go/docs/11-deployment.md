# KeVIN (Go) — Deployment

## 1. Purpose

Covers building, packaging, and distribution.

## 2. Build

- `make build`: CGO_ENABLED=0, includes TUI → `bin/kevin`
- `make build-gui`: CGO_ENABLED=1 with `gui` tag → `bin/kevin-gui`
- `make build-all`: Cross-compile for linux/amd64, linux/arm64, darwin/amd64, darwin/arm64

## 3. Container

Multi-stage Dockerfile: golang builder → scratch runtime, exposes 6379, entrypoint runs `serve`.

## 4. CI & Releases

GitHub Actions run lint/test/build-all and publish rolling release `app-headless-kevin-latest` with binaries.

## 5. Installation

See [DOWNLOADS.md](./04-architecture/DOWNLOADS.md) and `scripts/install.sh`.
