# Javalin Best Practices: Starter Template

A reusable starting point derived from the **1. App Setup & Wiring** section of [Javalin Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```java
Javalin app = Javalin.create(config -> {
    config.showJavalinBanner = false;
    config.http.defaultContentType = "application/json";
}).routes(() -> router(r -> {
    r.get("/users/{id}", UserController::get);
    r.post("/users", UserController::create);
})).exceptionHandler(AppException.class, (e, ctx) -> ctx.status(400).json(...));
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
