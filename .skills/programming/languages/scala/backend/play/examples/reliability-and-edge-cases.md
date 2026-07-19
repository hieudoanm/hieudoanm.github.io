# Play Framework Backend Best Practices: 6. Error Handling

## Source guidance

This example applies the **6. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Centralized error handling** — map domain outcomes to HTTP explicitly in controllers or via a shared mapper:
- **Do not leak internal errors or stack traces** — API-safe messages, cause logged at boundaries.
- **Fail fast on invalid input** — validation at the controller edge returns `BadRequest`/`400` before service work.
- **Proper HTTP status codes** (`201`, `204`, `400`, `404`, `409`).

## Example

```scala
def toResult[A](result: Future[Either[DomainError, A]])(ok: A => Result): Future[Result] =
  result.map {
    case Right(value) => ok(value)
    case Left(NotFoundError(msg)) => NotFound(Json.obj("error" -> msg))
    case Left(ValidationError(msg)) => BadRequest(Json.obj("error" -> msg))
    case Left(other) => InternalServerError(Json.obj("error" -> "internal error"))
  }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for play-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
