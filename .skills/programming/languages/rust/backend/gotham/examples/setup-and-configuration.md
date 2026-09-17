# Gotham Best Practices: 2. Handlers & State

## Source guidance

This example applies the **2. Handlers & State** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Handlers receive `State` and return a response — the request contract is typed:**
- **`extract` via `state.borrow::<T>()`** for the `Path`/`Query`/`Header` extractors Gotham provides; the typed extraction is the boundary:
- **App state pre-registered with `state.put(...)` in a `#[derive(StateData)]`; handlers borrow it.**
- **`State` flows through as the first param — all wiring is visible at the handler signature.**

## Example

```rust
pub fn get_user(state: State) -> (State, Json<User>) {
    let id = state.borrow::<Path<u64>>()?.inner();
    let user = repo.find(id).unwrap();   // see error section
    (state, Json(user))
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for gotham-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
