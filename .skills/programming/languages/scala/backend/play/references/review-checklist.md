# Review checklist

Focused reference for **play-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
