# Ktor Backend Best Practices: 6. Error Handling

## Source guidance

This example applies the **6. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`StatusPages` as the centralized error mapping** — one install block for the whole app:
- **Map domain errors to meaningful HTTP responses** — never leak stack traces to the client.
- **Fail fast on invalid requests** — validate input explicitly (explicit checks, not silent coercion).
- **Services throw domain exceptions; the pipeline maps them** — layer separation keeps HTTP in the edge.

## Example

```kotlin
install(StatusPages) {
    exception<ValidationException> { call, _ -> call.respond(HttpStatusCode.BadRequest, ErrorResponse("invalid request")) }
    exception<NotFoundError> { call, _ -> call.respond(HttpStatusCode.NotFound, ErrorResponse("missing")) }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for ktor-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
