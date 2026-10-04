---
name: warp-best-practices
description: Best practices for building Rust web services with warp — the composable filter-based framework conventions. Use when writing, structuring, or reviewing warp — covers filter composition, routing, extractors, state, error handling, and testing.
---

# Warp Best Practices

Warp builds servers from **composable `Filter`s** — every route/fact (path, method, query, body, header, state) is a `Filter` combined with `and`/`or`/`map`/`and_then`. Practical warp leans on **small named filters (`path("users").and(path::param::<u64>().or(...))`), filters declared once and reused, `warp::Filter`-based extractors returning typed tuples**, and **`Rejection`-based error handling with `warp::reject`/`recover`**. The filter pipeline is the API — compose it readably and test filters without a server.

---

## 1. Filter Composition

- **Filters are the unit; combine with `and` (tuple) / `or` (alternative) / `map` (transform) / `and_then` (async):**

```rust
let users = warp::path("users");
let list = users
    .and(warp::get())
    .and_then(list_users);
let get   = users
    .and(warp::get())
    .and(warp::path::param::<u64>())
    .and_then(get_user);
let routes = list.or(get).recover(errors);
```

- **`path::param<T>`/`warp::query::<T>()`/`warp::body::json::<T>()` are extractors — the `and` chain is the request contract.**
- **`or` tries the left first; combined routes can't `or` filters that overlap ambiguity — order the most specific match for `404`.**
- **Filter results are tuples** — `map`/`and_then` destructure them (`move |id, (a, b)|`).

---

## 2. Routes & Handlers

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

- **`warp::test::request()` — no server needed:**

```rust
let response = warp::test::request()
    .path("/users/1")
    .reply(&routes)
    .await;
assert_eq!(response.status(), StatusCode::OK);
```

- **Test individual filters and the full composition**; `RequestBuilder.reply` gives the HTTP contract.
- **Fake state/repo injected via the `warp::any().map` seam.
- **Contract cases**: valid, not-found, bad param, wrong method, rejection mapping.

---

## General Rules of Thumb

- **Filters are the API — small, named, composed (`and`/`or`) rooms.**
- **Extractors in the chain (`path::param`/`query`/`body::json`) are the request contract.**
- **State/Arc-shared via `warp::any().map`.**
- **`reject`/`recover` = error channel; convert once, log at the boundary.**
- **`warp::test::request` tests with contract coverage.**

---

## Quick-Start Checklist

- [ ] Named filters per route family; `and`/`or` composition with `recover`
- [ ] Extractors (`path::param`/`query`/`body::json`) in the chain
- [ ] Handlers `impl Reply`; one concern; state via `warp::any().map`
- [ ] `reject::custom` errors + `recover` mapping once; log in recover
- [ ] CORS/log middleware composed; no handler panics
- [ ] `warp::test::request` tests incl. error/method-mismatch cases