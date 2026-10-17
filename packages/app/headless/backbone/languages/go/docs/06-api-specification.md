# Backbone — API Specification

## 1. Purpose

This document describes the REST contract exposed by Backbone, including endpoints, status codes, and the error envelope.

All API endpoints live under `/api`. OpenAPI/Swagger docs are served at `GET /api/openapi.json` and `GET /api/docs`.

## 2. Endpoints

| Method | Path                    | Description                              |
| ------ | ----------------------- | ---------------------------------------- |
| GET    | `/api/health`           | Healthcheck (unauthenticated)            |
| GET    | `/api/openapi.json`     | OpenAPI document                         |
| GET    | `/api/docs`             | Swagger UI                               |
| POST   | `/api/auth/register`    | Register user                            |
| POST   | `/api/auth/login`       | Login, returns JWT                       |
| GET    | `/api/cache/stats`      | Cache statistics                         |
| …      | `/api/collections/*`    | Collection CRUD                          |
| …      | `/api/records/*`        | Record CRUD                              |
| …      | `/api/buckets/*`        | Bucket/file operations                   |
| …      | `/api/webhooks/*`       | Webhook management                       |
| …      | `/api/secrets/*`        | Secret management                        |
| …      | `/api/cronjobs/*`       | Cron job management                      |
| …      | `/api/logs/*`           | Log CRUD                                 |
| …      | `/api/notifications/*`  | Notification CRUD                        |
| …      | `/api/pubsub/*`         | Pub/sub topics and messages              |
| …      | `/api/ws`               | WebSocket endpoint (at `/ws`, not `/api`)|

## 3. Auth

- `POST /api/auth/register`: bcrypt password hash, creates user.
- `POST /api/auth/login`: validates credentials, returns HS256 JWT (72h).
- Protected routes require `Authorization: Bearer <token>`.

## 4. Error Envelope

All errors use a consistent envelope:

```json
{
  "error": {
    "code":    "ERR_UNAUTHORIZED",
    "message": "missing or invalid token",
    "path":    "/api/records"
  }
}
```

Errors identify what failed, which path was involved, and enough context to fix it. No stack traces or secrets are ever returned.

## 5. Status Codes

| Code | Meaning                                    |
| ---- | ------------------------------------------ |
| 200  | OK                                         |
| 201  | Created                                    |
| 204  | No Content                                 |
| 400  | Bad request                                |
| 401  | Unauthorized                               |
| 403  | Forbidden (RBAC)                           |
| 404  | Not found                                  |
| 422  | Unprocessable entity (validation)          |
| 429  | Too many requests (rate limit)             |
| 500  | Internal server error                      |

## 6. Rate Limiting

Token bucket (200 tokens, refill rate-limited) keyed per IP. Exceeding the limit returns `429` with a `Retry-After` header.

## 7. Content-Type Validation

JSON requests must send `application/json`; otherwise `422` is returned.

## 8. OpenAPI

- `GET /api/openapi.json` returns the OpenAPI document.
- `GET /api/docs` serves the Swagger UI.
- Maintained in `internal/httpapi/openapi.go`.

## 9. Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- Data model: [`05-data-model.md`](05-data-model.md)
- Tech stack: [`08-tech-stack.md`](08-tech-stack.md)
