# Actix-web Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`.await` handlers via `actix_web::test`** — build the App once, reuse in tests:
- **`test::TestRequest` gives the full HTTP contract; service/repo fakes injected via `AppState`.**
- **Contract cases**: valid, not-found, bad input, unauthorized, method-not-allowed.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for actix-web-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
