# http4s Best Practices: 2. Routes & DSL

## Source guidance

This example applies the **2. Routes & DSL** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **The route DSL pattern-matches method + path; handlers are pure functions:**
- **Extractors (`UUIDVar`, `IntVar`, `LongVar`) parse path segments typed at the pattern.**
- **Handlers belong in a service; the route draws the HTTP boundary, nothing more.**
- **`req.as[T]` requires `EntityDecoder[T]`(Json); encode via `jsonOf`/`EntityEncoder`.**

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for http4s-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
