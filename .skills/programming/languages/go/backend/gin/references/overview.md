# Overview

Focused reference for **gin-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Gin Backend Best Practices

Gin is a fast, middleware-based HTTP framework for Go built on `net/http`. It keeps Go's explicitness (interfaces, `context.Context`, explicit errors) while adding routing, middleware, and JSON convenience. Best practice is standard-library-first: thin handlers, services own business logic, repositories own persistence, and business logic never appears in middleware.

---

## 1. Core Stack

- Go **1.21+**; Gin (latest stable)
- Standard library first; add dependencies deliberately (DB driver, JWT lib)
- SQL databases (PostgreSQL/MySQL) via `database/sql` or pgx; `testify`/`httptest` for tests

```bash
go get github.com/gin-gonic/gin
```

- **Pin Go via `go.mod`**; use the repo's Go toolchain (`go.mod` toolchain directive) for reproducible builds.

---

## 2. Project Structure & Routing

- **Separate layers clearly** — `handler` (HTTP), `service` (business), `repository` (data), `domain` (models):

```text
cmd/api/main.go        # wiring: router + middleware + deps
internal/
  handler/users.go     # gin.HandlerFunc wiring HTTP -> service
  service/users.go     # business logic
  repository/users.go  # persistence
  domain/user.go       # core models
```

- **RESTful resource naming** (`/users`, `/orders/:id`); **version explicitly** (`/api/v1/...`).
- **Compose the router in `main`/an `app.NewRouter()` factory** — register routes with their handler + middleware visibly.
- **`Context.Context` flows through all layers** — create/derive one per request in middleware/handler, pass it to services and repositories.

---

## 3. Handlers & Middleware
