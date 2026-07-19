# Implementation notes

Focused reference for **rocket-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
