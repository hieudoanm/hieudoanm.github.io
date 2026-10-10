# Overview

Focused reference for **axum-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Axum Best Practices

Axum is an ergonomic web framework built on Tokio that provides a type-safe, modular API. Best practice is to leverage Axum's extractor system, use proper state management, implement error handling with IntoResponse, and follow Rust's ownership patterns for clean, performant web services.

---

## 1. Core Stack

- Rust **latest stable**
- Axum **latest stable**
- Tokio **latest stable**
- Tower for middleware
- SQLx or Sea-ORM for persistence

```toml
[dependencies]
axum = "0.7"
tokio = { version = "1", features = ["full"] }
tower = "0.4"
tower-http = { version = "0.5", features = ["cors", "trace"] }
sqlx = { version = "0.7", features = ["postgres", "runtime-tokio"] }
serde = { version = "1", features = ["derive"] }
```

---

## 2. Project Structure

```text
src/
├── main.rs              # Entry point
├── lib.rs               # Library exports
├── routes/              # Route handlers
│   ├── mod.rs
│   ├── users.rs
│   └── orders.rs
├── models/              # Domain models
│   ├── mod.rs
│   ├── user.rs
│   └── order.rs
├── services/            # Business logic
│   ├── mod.rs
│   ├── user_service.rs
│   └── order_service.rs
├── repositories/        # Data access
│   ├── mod.rs
│   ├── user_repository.rs
│   └── order_repository.rs
├── state/               # Application state
│   ├── mod.rs
│   └── app_state.rs
└── error.rs             # Error types
```

---

## 3. Application Setup

- **Router composition with state:**

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

---

## 4. Routing & Handlers

- **Route definition with extractors:**
