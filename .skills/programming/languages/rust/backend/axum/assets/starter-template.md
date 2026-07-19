# Axum Best Practices: Starter Template

A reusable starting point derived from the **3. Application Setup** section of [Axum Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```rust
use axum::{
    routing::get,
    Router,
};
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    let app_state = AppState::new().await;

    let app = Router::new()
        .route("/", get(health_check))
        .route("/users", get(get_users).post(create_user))
        .layer(
            CorsLayer::permissive()
        )
        .with_state(app_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
