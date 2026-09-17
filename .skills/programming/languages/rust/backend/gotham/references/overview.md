# Overview

Focused reference for **gotham-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
