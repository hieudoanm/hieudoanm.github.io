# Workflow notes

Focused reference for **axum-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
