# Implementation notes

Focused reference for **gotham-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
