# Warp Best Practices: Starter Template

A reusable starting point derived from the **1. Filter Composition** section of [Warp Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```rust
let users = warp::path("users");
let list = users
    .and(warp::get())
    .and_then(list_users);
let get   = users
    .and(warp::get())
    .and(warp::path::param::<u64>())
    .and_then(get_user);
let routes = list.or(get).recover(errors);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
