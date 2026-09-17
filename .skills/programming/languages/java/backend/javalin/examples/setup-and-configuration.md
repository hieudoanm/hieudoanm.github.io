# Javalin Best Practices: 1. App Setup & Wiring

## Source guidance

This example applies the **1. App Setup & Wiring** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Javalin.create()` with explicit handlers; the wiring is the app structure:**
- **Fluent route registrations read top-down**; a named controller class per resource keeps the route table tidy.
- **`config` DSL for defaults (JSON, CORS, port) at creation** — one place, not scattered annotations.

## Example

This excerpt is from the cited **1. App Setup & Wiring** section.

```java
Javalin app = Javalin.create(config -> {
    config.showJavalinBanner = false;
    config.http.defaultContentType = "application/json";
}).routes(() -> router(r -> {
    r.get("/users/{id}", UserController::get);
    r.post("/users", UserController::create);
})).exceptionHandler(AppException.class, (e, ctx) -> ctx.status(400).json(...));
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for javalin-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
