# Backbone — FEATURE-17: Healthcheck

## 1. Summary

Unauthenticated healthcheck endpoint for orchestration.

## 2. Behaviour

- `GET /api/health` returns `{"status":"ok"}` unconditionally.
- Used by Docker healthchecks and `docker-compose.yml`.

## 3. Acceptance criteria

- `GET /api/health` returns HTTP 200 with `{"status":"ok"}`.
- No authentication required.
