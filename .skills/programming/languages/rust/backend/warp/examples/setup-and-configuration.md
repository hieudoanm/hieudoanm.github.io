# Warp Best Practices: 2. Routes & Handlers

## Source guidance

This example applies the **2. Routes & Handlers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Small named handlers per route family; declarative path trees:**
- **`impl Reply` returns — `warp::reply::json`, `warp::reply::html`, `reply::with_status`.**
- **One handler per concern; filters declared once, reused; handlers own no extraction ceremony.**

## Example

```rust
async fn get_user(id: u64) -> Result<impl warp::Reply, Rejection> {
    match repo.find(id).await {
        Ok(Some(u)) => Ok(warp::reply::json(&u)),
        Ok(None)    => Err(warp::reject::not_found()),
        Err(_)      => Err(warp::reject::custom(ApiError::Internal)),
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for warp-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
