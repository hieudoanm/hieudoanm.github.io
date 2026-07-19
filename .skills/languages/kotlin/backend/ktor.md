---
name: ktor-backend
description: Best practices for building HTTP APIs with Ktor (Kotlin). Use when creating, structuring, or reviewing a Ktor app — covers routing, plugins, coroutines, serialization, error handling, authentication, and testing.
---

# Ktor Backend Best Practices

Ktor is Kotlin-first, coroutine-native, asynchronous HTTP framework built around routing, a plugin (interceptor) pipeline, and serialization. Best practice here is coroutine-first design: `suspend` handlers and services, structured concurrency, non-blocking I/O everywhere, explicit plugin wiring, and strict layer separation so Ktor stays an edge layer rather than leaking into domain logic.

---

## 1. Core Stack

- Kotlin **1.9+**; Ktor **2.x** (or engine pin in project — CIO/Netty)
- `kotlinx.serialization` (or Jackson) for JSON
- Exposed/jOOQ/JDBC for persistence; `ktor-server-test-host` for tests
- `application.conf`/`application.yaml` (HOCON) for config

```kotlin
// build plugin
implementation("io.ktor:ktor-server-core-jvm")
implementation("io.ktor:ktor-server-netty-jvm")
implementation("io.ktor:ktor-serialization-kotlinx-json-jvm")
```

- **Choose the engine deliberately** — Netty (async, mature) vs CIO (Kotlin-native); it's a deployment-scale decision.
- **Externalize secrets** — never hardcode credentials; config comes from `application.conf` + environment overrides.

---

## 2. Application Setup & Plugins

- **Install plugins explicitly** — Ktor features are reified via `install`, which is your whole configuration surface:

```kotlin
fun Application.module() {
    install(ContentNegotiation) { json() }
    install(StatusPages) { exception<NotFoundError> { call, _ -> call.respond(NotFound("missing")) } }
    install(Authentication) { bearer("auth-bearer") { validate { ... } } }
    routing { userRoutes(); orderRoutes() }
}
```

- **Keep `Application.module` minimal** — install plugins, then delegate routing to modules.
- **No automatic magic** — if a feature isn't installed, it isn't there; that explicitness is the point.

---

## 3. Routing

- **RESTful resource naming** (`/users`, `/orders/{id}`); **version explicitly** (`/api/v1/...`).
- **Organize routes as `Route` extensions** — one file per resource, self-contained:

```kotlin
fun Route.userRoutes() {
    route("/api/v1/users") {
        get("/{id}") { call.respond(userService.get(call.parameters["id"]!!)) }
        post("/") { val body = call.receive<UserCreate>(); call.respond(HttpStatusCode.Created, userService.create(body)) }
    }
}
```

- **Proper HTTP status codes** (`201`, `204`, `400`, `404`, `409`) via `call.respond(status, ...)`.
- **Routes are thin** — parse/validate/receive, delegate to a service, respond; no business logic inline.
- **DTOs at every API boundary** — explicit request/response models, never raw domain objects.

---

## 4. Coroutines & Async Discipline

- **Coroutine-first design** — `suspend` functions everywhere; Ktor handlers are suspend.
- **Structured concurrency** — use `coroutineScope`/explicit scopes; never leak `GlobalScope` into request handling.
- **Never block inside coroutines** — no `runBlocking`, no `.toBlocking()`, no thread-sleeping; drivers must be async (`Exposed` async, `R2DBC`, etc.).
- **Explicit scopes and dispatchers** — background work gets a bounded `Dispatchers.IO`/custom dispatcher, not an implicit thread grab.
- **Model failures explicitly** — sealed classes/`Result` for expected outcomes; exceptions for genuine failures.

---

## 5. Serialization & DTOs

- **`kotlinx.serialization` with `@Serializable`** for JSON — type-safe, multiplatform-friendly, Ktor-native:

```kotlin
@Serializable
data class UserCreate(val name: String, val email: String)

// receive with strict validation mapping
val body = call.receive<UserCreate>()
```

- **Explicit request/response models; no domain/entity leakage** — contracts stay stable even when internals change.
- **Configure serialization explicitly** (`json { ignoreUnknownKeys = true }` as needed) rather than accepting defaults blindly.

---

## 6. Error Handling

- **`StatusPages` as the centralized error mapping** — one install block for the whole app:

```kotlin
install(StatusPages) {
    exception<ValidationException> { call, _ -> call.respond(HttpStatusCode.BadRequest, ErrorResponse("invalid request")) }
    exception<NotFoundError> { call, _ -> call.respond(HttpStatusCode.NotFound, ErrorResponse("missing")) }
}
```

- **Map domain errors to meaningful HTTP responses** — never leak stack traces to the client.
- **Fail fast on invalid requests** — validate input explicitly (explicit checks, not silent coercion).
- **Services throw domain exceptions; the pipeline maps them** — layer separation keeps HTTP in the edge.

---

## 7. Authentication & Authorization

- **`Authentication` plugin with explicit strategies** — `bearer`, `jwt`, `basic`, etc. installed at the edge:

```kotlin
install(Authentication) {
    jwt("auth-jwt") {
        verifier(jwtVerifier)
        validate { credential -> UserPrincipal(credential.payload.getClaim("sub").asInt()) }
    }
}
```

- **Protect routes declaratively** — `.authenticate("auth-jwt")` on route groups; authorization checks in the service layer.
- **Security-sensitive logic lives in services**, not routes — routes enforce the boundary, services enforce policy.
- **Never trust client input**; validate everything before use.

---

## 8. Reliability & Maintainability

- **Small, focused `suspend` functions**; clear naming; prefer immutability (Kotlin defaults).
- **Stateless services where possible**; repositories handle persistence only; services own business logic.
- **Composition over inheritance** — dependency injection via constructor params (Kotlin-native, no reflection-heavy framework needed).
- **Log at system boundaries** — HTTP, DB, and external calls; structured, with request context.
- **Clarity over clever DSL abuse** — idiomatic Ktor `routing {}` where it reads, explicit Kotlin elsewhere.

---

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
