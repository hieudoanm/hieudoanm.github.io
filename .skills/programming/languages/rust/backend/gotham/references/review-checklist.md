# Review checklist

Focused reference for **gotham-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
