# Overview

Focused reference for **actix-web-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Actix-web Best Practices

Actix-web is a high-performance, actor-based Rust web framework built on `tokio`. Practical Actix-web leans on **`App` composition with `route`/`web::scope`, `web::Json`/`web::Path`/`web::Query` extractors at the handler boundary, a single `State` (or `Data`) passed via `App::app_data`**, and **`actix_web::Result`/error mapping through `From`-conversions to HTTP responses**. Safety comes from Rust's type system; discipline keeps it ergonomic.

---

## 1. App & Routing

- **`App::new()` with scopes and services composes the tree:**

```rust
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .app_data(web::Data::new(AppState::default()))
            .service(web::scope("/users")
                .route("/", web::get().to(list_users))
                .route("/{id}", web::get().to(get_user)))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

- **`web::scope("/users")` groups paths; `.route("/", web::get().to(handler))` declares verb + handler at the point.**
- **Independent handlers on different principles (`get().to(...)` vs `post().to(...)`)** — the route table reads as an API contract.

---

## 2. Extractors & Handlers

- **Extractors appear in the handler signature — `Json<T>`, `Path<T>`, `Query<T>`, `State<T>`:**

```rust
async fn get_user(
    state: web::Data<AppState>,
    path: web::Path<u64>,
) -> actix_web::Result<web::Json<User>> {
    let user = state.repo.find(*path).await?;
    Ok(web::Json(user))
}
```

- **Max 3–4 extractors per handler** — a signature with five structs is a composite request type in disguise; define a `QueryParams` struct.
- **`web::Json` for output; `web::Json<T>` deserializes + validates the body shape.**
- **Handlers small: extract, call a service, return; no business logic in them.**
- **`async fn` handlers everywhere; blocking work goes to `web::block`/`spawn_blocking`:**
