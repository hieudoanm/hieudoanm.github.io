# Workflow notes

Focused reference for **warp-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Small named handlers per route family; declarative path trees:**

```rust
async fn get_user(id: u64) -> Result<impl warp::Reply, Rejection> {
    match repo.find(id).await {
        Ok(Some(u)) => Ok(warp::reply::json(&u)),
        Ok(None)    => Err(warp::reject::not_found()),
        Err(_)      => Err(warp::reject::custom(ApiError::Internal)),
    }
}
```

- **`impl Reply` returns — `warp::reply::json`, `warp::reply::html`, `reply::with_status`.**
- **One handler per concern; filters declared once, reused; handlers own no extraction ceremony.**

---

## 3. State & Dependencies

- **`warp::any().map(|| app_state.clone())` passes state into filters:**

```rust
let routes = users
    .and(warp::any().map(|| state.clone()))   // Arc<AppState>
    .and(warp::get())
    .and(warp::path::param::<u64>())
    .and_then(|sts, id| get_user(sts, id));
```

- **State is `Clone` + `Arc`-shared; one `warp::any().map` per dependency group — keep the filter readable.**

---
