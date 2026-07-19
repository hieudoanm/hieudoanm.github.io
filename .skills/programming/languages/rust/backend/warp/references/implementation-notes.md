# Implementation notes

Focused reference for **warp-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Errors & Rejections

- **`Rejection` is the error channel; custom errors via `warp::reject::custom`**, then `recover` maps to responses:

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

- **`reject::not_found()` / custom rejections built at the service layer, converted once in `recover`.**
- **Log inside `recover`** (internal detail) + generic message out; never panic in a handler.

---

## 5. Middleware & Logging

- **`warp::log::custom`/`warp::Header` filters attach request logging; wrap the whole routes with `.with(warp::log("api"))`:**
- **CORS via `warp::cors()`;** compression via a `wrap` — keep the pipeline explicit.

---

## 6. Testing
