# Rocket Best Practices: 5. Errors & Logging

## Source guidance

This example applies the **5. Errors & Logging** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`#[catch]` for the standard codes; domain errors integrated via `Responder` implementations:**
- **Log at the boundary** — `rocket::log`/`env_logger`; no `println` in the request path.
- **No panics in the request path** — a `catch_all(500)` plus `set_` policies keep the server alive.

## Example

```rust
impl Responder<'_, '_> for AppError { ... }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for rocket-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
