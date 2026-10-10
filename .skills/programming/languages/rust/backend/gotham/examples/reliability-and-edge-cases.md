# Gotham Best Practices: 4. Error Handling

## Source guidance

This example applies the **4. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Prefer an explicit error type converted at the boundary:**
- **Handlers return `Result<_, AppError>`/Gotham-friendly error and the top-level handler maps it** — no panics in signal paths.
- **Log + render one level up** — a final error handler renders a `400/404/500` shape.

## Example

```rust
#[derive(Error, Debug)]
enum AppError { #[error("not found")] NotFound, #[error("bad input")] Invalid, }

impl From<AppError> for (StatusCode, String) {
    fn from(e: AppError) -> Self { ... }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for gotham-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
