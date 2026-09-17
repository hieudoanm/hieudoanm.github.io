# Workflow notes

Focused reference for **rocket-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
