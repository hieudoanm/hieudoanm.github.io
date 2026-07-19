---
name: play-backend
description: Best practices for building HTTP APIs with the Play Framework (Scala). Use when creating, structuring, or reviewing a Play app — covers controllers, services, async boundaries, JSON, dependency injection, and testing.
---

# Play Framework Backend Best Practices

Play Framework is an async-first Scala web framework built on Akka (classic Akka HTTP engine) with type-safe routing, built-in JSON support, and constructor-based dependency injection. Best practice is async-first design: `Future`-returning controllers, never blocking the default execution context, constructor-based DI (no globals), DTOs at API boundaries, and explicit failure modeling.

---

## 1. Core Stack & Constraints

- Scala **2.13+** or **Scala 3**; Play Framework **latest LTS**
- Play JSON (`play-json`) or Circe for serialization
- Slick/Doobie for database access
- `scalatest`/`scalatestplus-play` for tests

```scala
// build.sbt
libraryDependencies ++= Seq(
  ws,
  "com.typesafe.play" %% "play-json" % playVersion,
  "com.typesafe.slick" %% "slick" % slickVersion
)
```

- **Play is a framework, not the domain** — keep domain logic testable and portable outside the HTTP edge.
- **Pin Play to an LTS line** — official support windows matter; don't chase majors casually.

---

## 2. Project Structure & Architecture

- **Separate layers clearly** — `controllers`, `services`, `repositories`, `models/domain`:

```text
app/
  controllers/     # HTTP wiring — thin
  services/        # business logic (Future-returning)
  repositories/    # persistence only
  models/          # domain models & DTOs
  views/           # templates (if HTML; API-only apps skip)
conf/
  application.conf # config, env overrides
```

- **RESTful resource naming** (`/users`, `/orders/:id`); **version explicitly** (`/api/v1/...`).
- **Business logic lives in services; controllers orchestrate** — no business rules in controllers.
- **Repositories focus on persistence only** — Slick queries in, domain results out.
- **Stateless services where possible**; composition over inheritance.

---

## 3. Controllers (Thin HTTP Layer)

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

- **Small, focused methods**; clear naming; prefer immutability (Scala default).
- **Explicit async boundaries** — every `.flatMap`/`.map` tells the reader where composition happens; no hidden blocking.
- **Log at system boundaries** — controllers, DB, outbound integrations, errors.
- **Clarity over clever abstractions** — idiomatic Scala, but readable for the whole team.

---

## 10. Testing

- **`scalatestplus-play` for route/controller tests** — in-process via the Play test app:

```scala
class UserControllerSpec extends PlaySpec with OneAppPerSuite {
  "GET /api/v1/users/:id" should {
    "return 404 for missing user" in {
      val result = route(app, FakeRequest(GET, "/api/v1/users/999")).get
      status(result) mustBe NOT_FOUND
    }
  }
}
```

- **Unit-test services** with constructor-injected fakes — no app boot needed.
- **Test the contract** — success, `400` validation, `404` missing, `401`/`403` auth.
- **Deterministic** — in-memory/test DB per suite; no live network.

---

## 11. General Rules of Thumb

- **`Future` end-to-end, never blocked** — compose; reserve `Await` for tests/main entry only.
- **Controllers orchestrate, services decide, repositories persist** — Play stays at the edge.
- **Constructor injection, no global state** — explicit dependencies, testable layers.
- **DTOs at the boundary, JSON via one library** — stable contracts, domain stays portable.
- **One error mapper, explicit validation, real HTTP codes** — the fail-fast, no-leak contract.

---

## Quick-Start Checklist

- [ ] Scala 2.13+/3 + Play LTS; controllers/services/repositories/models layering
- [ ] `@Inject()` constructor injection; no `object` singletons for state
- [ ] `Action.async` + `Future` services; no blocking on the default EC; explicit dispatchers
- [ ] DTOs (`Json.format`) at every API boundary; no domain/entity leakage
- [ ] Explicit input validation (`request.body.asJson.validate`) with fail-fast `BadRequest`
- [ ] Centralized error mapping; no leaked stack traces; real HTTP codes
- [ ] `application.conf` + env overrides; secrets externalized
- [ ] Auth boundaries explicit (Filters cross-cutting; policy in services)
- [ ] No frame types leak into domain/services — portable domain logic
- [ ] `scalatestplus-play` contract tests (200/400/404/401/403)