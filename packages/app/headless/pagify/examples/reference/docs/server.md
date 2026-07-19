---
title: server Package
description: Local development server and JSON API
---

# server Package

Serves the built site and a JSON API for rendering individual pages over HTTP.

## Commands

### `pagify preview`

Builds and serves the site on localhost, rebuilding on every request.

```bash
pagify preview ./docs --port 8080
```

### `pagify serve`

Runs the JSON API server. It renders individual pages over HTTP and exposes
`/api/v1/health`, `/api/v1/build`, `/api/v1/openapi.json` and `/api/v1/docs`.
All file access is confined to `--root`.

```bash
pagify serve
```

## Endpoints

| Method | Path                 | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/v1/health`     | Service health check       |
| POST   | `/api/v1/build`      | Render one page in memory  |
| GET    | `/api/v1/openapi.json` | OpenAPI specification    |
| GET    | `/api/v1/docs`       | Swagger UI                 |

## Security

Every content path a request names is resolved through `internal/workspace`,
so the API cannot read outside its `--root`.

## Related

- [build Package](build.md) — how pages are rendered
- [site Package](site.md) — content discovery and navigation
- [theme Package](theme.md) — theme and template system