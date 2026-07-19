# dbml (Go) — FEATURE-06: HTTP Server

`dbml serve` exposes the conversion pipeline as a stateless REST API. Priority: **P0** (core platform, [`02-features.md`](../02-features.md) §2). dbml is a software demonstration, not a full database modeling tool.

## 1. User-visible behaviour

| Method | Path | Purpose |
| ------ | ---- | ------- |
| GET | `/api/v1/health` | Liveness: `{"status":"ok","version":"dev"}` |
| POST | `/api/v1/convert` | Convert to the requested formats (default `sql`, `mermaid`) |
| POST | `/api/v1/convert/sql` | Convert to SQL only |
| POST | `/api/v1/convert/mermaid` | Convert to Mermaid only |
| GET | `/api/v1/openapi.json` | OpenAPI 3.0.3 document |
| GET | `/api/v1/docs` | Swagger UI page for that document |

- Requests accept a JSON body (`{"dbml": "...", "formats": ["sql","mermaid","svg"]}`), multipart form-data (`file` upload or `dbml` form field, plus an optional `json` field), or a raw body treated as DBML content.
- Success returns HTTP 200 with JSON fields `sql`, `mermaid`, and `svg`; fields not requested or not generated are omitted from the body.
- Validation failures return HTTP 400 with `{"error": "<message>"}` — for example `dbml field is required` or `parse error: <details>`.
- `dbml serve` prints a startup box (local URL, network URL when reachable, Swagger UI link) before serving; SIGINT/SIGTERM prints `Shutting down server...` and exits 0.

## 2. Inputs

| Input | Notes |
| ----- | ----- |
| `dbml` (JSON) or `file`/`dbml`/`json` (multipart) | required; empty content → 400 |
| `formats` (JSON array) | any of `sql`, `mermaid`, `svg`; omitted → `["sql","mermaid"]`; unknown values ignored |
| Raw body | any other content type is read as DBML source |
| Multipart size | parsed with a 32 MiB in-memory form limit |
| Port | `dbml serve --port`/`-p` (default `8080`) |

`06-api-specification.md` §6 also documents a comma-separated `formats` form field for multipart requests; the current multipart parser extracts only the DBML content, so format selection applies to JSON requests.

## 3. Outputs

- HTTP 200 JSON for successful conversions, health, OpenAPI, and docs; HTTP 400 JSON for rejected requests; the router answers unmatched paths with its default 404 and wrong methods with 405 (not the JSON error body).
- The OpenAPI document is served from a static spec embedded in the binary; the docs page is HTML that loads Swagger UI assets from the jsDelivr CDN and points it at `/api/v1/openapi.json`.
- Structured log line for startup (visible with `--debug`, since the default slog level is warning).

## 4. States

Each request is independent and stateless: `receive → parse request → validate → parse DBML → generate → respond`, with `error` (HTTP 400) reachable from validation or parsing ([`04-architecture.md`](../04-architecture.md) §10). The process state is liveness only, reported by `/api/v1/health`; there is no session, job queue, or stored conversion state ([`05-data-model.md`](../05-data-model.md) §3, no database storage).

## 5. Edge cases

- **Missing `dbml` field or empty raw body** — HTTP 400 `{"error":"dbml field is required"}`.
- **Malformed multipart** — HTTP 400 `{"error":"no dbml content found in multipart request"}` (or the multipart parse error).
- **Malformed JSON** — HTTP 400 with the decode message.
- **Unparseable DBML** — HTTP 400 `{"error":"parse error: ..."}`; note the parser is tolerant, so structurally odd but readable input usually converts rather than failing (FEATURE-01, US-010).
- **Health route** — the router registers only `/api/v1/health`; `06-api-specification.md` §5 and [`12-operations.md`](../12-operations.md) also mention a bare `/health`, which this router does not serve.
- **Bind address** — the server listens on `:<port>` (all interfaces of the host); the loopback assumption in [`06-api-specification.md`](../06-api-specification.md) §3 is a usage recommendation, not a code-enforced bind.
- **Error envelope** — errors are a flat `{"error":"message"}` string; the `code`/`message`/`details` envelope in `06-api-specification.md` §4 and its `500`/`503` codes have no implementation path in the current server.
- **Health version** — reported as `dev` (the value compiled into the current build).
- **Concurrency** — each request runs its own parse and render; no shared mutable state.

## 6. Acceptance conditions

- `GET /api/v1/health` returns 200 with `status` and `version` (MVP definition of done, [`02-features.md`](../02-features.md) §4).
- `POST /api/v1/convert` with `{"dbml":"Table users { id integer [pk] }","formats":["sql","mermaid"]}` returns 200 containing both `sql` and `mermaid`; adding `svg` returns a well-formed SVG document in `svg`.
- The same conversion as a `file` upload (`-F "file=@schema.dbml"`) returns the same JSON.
- Requests without DBML content return 400 with a JSON `error` field and never expose filesystem paths ([`06-api-specification.md`](../06-api-specification.md) §1).
- `/api/v1/openapi.json` matches the served document and `/api/v1/docs` renders the Swagger UI against it (contract tests, [`09-testing-strategy.md`](../09-testing-strategy.md)).

## Cross-references

- Requirements: [`../01-requirements.md`](../01-requirements.md) · [`FR-007`](../01-requirements/functional-requirements.md) · [`FR-008`](../01-requirements/functional-requirements.md) · [`FR-009`](../01-requirements/functional-requirements.md)
- Feature index: [`02-features.md`](../02-features.md)
- API specification: [`06-api-specification.md`](../06-api-specification.md)
- Sibling features: [`FEATURE-05-CLI-Commands.md`](./FEATURE-05-CLI-Commands.md) · [`FEATURE-08-Error-Handling.md`](./FEATURE-08-Error-Handling.md)
- User stories: [`03-user-stories.md`](../03-user-stories.md) — US-006, US-009
- Architecture: [`04-architecture.md`](../04-architecture.md)
