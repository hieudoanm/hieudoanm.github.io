# Workflow notes

Focused reference for **actix-web-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
