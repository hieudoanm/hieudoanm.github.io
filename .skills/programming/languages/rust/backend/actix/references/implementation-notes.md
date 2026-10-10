# Implementation notes

Focused reference for **actix-web-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`impl Error for MyError` + a `From<MyError> for actix_web::Error` mapper** — one conversion per domain error type, at the boundary:

```rust
impl From<AppError> for actix_web::Error {
    fn from(e: AppError) -> Self {
        match e { AppError::NotFound => HttpResponse::NotFound().into(), ... }
    }
}
```

- **`?` propagates errors up; logging at the boundary** (`actix_web::middleware::Logger` for requests-plus, structured extras where the domain cares).
- **`HttpResponse::InternalServerError` with no panic** — panic only for invariants, and `Recover` middleware turns the unexpected into responses.

---

## 5. Middleware

- **`.wrap(middleware::Logger::default())`/`middleware::Compress`/`NormalizePath`** for the common pipeline:

```rust
App::new()
    .wrap(middleware::Logger::default())
    .wrap(middleware::Compress::default())
    .service(...)
```

- **Custom middleware via `middleware::from_fn`/custom `Transform`** — keep it small; it's a `Service` wrapper over the route.

---

## 6. Data & Async

- **DB/HTTP clients prepared at startup** (in `AppState`) — no per-request construction:

```rust
let client = reqwest::Client::builder().build()?;
let repo = Repo::new(pool);
app_data(web::Data::new(AppState { client, repo }))
```
