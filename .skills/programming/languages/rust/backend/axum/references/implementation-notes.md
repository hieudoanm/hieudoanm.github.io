# Implementation notes

Focused reference for **axum-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
