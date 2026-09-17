# Review checklist

Focused reference for **axum-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
