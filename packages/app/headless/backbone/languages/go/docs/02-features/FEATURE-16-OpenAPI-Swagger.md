# Backbone — FEATURE-16: OpenAPI / Swagger

## 1. Summary

Machine-readable API contract and interactive docs.

## 2. Behaviour

- `GET /api/openapi.json` returns the OpenAPI document.
- `GET /api/docs` serves the Swagger UI.
- `internal/httpapi/openapi.go` + `swagger.go`.

## 3. Acceptance criteria

- `GET /api/openapi.json` returns valid OpenAPI.
- `GET /api/docs` renders the Swagger UI.
