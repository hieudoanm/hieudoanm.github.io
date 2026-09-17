# Workflow notes

Focused reference for **play-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Controllers return actions** — `Action.async` when the body is async:

```scala
class UserController @Inject() (userService: UserService, cc: ControllerComponents)
    extends AbstractController(cc) {

  def get(id: String): Action[AnyContent] = Action.async { implicit request =>
    userService.get(id.toLong).map {
      case Some(u) => Ok(Json.toJson(UserOut.from(u)))
      case None    => NotFound(Json.obj("error" -> "missing"))
    }
  }
}
```

- **`@Inject()` constructor injection** — Play's compile-time or runtime DI; no `object` singletons for state.
- **Controllers stay thin** — parse/validate, call the service, serialize the response.
- **DTOs for API boundaries** — no domain/entity objects leaking into HTTP responses.

---

## 4. Async & Non-Blocking Discipline

- **Async-first design** — `Future`-returning services; non-blocking APIs; controllers `Action.async`.
- **Never block the default execution context** — no `.toBlocking()`, no `Await.result`, no thread-sleep inside actions:

```scala
// BAD: Await.result(myFuture, timeout)  — blocks the default EC
// GOOD: myFuture.map { ... }            — compose instead
```

- **Explicit async boundaries** — background work on a dedicated dispatcher (`ExecutionContexts`), never silently swallowing the default pool.
- **Avoid blocking I/O** in request handling — file/DB/HTTP calls async via Slick/Doobie (`IO`)/`WSClient`.
- **Model failures explicitly** — `Either`, `Option`-tagged results, or sealed error types; not bare exceptions at every seam.

---

## 5. JSON & DTOs

- **Play JSON via `Json.toJson`/`Json.format`** — defined on DTOs at the API boundary:

```scala
case class UserOut(id: Long, name: String, email: String)
object UserOut {
  implicit val format: OFormat[UserOut] = Json.format[UserOut]
  def from(u: User): UserOut = UserOut(u.id, u.name, u.email)
}
```

- **Explicit serialization at the edge** — services return domain models; controllers map to DTO `format`s.
- **Validate input explicitly** — parse with `request.body.asJson.flatMap(_.validate[UserCreate])`, fail fast with `BadRequest` on failure.
- Prefer `play-json` or Circe consistently across the codebase — don't mix both.

---
