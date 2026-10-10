# Implementation notes

Focused reference for **hyper-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Errors & Middleware

- **Errors are returned, converted at the boundary:**

```rust
enum AppError { NotFound, Invalid, Internal }

impl From<AppError> for Response<Body> {
    fn from(e: AppError) -> Self {
        match e { AppError::NotFound => status_response(StatusCode::NOT_FOUND), ... }
    }
}
```

- **Wrap services for middleware** — a `Timing`, `Auth`, `Logger` layer is a `Service` around another `Service`; keep each layer one concern.
- **Never panic in `call`** — respond with an error; the server stays up.

---

## 6. Client

- **`hyper::Client` for outbound calls:**

```rust
let client = hyper::Client::new();
let req = Request::builder().uri("http://example.com").body(Body::empty())?;
let res = client.request(req).await?;
```

- **One client per app (connection-pooled, reused); `Client::builder()` for TLS/limits explicitly.**
- **Body consumption bounded** — never `.to_bytes()` a response you then must stream.

---

## 7. Testing
