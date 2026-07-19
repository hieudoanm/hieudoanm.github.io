---
name: http4s-best-practices
description: Best practices for building Scala HTTP services with http4s — the functional, cats-effect-based framework conventions. Use when writing, structuring, or reviewing http4s — covers server/client, routes, Kleisli/DSL, mtl-structured effects, error handling, and testing.
---

# http4s Best Practices

http4s is a **purely functional HTTP library on cats-effect** — routes are `HttpRoutes`/`Kleisli[F, Request[F], Response[F]]`, and every handler returns an `F[_]`. Practical http4s leans on **the `routes` DSL (pattern-matching methods), services composed with `orNotFound` + middlewares, `F` threaded everywhere with the effect type in the signature**, and **`EntityCodec`/`EntityDecoder` for typed JSON**. The type system IS the HTTP contract; errors are values in the `F`.

---

## 1. Server & App Wiring

- **`EmberServerBuilder` at the edge; routes inside:**

```scala
object Main extends IOApp {
  def run(args: List[String]): IO[ExitCode] =
    EmberServerBuilder
      .default[IO]
      .withHost(ipv4"0.0.0.0")
      .withPort(8080)
      .withHttpApp(routes.orNotFound)
      .build
      .use(_ => IO.never)
      .as(ExitCode.Success)
}
```

- **`orNotFound` wraps the routes the standard 404; `HttpRoutes` is the tail.**
- **Use `http4s`'s `EntityEncoder`/`Decoder` for JSON; `circe` via `org.http4s.circe`.**

---

## 2. Routes & DSL

- **The route DSL pattern-matches method + path; handlers are pure functions:**

```scala
import org.http4s.dsl.io._

val userRoutes = HttpRoutes.of[IO] {
  case GET -> Root / "users" =>
    Ok(usersJson)
  case GET -> Root / "users" / UUIDVar(id) =>
    userService.find(id).flatMap {
      case Some(u) => Ok(jsonOf(u))
      case None    => NotFound()
    }
  case req @ POST -> Root / "users" =>
    req.as[CreateUser].flatMap(u => userService.create(u).flatMap(x => Created(...)))
}
```

- **Extractors (`UUIDVar`, `IntVar`, `LongVar`) parse path segments typed at the pattern.**
- **Handlers belong in a service; the route draws the HTTP boundary, nothing more.**
- **`req.as[T]` requires `EntityDecoder[T]`(Json); encode via `jsonOf`/`EntityEncoder`.**

---

## 3. Effects & Context

- **`F[_]` threaded — IO/ZIO/CatEffect type in every signature; handlers are `f: Request[F] => F[Response[F]]`:**

```scala
def find(id: UUID): F[Option[User]] = repo.find(id)
```

- **No side effects outside `F`** — logging, DB, HTTP all returned/tracked, never planted tell in the handler body.
- **`Contextual`/`Ask[F, Ctx]` (via `http4s` `Request` context) for request-scoped values — the request IS the context**, don't smuggle globals.

---

## 4. Middleware & Errors

- **Compose with middlewares** (`RequestLogger`, `ResponseLogger`, auth, CORS):

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

## 6. Testing

- **`org.http4s.client.test`/`withHttpApp` on the real app; or `Request`-to-`Response` directly:**

```scala
def testRoutes: HttpApp[IO] = routes.orNotFound

val resp = testRoutes(Request[IO](method = Method.GET, uri = uri"/users/1")).unsafeRunSync()
assert(resp.status == Status.Ok)
```

- **Mock the `F` boundary** — repo fakes; the route test verifies HTTP shape and status mapping.
- **Contract cases**: valid, not-found, bad JSON body, invalid path param, auth rejection.

---

## General Rules of Thumb

- **Routes are pure `F[Response]` functions; DSL extracts path/method typed.**
- **Effects in `F` everywhere; no side effects planted in handlers.**
- **`orNotFound` + middlewares compose; errors converted to status once.**
- **Typed JSON via `EntityEncoder`/`EntityDecoder`/`circe`.**
- **`httpApp`-based tests; contract + error-mapping covered.**

---

## Quick-Start Checklist

- [ ] `EmberServerBuilder` + `orNotFound`; routes in a `HttpRoutes` value
- [ ] DSL matches (`GET -> Root / ... / UUIDVar(id)`); handlers thin
- [ ] `req.as[T]` typed decode; `jsonOf` encode; errors to status in one mapper
- [ ] `F[_]` threaded; no side effects outside `F`
- [ ] Middleware composition (auth, logging) on the app
- [ ] Pooled `Client[F]` with timeouts; typed decoders
- [ ] `Request`-to-`Response` tests; contract cases incl. malformed bodies