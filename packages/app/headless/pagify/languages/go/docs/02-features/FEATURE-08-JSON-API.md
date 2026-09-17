# pagify — FEATURE-08: JSON API (serve)

## 1. Summary

`pagify serve` runs a JSON API that renders individual pages over HTTP.

## 2. Behaviour

- `POST /api/v1/build` renders one page in memory (nothing written to disk).
- `GET /api/v1/health`, `GET /api/v1/openapi.json`, `GET /api/v1/docs` describe the API.
- Every content path is resolved through `internal/workspace`, confined to `--root`.

## 3. Acceptance criteria

- `GET /api/v1/health` returns healthy status.
- `GET /api/v1/openapi.json` returns a valid OpenAPI document.
- `POST /api/v1/build` with a content path returns rendered HTML.
- Requests cannot read outside `--root`.
