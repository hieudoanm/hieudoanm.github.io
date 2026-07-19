# Backbone — FEATURE-18: Docker Packaging

## 1. Summary

Multi-stage `Dockerfile` into a `scratch` runtime image.

## 2. Behaviour

- Stage 1: `golang:1.27-alpine` builder compiles the binary (`CGO_ENABLED=0`).
- Stage 2: `scratch` runtime ships `/backbone`, `/public` dashboard, `PORT=8080`, `BACKBONE_DATA=/data`, `VOLUME /data`.
- Healthcheck against `GET /api/health`.
- Entrypoint is the server binary directly — no shell, no OS layer.

## 3. Acceptance criteria

- `docker build -t backbone-server .` succeeds.
- Container serves `GET /api/health`.
- `docker-compose.yml` wires Go + Rust services.
