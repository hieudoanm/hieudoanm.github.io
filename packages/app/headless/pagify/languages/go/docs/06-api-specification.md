# pagify — API Specification

## 1. Purpose

This document describes the REST contract exposed by `pagify serve`, including endpoints, status codes, and the error envelope.

pagify's JSON API renders individual pages over HTTP. All file access is confined to `--root`.

## 2. Endpoints

| Method | Path                 | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| GET    | `/api/v1/health`     | Service health                           |
| GET    | `/api/v1/openapi.json`| OpenAPI document                         |
| GET    | `/api/v1/docs`       | API description                          |
| POST   | `/api/v1/build`      | Render one page in memory                |

## 3. POST /api/v1/build

Renders one page in memory (nothing is written to disk).

### Request

| Field  | Type   | Required | Description             |
| ------ | ------ | -------- | ----------------------- |
| `path` | string | yes      | Content path to render  |

### Response (200)

| Field    | Type   | Description          |
| -------- | ------ | -------------------- |
| `html`   | string | Rendered page HTML   |
| `title`  | string | Page title           |
| `url`    | string | Resolved page URL    |

### Errors

| Status | Condition                    | Envelope                      |
| ------ | -----------------------------|-------------------------------|
| 400    | Missing or invalid `path`    | `{"error": {...}}`            |
| 404    | Page not found               | `{"error": {...}}`            |
| 403    | Path escapes `--root`        | `{"error": {...}}`            |
| 500    | Render failure               | `{"error": {...}}`            |

## 4. Error Envelope

All errors use a consistent envelope:

```json
{
  "error": {
    "code":    "ERR_PAGE_NOT_FOUND",
    "message": "page not found: docs/missing.md",
    "path":    "docs/missing.md"
  }
}
```

Errors identify what failed, which file/path was involved, and enough context to fix it. No stack traces or secrets are ever returned.

## 5. Status Codes

| Code | Meaning                                    |
| ---- | ------------------------------------------ |
| 200  | OK                                         |
| 400  | Bad request                                |
| 403  | Forbidden (path escapes root)              |
| 404  | Not found                                  |
| 500  | Internal server error                      |

## 6. OpenAPI

A machine-readable OpenAPI document is maintained at:

- [`backend/openapi.yaml`](06-api-specification/backend/openapi.yaml)
- [`backend/openapi.json`](06-api-specification/backend/openapi.json)

And served at `GET /api/v1/openapi.json`.

## 7. Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- Data model: [`05-data-model.md`](05-data-model.md)
- Tech stack: [`08-tech-stack.md`](08-tech-stack.md)
