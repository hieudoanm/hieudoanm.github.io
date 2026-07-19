# Rocket Best Practices: Starter Template

A reusable starting point derived from the **1. Launch Structure** section of [Rocket Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
