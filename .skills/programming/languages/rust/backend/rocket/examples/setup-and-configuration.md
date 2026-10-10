# Rocket Best Practices: 1. Launch Structure

## Source guidance

This example applies the **1. Launch Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`#[launch]` + rocket.routes![] assembles the app at one point:**
- **`manage(...)` registers state; `mount("/prefix", routes![...])` maps route families to a path.**
- **Named handler functions; one route per function; the `#[get]` macro declares the contract.**

## Example

This excerpt is from the cited **1. Launch Structure** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for rocket-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
