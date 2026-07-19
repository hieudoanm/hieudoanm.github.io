# Hyper Best Practices: 5. Errors & Middleware

## Source guidance

This example applies the **5. Errors & Middleware** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Errors are returned, converted at the boundary:**
- **Wrap services for middleware** — a `Timing`, `Auth`, `Logger` layer is a `Service` around another `Service`; keep each layer one concern.
- **Never panic in `call`** — respond with an error; the server stays up.

## Example

```rust
enum AppError { NotFound, Invalid, Internal }

impl From<AppError> for Response<Body> {
    fn from(e: AppError) -> Self {
        match e { AppError::NotFound => status_response(StatusCode::NOT_FOUND), ... }
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for hyper-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
