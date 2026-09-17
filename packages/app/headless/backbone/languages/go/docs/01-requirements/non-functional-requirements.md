# Backbone — Non-Functional Requirements

## NFR-001 — Static binary

Self-contained binary with `CGO_ENABLED=0`; no glibc/musl dependency.

## NFR-002 — Pure-Go SQLite

SQLite via `modernc.org/sqlite`; no CGO required.

## NFR-003 — Unauthenticated healthcheck

`GET /api/health` returns `{"status":"ok"}` without auth, so Docker healthchecks and orchestration can probe readiness.

## NFR-004 — Scratch Docker image

Multi-stage `Dockerfile`; `scratch` runtime ships the binary, dashboard, and a `VOLUME /data`. Entrypoint is the server binary directly — no shell, no OS layer.

## NFR-005 — Cross-platform builds

Cross-compile 4 platforms (linux-amd64, linux-arm64, darwin-amd64, darwin-arm64) into `bin/`.

## NFR-006 — Explicit error handling

`error` as the last return value; handle errors explicitly, never `_ = err`. Return early; avoid deep nesting.

## NFR-007 — No secrets in output

Never log raw secret values or return stack traces/credentials in errors.

## NFR-008 — Table-driven tests

Colocated `*_test.go`; table-driven tests (`[]struct{...}` + `t.Run`) with behaviour-spec test names.

## NFR-009 — E2E tests

`tests/` builds the real binary (`go build ./..`) and runs end-to-end CRUD flows over HTTP.

## NFR-010 — No-build-step dashboard

Admin dashboard uses HTMX + Tailwind from CDN; served at `/` with no build step required.
