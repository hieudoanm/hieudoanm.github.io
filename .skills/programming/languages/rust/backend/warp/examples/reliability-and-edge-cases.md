# Warp Best Practices: 4. Errors & Rejections

## Source guidance

This example applies the **4. Errors & Rejections** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Rejection` is the error channel; custom errors via `warp::reject::custom`**, then `recover` maps to responses:
- **`reject::not_found()` / custom rejections built at the service layer, converted once in `recover`.**
- **Log inside `recover`** (internal detail) + generic message out; never panic in a handler.

## Example

```rust
pub async fn errors(r: Rejection) -> Result<impl Reply, Infallible> {
    if r.is_not_found() { Ok(reply::with_status("not found", StatusCode::NOT_FOUND)) }
    else if let Some(e) = r.find::<ApiError>() {
        Ok(reply::with_status(e.message(), e.status()))
    } else {
        Ok(reply::with_status("internal", StatusCode::INTERNAL_SERVER_ERROR))
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for warp-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
