---
name: axum-best-practices
description: Best practices for building Rust web services with Axum — the ergonomic web framework built on Tokio. Use when writing, structuring, or reviewing Axum — covers routing, extractors, state, error handling, middleware, and testing.
---

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

```rust
use axum::{
    extract::{Path, State},
    Json,
};
use serde::Deserialize;

#[derive(Deserialize)]
struct CreateUserRequest {
    name: String,
    email: String,
}

async fn create_user(
    State(state): State<AppState>,
    Json(req): Json<CreateUserRequest>,
) -> Json<User> {
    let user = state.user_service.create(req).await;
    Json(user)
}

async fn get_user(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Json<User> {
    let user = state.user_service.get_by_id(id).await;
    Json(user)
}
```

- **Use extractors for request data (Path, Query, Json, State).**
- **Handlers should be thin; delegate to services.**
- **Return types implement IntoResponse.**

---

## 5. State Management

- **Shared state via Arc:**

```rust
use std::sync::Arc;

#[derive(Clone)]
struct AppState {
    user_service: Arc<UserService>,
    order_service: Arc<OrderService>,
}

impl AppState {
    async fn new() -> Self {
        let db_pool = create_db_pool().await;
        let user_repository = Arc::new(UserRepository::new(db_pool.clone()));
        let user_service = Arc::new(UserService::new(user_repository));

        Self {
            user_service,
            order_service: Arc::new(OrderService::new(...)),
        }
    }
}
```

- **Use Arc for shared state across async tasks.**
- **Construct state once at startup.**
- **No global mutable state.**

---

## 6. Error Handling

- **Custom error types with IntoResponse:**

```rust
use axum::{
    response::{IntoResponse, Response},
    http::StatusCode,
    Json,
};

#[derive(Debug)]
enum AppError {
    NotFound(String),
    BadRequest(String),
    Internal(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            AppError::NotFound(msg) => (StatusCode::NOT_FOUND, msg),
            AppError::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg),
            AppError::Internal(msg) => (StatusCode::INTERNAL_SERVER_ERROR, msg),
        };

        (status, Json(json!({ "error": message }))).into_response()
    }
}
```

- **Implement IntoResponse for custom error types.**
- **Map domain errors to HTTP status codes.**
- **Use ? operator for error propagation.**

---

## 7. Middleware

- **Tower middleware for cross-cutting concerns:**

```rust
use tower_http::trace::TraceLayer;
use tower::ServiceBuilder;

let app = Router::new()
    .layer(
        ServiceBuilder::new()
            .layer(TraceLayer::new_for_http())
            .layer(CorsLayer::permissive())
    )
    .route("/", get(handler));
```

- **Use Tower middleware for logging, tracing, CORS.**
- **Middleware is applied as layers to the router.**
- **Custom middleware via Tower Service trait.**

---

## 8. Database Integration

- **SQLx for type-safe database access:**

```rust
use sqlx::postgres::PgPoolOptions;

async fn create_db_pool() -> PgPool {
    PgPoolOptions::new()
        .max_connections(5)
        .connect(&std::env::var("DATABASE_URL").unwrap())
        .await
        .expect("Failed to create pool")
}

#[derive(sqlx::FromRow)]
struct User {
    id: i32,
    name: String,
    email: String,
}

async fn get_user(pool: &PgPool, id: i32) -> Result<User, sqlx::Error> {
    sqlx::query_as::<User>("SELECT * FROM users WHERE id = $1")
        .bind(id)
        .fetch_one(pool)
        .await
}
```

- **Use SQLx for compile-time checked queries.**
- **Connection pooling for performance.**
- **Transactions via begin() helper.**

---

## 9. Extractors

- **Custom extractors for common patterns:**

```rust
use axum::{
    extract::FromRequestParts,
    http::request::Parts,
    async_trait::async_trait,
};

struct AuthUser {
    user_id: String,
}

#[async_trait]
impl<S> FromRequestParts<S> for AuthUser
where
    S: Send + Sync,
{
    type Rejection = StatusCode;

    async fn from_request_parts(
        parts: &mut Parts,
        _state: &S,
    ) -> Result<Self, Self::Rejection> {
        let auth_header = parts
            .headers
            .get("authorization")
            .and_then(|h| h.to_str().ok())
            .ok_or(StatusCode::UNAUTHORIZED)?;

        let user_id = validate_token(auth_header)
            .await
            .map_err(|_| StatusCode::UNAUTHORIZED)?;

        Ok(AuthUser { user_id })
    }
}
```

- **Implement FromRequestParts for custom extractors.**
- **Use extractors for authentication, validation, etc.**
- **Extractors make handlers clean and testable.**

---

## 10. Testing

- **Test with axum's test utilities:**

```rust
use axum::{
    body::Body,
    http::{Request, StatusCode},
};
use tower::ServiceExt;

#[tokio::test]
async fn test_get_user() {
    let app = create_test_app().await;

    let response = app
        .oneshot(
            Request::builder()
                .uri("/users/1")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::OK);
}
```

- **Use tower::ServiceExt for testing.**
- **Test with in-memory state or test database.**
- **Test both success and error paths.**

---

## 11. JSON & Serialization

- **Serde for JSON serialization:**

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct User {
    id: i32,
    name: String,
    email: String,
}

#[derive(Deserialize)]
struct CreateUserRequest {
    name: String,
    email: String,
}
```

- **Use serde for request/response types.**
- **Derive Serialize/Deserialize for structs.**
- **JSON extractor automatically deserializes.**

---

## 12. WebSocket Support

- **WebSocket support via axum-extra:**

```rust
use axum::{
    extract::{ws::WebSocketUpgrade, State},
    response::IntoResponse,
};

async fn websocket_handler(
    ws: WebSocketUpgrade,
    State(state): State<AppState>,
) -> impl IntoResponse {
    ws.on_upgrade(|socket| handle_socket(socket, state))
}

async fn handle_socket(
    mut socket: WebSocket,
    state: AppState,
) {
    while let Some(msg) = socket.recv().await {
        // Handle message
    }
}
```

- **Use axum-extra for WebSocket support.**
- **Handle WebSocket connections asynchronously.**
- **State can be shared via extractors.**

---

## 13. General Rules of Thumb

- **Extractors for request data; keep handlers thin.**
- **State via Arc; constructed once at startup.**
- **Error types implement IntoResponse.**
- **Tower middleware for cross-cutting concerns.**
- **SQLx for type-safe database access.**
- **Test with tower::ServiceExt.**
- **Serde for JSON serialization.**

---

## Quick-Start Checklist

- [ ] Router composition with state
- [ ] Extractors for request data (Path, Query, Json, State)
- [ ] Handlers thin; business logic in services
- [ ] Shared state via Arc
- [ ] Custom error types with IntoResponse
- [ ] Tower middleware for logging, CORS, tracing
- [ ] SQLx for database access with connection pooling
- [ ] Custom extractors for common patterns
- [ ] Testing with tower::ServiceExt
- [ ] Serde for JSON serialization
