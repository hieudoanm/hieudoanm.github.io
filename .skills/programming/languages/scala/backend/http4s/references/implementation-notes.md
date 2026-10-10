# Implementation notes

Focused reference for **http4s-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```scala
val authApp = AuthMiddleware(userAuth)(routes).orNotFound
```

- **Error channel**: `F[Either[AppError, Response[F]]]` or raise-to-`Response` via `HttpApp`; a dedicated error handler converts domain errors to status codes once:

```scala
def fail(e: AppError): IO[Response[IO]] = e match {
  case NotFound   => NotFound()
  case Invalid    => BadRequest()
  case _          => InternalServerError()
}
```

- **Log at the boundary; never return an exception stack trace to the client.**

---

## 5. Client

- **`Client[F]` with `expect`/`run` for outbound calls:**

```scala
val client = EmberClientBuilder.default[IO].build
client.flatMap(c => c.expect[Json]("http://api/users/1"))
```

- **One client per app (pooled); use typed decoders on the client too.**
- **Timeouts/retries via a middleware or `withTimeout`** — the client is not a repl loop.

---
