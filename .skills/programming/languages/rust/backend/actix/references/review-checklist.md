# Review checklist

Focused reference for **actix-web-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Async code everywhere** — `sqlx`/`sea-orm`/async clients used with awaits; blocking cpu goes through `web::block`.
- **Cancellation flows** — requests carry a deadline appropriate to the API; no unbounded waits.

---

## 7. Testing

- **`.await` handlers via `actix_web::test`** — build the App once, reuse in tests:

```rust
async fn service() -> impl Service<...> {
    test::init_service(App::new().app_data(web::Data::new(AppState::default()))).await
}

#[actix_web::test]
async fn get_user_returns_json() {
    let app = service().await;
    let req = test::TestRequest::get().uri("/users/1").to_request();
    let res = test::call_service(&app, req).await;
    assert!(res.status().is_success());
}
```

- **`test::TestRequest` gives the full HTTP contract; service/repo fakes injected via `AppState`.**
- **Contract cases**: valid, not-found, bad input, unauthorized, method-not-allowed.

---

## General Rules of Thumb

- **Routes by scope; extractors in signatures; one service per handler call.**
- **State via `web::Data`; Arc-shared, Clone; constructed once at startup.**
- **Errors convert to HTTP via `From` at the boundary; `?` propagates; log once.**
- **Blocking work through `web::block`; async everywhere else.**
- **`test::init_service`/`call_service` tested; happy + boundary covered.**

---

## Quick-Start Checklist

- [ ] `App::new()` + `web::scope`/`route`; `app_data` state injected once
- [ ] Extractors (`Json<T>`/`Path<T>`/`Query<T>`/`State<T>`) ≤ 4 per handler
- [ ] Handlers thin; services own domain; blocking via `web::block`
- [ ] `From<DomainError> for web::Error` mapping at the boundary; no panics in handlers
- [ ] `Logger`/`Compress`/`NormalizePath` middleware ordered correctly
- [ ] Clients/repo constructed in `AppState` at startup; `Arc`-shared
- [ ] `test::init_service`/`call_service` tests covering error paths
