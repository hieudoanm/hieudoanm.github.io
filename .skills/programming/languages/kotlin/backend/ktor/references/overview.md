# Overview

Focused reference for **ktor-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
