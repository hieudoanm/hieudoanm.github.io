# Javalin Best Practices: Basic Usage

Best practices for building Java web APIs with Javalin — the lightweight Kotlin-originated HTTP framework conventions for Java. Use when writing, structuring, or reviewing Javalin — covers app setup, handlers, routing/context, middleware, validation, error handling, testing, and deployment.

## Scenario

Use this example as a starting point when applying **javalin-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. App Setup & Wiring** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```java
Javalin app = Javalin.create(config -> {
    config.showJavalinBanner = false;
    config.http.defaultContentType = "application/json";
}).routes(() -> router(r -> {
    r.get("/users/{id}", UserController::get);
    r.post("/users", UserController::create);
})).exceptionHandler(AppException.class, (e, ctx) -> ctx.status(400).json(...));
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
