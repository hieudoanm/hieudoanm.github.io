# dbml (Go) — Tech Stack: Server

`internal/server` is the HTTP transport for dbml: a stateless REST API that accepts DBML and returns generated SQL, Mermaid, and/or SVG as JSON. It uses the standard library plus `github.com/gorilla/mux` v1.8.1 for routing — no middleware framework, no ORM, no auth layer (the API is local single-user per [`../../06-api-specification.md`](../../06-api-specification.md) §3).

## 1. Stack

| Concern        | Choice                           | Notes                                        |
| -------------- | -------------------------------- | -------------------------------------------- |
| Router         | `github.com/gorilla/mux` v1.8.1  | Method-scoped routes; pinned in `go.mod`     |
| Serialization  | `encoding/json`                  | Request decode + response encode             |
| Upload parsing | `net/http` multipart             | `ParseMultipartForm(32 << 20)` — 32 MiB cap  |
| Logging        | `log/slog`                       | Warn level; Debug via `serve --debug`        |
| Spec/docs      | `internal/server/openapi.go`     | OpenAPI 3.0.x document + Swagger UI HTML     |

Decision record: [`../../08-tech-stack.md`](../../08-tech-stack.md) §4.3. Rejected: stdlib `ServeMux` (limited routing), Chi.

## 2. Routes (as registered in `setupRoutes`)

| Method | Path                       | Behaviour                                        |
| ------ | -------------------------- | ------------------------------------------------ |
| GET    | `/api/v1/health`           | `200` `{"status":"ok","version":"dev"}`          |
| POST   | `/api/v1/convert`          | `200` with requested formats (default: sql + mermaid) |
| POST   | `/api/v1/convert/sql`      | `200` with `sql` only                            |
| POST   | `/api/v1/convert/mermaid`  | `200` with `mermaid` only                        |
| GET    | `/api/v1/openapi.json`     | `200` OpenAPI 3.0.x JSON                          |
| GET    | `/api/v1/docs`             | `200` Swagger UI HTML booting from the spec URL  |

Note: the consolidated docs also list a bare `/health`; the router registers only the versioned `/api/v1/health` path. There is no `/api/v1/convert/svg` endpoint — SVG is requested through `/api/v1/convert` with `"formats": ["svg"]`.

## 3. Request handling

`parseRequest` accepts three content types, in this order of check:

1. `multipart/form-data` — field `file` (upload), then field `dbml`, then field `json` (nested JSON); otherwise `400 no dbml content found in multipart request`.
2. `application/json` — decoded into `ConvertRequest{dbml, formats, input_file}`.
3. Any other body — treated as raw DBML text and wrapped as a `dbml` field.

An empty `dbml` string is `400` with `{"error": "dbml field is required"}`. Parse failures are `400` with `{"error": "parse error: <parser message>"}`. Unrecognised format strings are ignored silently; unrequested result fields are omitted (`omitempty`).

## 4. Response envelope

```json
{ "sql": "...", "mermaid": "...", "svg": "...", "error": "" }
```

The implemented error envelope is a flat `{"error": "message"}` string at `400`. The structured `code`/`message`/`details` envelope in [`../../06-api-specification.md`](../../06-api-specification.md) §4 is the target contract; `500`/`503` are specified but not emitted by the current handlers.

## 5. Lifecycle

- `server.NewServer(port)` builds the router; `Start()` is a blocking `http.ListenAndServe` (plain HTTP, no TLS configuration).
- Shutdown is owned by the transport: `cmd/serve.go` traps SIGINT/SIGTERM and exits.
- The server is stateless — every request parses, converts, and responds independently (architecture goal: horizontal scalability, [`../../04-architecture.md`](../../04-architecture.md) §10).
- Contract tests: `internal/server/openapi_test.go` pins the spec version, the docs routes, and the Swagger UI boot URL.

## Cross-references

- Dependency policy: [`../../08-tech-stack.md`](../../08-tech-stack.md)
- REST contract: [`../../06-api-specification.md`](../../06-api-specification.md)
- Architecture (HTTP server responsibilities): [`../../04-architecture.md`](../../04-architecture.md)
- CLI transport: [`../cli/README.md`](../cli/README.md)
