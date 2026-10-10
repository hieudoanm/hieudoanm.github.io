# Actix-web Best Practices: Starter Template

A reusable starting point derived from the **7. Testing** section of [Actix-web Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
