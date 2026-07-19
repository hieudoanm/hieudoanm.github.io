# Gotham Best Practices: Starter Template

A reusable starting point derived from the **3. Extractors** section of [Gotham Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
