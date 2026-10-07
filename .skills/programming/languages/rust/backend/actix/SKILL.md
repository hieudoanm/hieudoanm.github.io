---
name: actix-web-best-practices
description: Best practices for building Rust web services with Actix-web — the high-performance actor-based framework conventions. Use when writing, structuring, or reviewing Actix-web — covers App wiring, extractors, routes, state, error handling, middleware, and testing.
---

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

```rust
let res = web::block(move || std::fs::read(path)).await??;
```

---

## 3. State & Dependencies

- **`App::app_data(web::Data::new(...))` injects shared state; `State<T>` type in extractors:**

```rust
#[derive(Clone)]
struct AppState { repo: Arc<dyn UserRepository> }
```

- **Everything shared is `Arc`-wrapped and cloneable** — the actor/thread model means state moves across worker threads.
- **`AppState` includes dependencies (repo, clients)** — the handler owns no construction; wiring happens in `HttpServer::new`:

```rust
HttpServer::new(move || App::new().app_data(web::Data::new(app_state.clone())))
```

- **No global mutable state** in handlers — the state is the injectable contract.

---

## 4. Error Handling

- **Handlers return `actix_web::Result<T>`; domain errors convert via `From`:**

```rust
#[derive(Debug)]
struct NotFound;

impl From<NotFound> for actix_web::Error {
    fn from(_: NotFound) -> Self { HttpResponse::NotFound().into() }
}
```

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

- **Async code everywhere** — `sqlx`/`sea-orm`/async clients used with awaits; blocking cpu goes through `web::block`.
- **Cancellation flows** — requests carry a deadline appropriate to the API; no unbounded waits.

---

## 7. Testing

- **`.await` handlers via `actix_web::test`** — build the App once, reuse in tests:

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

- **`test::TestRequest` gives the full HTTP contract; service/repo fakes injected via `AppState`.**
- **Contract cases**: valid, not-found, bad input, unauthorized, method-not-allowed.

---

## General Rules of Thumb

- **Routes by scope; extractors in signatures; one service per handler call.**
- **State via `web::Data`; Arc-shared, Clone; constructed once at startup.**
- **Errors convert to HTTP via `From` at the boundary; `?` propagates; log once.**
- **Blocking work through `web::block`; async everywhere else.**
- **`test::init_service`/`call_service` tested; happy + boundary covered.**

---

## Quick-Start Checklist

- [ ] `App::new()` + `web::scope`/`route`; `app_data` state injected once
- [ ] Extractors (`Json<T>`/`Path<T>`/`Query<T>`/`State<T>`) ≤ 4 per handler
- [ ] Handlers thin; services own domain; blocking via `web::block`
- [ ] `From<DomainError> for web::Error` mapping at the boundary; no panics in handlers
- [ ] `Logger`/`Compress`/`NormalizePath` middleware ordered correctly
- [ ] Clients/repo constructed in `AppState` at startup; `Arc`-shared
- [ ] `test::init_service`/`call_service` tests covering error paths