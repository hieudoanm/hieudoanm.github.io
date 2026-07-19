# Actix-web Best Practices: Basic Usage

Best practices for building Rust web services with Actix-web — the high-performance actor-based framework conventions. Use when writing, structuring, or reviewing Actix-web — covers App wiring, extractors, routes, state, error handling, middleware, and testing.

## Scenario

Use this example as a starting point when applying **actix-web-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. App & Routing** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```rust
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .app_data(web::Data::new(AppState::default()))
            .service(web::scope("/users")
                .route("/", web::get().to(list_users))
                .route("/{id}", web::get().to(get_user)))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
