# Backbone — FEATURE-02: REST API

## 1. Summary

Full REST API under `/api` using standard `net/http` with Go 1.22 route patterns.

## 2. Behaviour

- Method + path routing via `httpapi/routes.go`.
- Middleware chain: rate limit → auth (JWT) → protected mux → per-route RBAC + content-type validation.
- JSON requests must send `application/json`.

## 3. Acceptance criteria

- All API endpoints are under `/api`.
- `GET /api/health` returns `{"status":"ok"}` unauthenticated.
- Rate limit: token bucket (200 tokens) keyed per IP.
