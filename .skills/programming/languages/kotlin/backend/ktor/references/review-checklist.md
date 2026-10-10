# Review checklist

Focused reference for **ktor-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 9. Testing

- **`testApplication` + `ktor-server-test-host`** — in-process, no network, exercises routing/plugins/pipeline:

```kotlin
@Test
fun `returns 201 for create user`() = testApplication {
    application { moduleWithTestDeps() }
    val res = client.post("/api/v1/users") {
        contentType(ContentType.Application.Json)
        setBody("""{"name":"Ada","email":"ada@x.io"}""")
    }
    assertEquals(HttpStatusCode.Created, res.status)
}
```

- **Test the contract** — success status/body, `400`/`404`, auth boundaries (`401` unauthenticated, `403` forbidden).
- **Isolate** — test DB (H2/SQLite, Exposed schema) reset per suite; mock outbound at service seams.
- **Deterministic and named as behavior** — Kotlin backtick test names read as specs.

---

## 10. General Rules of Thumb

- **Coroutines end-to-end, never blocking** — suspend handlers, async drivers, explicit dispatchers for background.
- **Plugins are the config surface** — install what you use, use what you install.
- **Routes thin, services own logic, repositories persist** — the Ktor edge stays replaceable.
- **DTOs at every boundary, domains never leak into HTTP** — `kotlinx.serialization` keeps contracts explicit.
- **One `StatusPages` mapping + explicit auth strategies** — errors and auth are declaratively enforced.

---

## Quick-Start Checklist

- [ ] Application `module` installs plugins explicitly, then `routing` modules
- [ ] Routes as `Route` extensions, RESTful `/api/v1/...`, correct status codes (201/204/400/404/409)
- [ ] `suspend` handlers/services; no blocking calls in coroutines; explicit scopes/dispatchers
- [ ] `kotlinx.serialization` DTOs at every boundary; no domain/entity leakage
- [ ] `StatusPages` centralizes exception → HTTP mapping; no leaked stack traces
- [ ] `Authentication` plugin strategies at the edge; routes `.authenticate(...)`
- [ ] Security logic in services; validation explicit and fail-fast
- [ ] Constructor DI; stateless, immutable, composition-based services
- [ ] Config via `application.conf` + env overrides; secrets externalized
- [ ] `testApplication` contract tests (201/400/404/401/403), in-memory/test DB isolation
