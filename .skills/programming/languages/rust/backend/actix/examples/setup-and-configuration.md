# Actix-web Best Practices: 2. Extractors & Handlers

## Source guidance

This example applies the **2. Extractors & Handlers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Extractors appear in the handler signature — `Json<T>`, `Path<T>`, `Query<T>`, `State<T>`:**
- **Max 3–4 extractors per handler** — a signature with five structs is a composite request type in disguise; define a `QueryParams` struct.
- **`web::Json` for output; `web::Json<T>` deserializes + validates the body shape.**
- **Handlers small: extract, call a service, return; no business logic in them.**
- **`async fn` handlers everywhere; blocking work goes to `web::block`/`spawn_blocking`:**

## Example

```rust
async fn get_user(
    state: web::Data<AppState>,
    path: web::Path<u64>,
) -> actix_web::Result<web::Json<User>> {
    let user = state.repo.find(*path).await?;
    Ok(web::Json(user))
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for actix-web-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
