# Overview

Focused reference for **rocket-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Rocket Best Practices

Rocket is a **macro-driven Rust web framework** where routes are `#[get]`/`#[post]`-attributed functions and **argument types are extractors (Request Guards, `Query`, `Path`)** defined by `FromRequest`. Practical Rocket leans on **typed route signatures, `State` for shared context, `serde` outcomes on `Json<T>`**, and **`#[catch]` handlers for uniform error responses**. Rocket prizes type-safety and developer ergonomics — your compile errors ARE the API contract.

---

## 1. Launch Structure

- **`#[launch]` + rocket.routes![] assembles the app at one point:**

```rust
#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str { "Hello!" }

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index])
        .manage(AppState::default())
}
```

- **`manage(...)` registers state; `mount("/prefix", routes![...])` maps route families to a path.**
- **Named handler functions; one route per function; the `#[get]` macro declares the contract.**

---

## 2. Routes & Functions

- **Route attributes define verb + path + format:**

```rust
#[get("/users/{id}")]
async fn get_user(id: u64, state: &State<AppState>) -> Json<User> {
    Json(state.repo.find(id).unwrap_or_default())
}

#[post("/users", format = "json", data = "<req>")]
async fn create_user(req: Json<CreateUser>) -> Json<User> { ... }
```
