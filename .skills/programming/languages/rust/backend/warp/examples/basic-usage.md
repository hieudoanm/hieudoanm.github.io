# Warp Best Practices: Basic Usage

Best practices for building Rust web services with warp — the composable filter-based framework conventions. Use when writing, structuring, or reviewing warp — covers filter composition, routing, extractors, state, error handling, and testing.

## Scenario

Use this example as a starting point when applying **warp-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Filter Composition** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
