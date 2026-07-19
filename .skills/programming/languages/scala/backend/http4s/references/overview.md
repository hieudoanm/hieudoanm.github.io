# Overview

Focused reference for **http4s-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
