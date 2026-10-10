# Workflow notes

Focused reference for **ktor-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
