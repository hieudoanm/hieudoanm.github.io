---
name: rocket-best-practices
description: Best practices for building Rust web services with Rocket — the macro-driven, developer-friendly framework conventions. Use when writing, structuring, or reviewing Rocket — covers launching, routes, request guards, state, URI, error handling, and testing.
---

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

- **Extractors as parameters:** `Path`, `Query<T>`, `Json<T>`, `&State<T>`, `Data` — the signature names the request contract.
- **`format = "json"` + `data = "<param>"`** declares the body mapping at the route level.
- **`async fn` with `.await` inside; blocking work via `spawn_blocking`/`tokio::task::block_in_place` for heavy compute.**

---

## 3. Request Guards & State

- **`State`/`manage` for shared deps (repo, client, config):**

```rust
#[derive(Clone)]
struct AppState { repo: Arc<dyn UserRepository> }
```

- **Custom guards via `FromRequest`** — auth-bearing headers parsed at the boundary:

```rust
struct AuthUser { id: u64 }
#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthUser {
    type Error = (); 
    async fn from_request(req: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        // parse Authorization header, fail to 401 on absence
    }
}
```

- **Guards are where security/validation lives** — a `401` guard is a reusable contract, not per-route boilerplate.

---

## 4. JSON & Serialization

- **`Json<T>` in and out with `serde` derive:**

```rust
#[derive(Serialize, Deserialize)]
struct User { id: u64, name: String }
```

- **`#[catch(404)]`, `#[catch(500)]` handlers render errors uniformly:**

```rust
#[catch(404)]
fn not_found() -> Json<ErrorBody> { Json(ErrorBody { error: "not found" }) }
```

- **Failure via `Result<_, SomeError>` in routes; `#[catch]` handles the known set; fail-open responses mapped once.**

---

## 5. Errors & Logging

- **`#[catch]` for the standard codes; domain errors integrated via `Responder` implementations:**

```rust
impl Responder<'_, '_> for AppError { ... }
```

- **Log at the boundary** — `rocket::log`/`env_logger`; no `println` in the request path.
- **No panics in the request path** — a `catch_all(500)` plus `set_` policies keep the server alive.

---

## 6. Testing

- **`rocket::local::blocking::Client` spins an in-memory instance:**

```rust
#[test]
fn get_user_not_found() {
    let client = Client::tracked(rocket()).expect("valid rocket");
    let req = client.get("/users/999");
    let res = req.dispatch();
    assert_eq!(res.status(), Status::NotFound);
}
```

- **Fake the seams via state injection** (`manage` with a fake repo in `TestBuilder`).
- **Contract tests**: valid, not-found, bad body, unauthorized guard, method match.

---

## General Rules of Thumb

- **Routes are typed function signatures — the extractors ARE the contract.**
- **Guards (`FromRequest`) at the security/validation boundary; `State` for shared deps.**
- **`Json<T>`/`serde` through; `#[catch]` + `Responder` for uniform errors.**
- **Async handlers; `spawn_blocking` for heavy compute.**
- **`Client::tracked` tests; happy + boundary covered.**

---

## Quick-Start Checklist

- [ ] `#[launch]` + `mount` + `manage`; state registered once
- [ ] Route attributes (`#[get]`/`#[post]` + `format`/`data`) with typed extractors
- [ ] Guards (`FromRequest`) for auth/path params; `State<AppState>` for deps
- [ ] `Json<T>` / `serde` models; `#[catch]` handlers for error set
- [ ] `impl Responder` for domain errors; log at the boundary
- [ ] `Client::tracked` handler tests; contract cases incl. unauthorized