# Implementation notes

Focused reference for **play-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Error Handling

- **Centralized error handling** — map domain outcomes to HTTP explicitly in controllers or via a shared mapper:

```scala
def toResult[A](result: Future[Either[DomainError, A]])(ok: A => Result): Future[Result] =
  result.map {
    case Right(value) => ok(value)
    case Left(NotFoundError(msg)) => NotFound(Json.obj("error" -> msg))
    case Left(ValidationError(msg)) => BadRequest(Json.obj("error" -> msg))
    case Left(other) => InternalServerError(Json.obj("error" -> "internal error"))
  }
```

- **Do not leak internal errors or stack traces** — API-safe messages, cause logged at boundaries.
- **Fail fast on invalid input** — validation at the controller edge returns `BadRequest`/`400` before service work.
- **Proper HTTP status codes** (`201`, `204`, `400`, `404`, `409`).

---

## 7. Configuration & Portability

- **Configuration via `application.conf`** with environment-based overrides (`reference.conf` + env substitution):

```hocon
db.default.url = ${?DB_URL}
auth.jwt.secret = ${?JWT_SECRET}
```

- **Externalize secrets** — never hardcode credentials; env vars / secret store.
- **Portable across** — web server, background workers, CLI tasks (same domain/services, different entrypoints).
- **Avoid leaking framework types across layers** — services don't know about Play controllers/requests; domain models are plain Scala.

---

## 8. Security

- **Validate input explicitly; never trust client input.**
- **Security-sensitive logic lives in services** — controllers enforce the boundary, services enforce policy.
- **Be explicit about authentication and authorization boundaries** — Play filters (`Filters` via `HttpFilters`) for request-level cross-cutting, explicit policy checks in services.
- **No global mutable state** for config or security context — inject via DI, thread through calls.

---

## 9. Reliability & Maintainability
