# Overview

Focused reference for **javalin-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Javalin Best Practices

Javalin is a lightweight, opinionated HTTP framework with a **handler signature `Handler(ctx)` on a single `Context`** — routing, params, JSON, WebSockets, and error handling all flow through one object. Practical Javalin leans on **`app.get/post/route(...)` builders, handler registration with `use` middleware layers, `ctx.queryParam`/`pathParam`/`bodyAsClass` typed access**, and **`exceptionHandler` mapping exceptions to responses**. Javalin's smallest surface makes "everything is a Context method" the discipline.

---

## 1. App Setup & Wiring

- **`Javalin.create()` with explicit handlers; the wiring is the app structure:**

```java
Javalin app = Javalin.create(config -> {
    config.showJavalinBanner = false;
    config.http.defaultContentType = "application/json";
}).routes(() -> router(r -> {
    r.get("/users/{id}", UserController::get);
    r.post("/users", UserController::create);
})).exceptionHandler(AppException.class, (e, ctx) -> ctx.status(400).json(...));
```

- **Fluent route registrations read top-down**; a named controller class per resource keeps the route table tidy.
- **`config` DSL for defaults (JSON, CORS, port) at creation** — one place, not scattered annotations.

---

## 2. Handlers & Context

- **`Handler` = `void handle(Context)`; everything from the `ctx`:**

```java
public static void get(Context ctx) {
    long id = ctx.pathParamAsClass("id", long.class).get();
    User user = service.find(id);
    ctx.json(user);
}
```

- **Typed access**: `ctx.pathParamAsClass`, `ctx.queryParamAsClass`, `ctx.bodyAsClass(Body.class)` — parse + validate at the boundary:
