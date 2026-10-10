# Actix-web Best Practices: 4. Error Handling

## Source guidance

This example applies the **4. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Handlers return `actix_web::Result<T>`; domain errors convert via `From`:**
- **`impl Error for MyError` + a `From<MyError> for actix_web::Error` mapper** — one conversion per domain error type, at the boundary:
- **`?` propagates errors up; logging at the boundary** (`actix_web::middleware::Logger` for requests-plus, structured extras where the domain cares).
- **`HttpResponse::InternalServerError` with no panic** — panic only for invariants, and `Recover` middleware turns the unexpected into responses.

## Example

```rust
#[derive(Debug)]
struct NotFound;

impl From<NotFound> for actix_web::Error {
    fn from(_: NotFound) -> Self { HttpResponse::NotFound().into() }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for actix-web-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
