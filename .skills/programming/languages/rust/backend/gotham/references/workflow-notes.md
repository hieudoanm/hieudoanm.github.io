# Workflow notes

Focused reference for **gotham-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
