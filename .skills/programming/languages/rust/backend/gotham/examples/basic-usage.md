# Gotham Best Practices: Basic Usage

Best practices for building Rust web services with Gotham — the type-safe, principled framework conventions. Use when writing, structuring, or reviewing Gotham — covers router composition, state/handler design, extractors, error handling, concurrency, and testing.

## Scenario

Use this example as a starting point when applying **gotham-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Router & Bootstrapping** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```rust
use gotham::router::builder::*;
use gotham::router::Router;
use gotham::state::State;

pub fn router() -> Router {
    build_simple_router(|route| {
        route.get("/users").to(list_users);
        route.get("/users/{id}").to(get_user);
        route.post("/users").to(create_user);
    })
}

#[actix_web::main] // or tokio main
async fn main() {
    let addr = "127.0.0.1:8080";
    println!("Listening on {}", addr);
    gotham::start(addr, router());
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
