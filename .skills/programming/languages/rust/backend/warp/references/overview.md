# Overview

Focused reference for **warp-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
