# Ktor Backend Best Practices: 2. Application Setup & Plugins

## Source guidance

This example applies the **2. Application Setup & Plugins** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Install plugins explicitly** — Ktor features are reified via `install`, which is your whole configuration surface:
- **Keep `Application.module` minimal** — install plugins, then delegate routing to modules.
- **No automatic magic** — if a feature isn't installed, it isn't there; that explicitness is the point.

## Example

```kotlin
fun Application.module() {
    install(ContentNegotiation) { json() }
    install(StatusPages) { exception<NotFoundError> { call, _ -> call.respond(NotFound("missing")) } }
    install(Authentication) { bearer("auth-bearer") { validate { ... } } }
    routing { userRoutes(); orderRoutes() }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for ktor-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
