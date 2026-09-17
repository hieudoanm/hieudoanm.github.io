# Review checklist

Focused reference for **warp-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
