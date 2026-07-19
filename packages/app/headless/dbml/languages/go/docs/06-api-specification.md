# dbml (Go) — API Specification

## 1. Purpose

This document defines the REST API contract for dbml's HTTP server, including endpoints, request/response models, status codes, and error handling.

The API must:

- Use RESTful conventions where appropriate.
- Return consistent error responses.
- Accept DBML as a string or file upload.
- Return SQL, Mermaid, and/or SVG based on requested formats.
- Never expose filesystem paths in responses.

## 2. Base URL

- Local: `http://127.0.0.1:8080`
- Versioned API: `http://127.0.0.1:8080/api/v1`
- Health: `http://127.0.0.1:8080/health`

## 3. Authentication

MVP is local single-user. No JWT. Bind to `127.0.0.1`. A future `Authorization` header is reserved and must not be required until a feature document says so.

## 4. Error Response Format

All error responses follow this structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
| ---- | ----------- | ----------- |
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `INVALID_DBML` | 400 | DBML syntax is invalid |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service unavailable |

## 5. Endpoints

| Method | Path | Success | Purpose |
| ------ | ---- | ------- | ------- |
| GET | `/health` | 200 | Liveness |
| POST | `/api/v1/convert` | 200 | Convert DBML to multiple formats |
| POST | `/api/v1/convert/sql` | 200 | Convert DBML to SQL only |
| POST | `/api/v1/convert/mermaid` | 200 | Convert DBML to Mermaid only |
| GET | `/api/v1/openapi.json` | 200 | OpenAPI 3 document |
| GET | `/api/v1/docs` | 200 | Swagger UI |

## 6. Convert request body

```json
{
  "dbml": "Table users { id integer [pk] }",
  "formats": ["sql", "mermaid", "svg"]
}
```

Headers: optional `X-Request-Id`.

Multipart form-data is also supported:

- `file`: DBML file upload
- `dbml`: DBML content as form field
- `formats`: comma-separated format list

## 7. Convert response body (completed)

```json
{
  "sql": "CREATE TABLE users (...);",
  "mermaid": "erDiagram\\n    users {\\n        PK INTEGER id\\n    }",
  "svg": "<svg>...</svg>"
}
```

JSON with `sql`, `mermaid`, and `svg` fields (empty strings if not requested).

## Cross-references

- Requirements: [`01-requirements.md`](01-requirements.md)
- Architecture: [`04-architecture.md`](04-architecture.md)
