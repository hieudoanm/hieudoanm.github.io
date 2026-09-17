# Implementation notes

Focused reference for **ktor-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
