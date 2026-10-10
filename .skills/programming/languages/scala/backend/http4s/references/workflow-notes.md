# Workflow notes

Focused reference for **http4s-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
