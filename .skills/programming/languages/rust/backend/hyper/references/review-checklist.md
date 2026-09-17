# Review checklist

Focused reference for **hyper-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Test the `Service` directly** (no server):

```rust
#[tokio::test]
async fn route_list_users() {
    let mut svc = App;
    let req = Request::builder().uri("/users").body(Body::empty())?;
    let res = svc.call(req).await?;
    assert_eq!(res.status(), StatusCode::OK);
}
```

- **`hyper::Server` + `tokio` integration tests** for the full path; response bodies via `to_bytes`.
- **Contract cases**: valid, not-found, bad method, malformed body, large-body limits.

---

## General Rules of Thumb

- **Hyper hands you HTTP; you own composition (routing, errors, middleware).**
- **Bodies are streams — consume once, bounded.**
- **Services implement `Service`; `poll_ready` honored; error conversions at the boundary.**
- **Routing declarative (match pairs or a tiny router); no hand-rolled parsing.**
- **Client reused/pooled; tests hit the service directly plus full-server cases.**

---

## Quick-Start Checklist

- [ ] `Server::bind` + `make_service_fn`/`service_fn`; graceful shutdown wired
- [ ] `Service` impl with `poll_ready`; `call` returns `Result<Response, _>`
- [ ] Bodies consumed via `to_bytes` bounded; streams read once
- [ ] Routing explicit (method+path match or a small router); params parsed once
- [ ] `From<AppError> for Response` at the boundary; never panic in `call`
- [ ] Middleware as service wrappers; one concern per layer
- [ ] `Service`-level tests + full-server integration; contract covered
