---
name: gotham-best-practices
description: Best practices for building Rust web services with Gotham — the type-safe, principled framework conventions. Use when writing, structuring, or reviewing Gotham — covers router composition, state/handler design, extractors, error handling, concurrency, and testing.
---

# Gotham Best Practices

Gotham is a **type-safe, principled Rust web framework** — it threads `State` (an extensible request context) explicitly through handlers (`receive_and_respond` style) and is built on `hyper`. Practical Gotham leans on **`router::builder::tree` for typed routes, handler functions receiving `State` and returning responses, and explicit error types** converted at the boundary. Gotham's philosophy: fewer surprises, more compile-time structure — a good match for services where correctness is the top priority.

---

## 1. Router & Bootstrapping

- **`gotham::start` with a `Router` built from the builder DSL:**

```rust
use gotham::router::builder::*;
use gotham::router::Router;
use gotham::state::State;

pub fn router() -> Router {
    build_simple_router(|route| {
        route.get("/users").to(list_users);
        route.get("/users/{id}").to(get_user);
        route.post("/users").to(create_user);
    })
}

#[actix_web::main] // or tokio main
async fn main() {
    let addr = "127.0.0.1:8080";
    println!("Listening on {}", addr);
    gotham::start(addr, router());
}
```

- **`build_simple_router` gives a `Get`/`Post`/`Delete` tree; use it or `build_tree_router`** — the route table is declarative, at one place.
- **`{param}` in path segments mapped via `route`/`extract` later.**

---

## 2. Handlers & State

- **Handlers receive `State` and return a response — the request contract is typed:**

```rust
pub fn get_user(state: State) -> (State, Json<User>) {
    let id = state.borrow::<Path<u64>>()?.inner();
    let user = repo.find(id).unwrap();   // see error section
    (state, Json(user))
}
```

- **`extract` via `state.borrow::<T>()`** for the `Path`/`Query`/`Header` extractors Gotham provides; the typed extraction is the boundary:
- **App state pre-registered with `state.put(...)` in a `#[derive(StateData)]`; handlers borrow it.**
- **`State` flows through as the first param — all wiring is visible at the handler signature.**

---

## 3. Extractors

- **Gotham's `extract` trait + `Path<T>`/`QueryString<T>` on any `Deserialize`:**

```rust
#[derive(Deserialize)]
struct UserParams { limit: Option<u64>, }

pub fn list_users(state: State) -> (State, Json<Vec<User>>) {
    let q = {
        let qs = state.borrow::<QueryString<UserParams>>()?.inner();
        qs.limit.unwrap_or(20)
    };
    ...
}
```

- **Extraction failures are handled by the framework → `400`**

---

## 4. Error Handling

- **Prefer an explicit error type converted at the boundary:**

```rust
#[derive(Error, Debug)]
enum AppError { #[error("not found")] NotFound, #[error("bad input")] Invalid, }

impl From<AppError> for (StatusCode, String) {
    fn from(e: AppError) -> Self { ... }
}
```

- **Handlers return `Result<_, AppError>`/Gotham-friendly error and the top-level handler maps it** — no panics in signal paths.
- **Log + render one level up** — a final error handler renders a `400/404/500` shape.

---

## 5. Async & Dependencies

- **Handler-defined clients/Db access** — put shared repo/clients into app `State` once (derive `StateData`):

```rust
#[derive(Clone, StateData)]
struct AppState { repo: Arc<dyn UserRepository> }
```

- **Async I/O inside handlers** with the tokio reactor running; `spawn_blocking` for compute:

```rust
let res = tokio::task::spawn_blocking(move || heavy(&repo)).await;
```

- **No blocking calls that stall the reactor** in hot paths.

---

## 6. Testing

- **Unit-test handlers via builder-injected routers / request fixtures:**

```rust
#[tokio::test]
async fn get_user_returns_not_found() {
    let app = router();
    let req = HyperClient::get("http://test/users/999");
    ...
}
```

- **Contract cases**: valid, not-found, bad input, invalid method, missing param.

---

## General Rules of Thumb

- **Routes declaratively in the builder; handlers typed on `State`.**
- **Extractors (`Path`/`Query`) at the boundary; errors converted once.**
- **`StateData` app state, constructed once; Arc-shared.**
- **Async everywhere; `spawn_blocking` for compute; no panics in signal paths.**
- **Router-level tests; happy + boundary covered.**

---

## Quick-Start Checklist

- [ ] `build_simple_router`/tree; verb routes in one place
- [ ] Handlers `(State) -> (State, Json<T>)`; extractors via `state.borrow`
- [ ] App state `#[derive(StateData)]`, injected once; Arc-shared deps
- [ ] Explicit error type converting to status at the boundary
- [ ] `spawn_blocking`/async I/O discipline; no reactor-blocking calls
- [ ] Handler/router tests with `HyperClient`; contract cases