# Rocket Best Practices: Basic Usage

Best practices for building Rust web services with Rocket — the macro-driven, developer-friendly framework conventions. Use when writing, structuring, or reviewing Rocket — covers launching, routes, request guards, state, URI, error handling, and testing.

## Scenario

Use this example as a starting point when applying **rocket-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Launch Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```rust
#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str { "Hello!" }

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index])
        .manage(AppState::default())
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
