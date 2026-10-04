---
name: javalin-best-practices
description: Best practices for building Java web APIs with Javalin — the lightweight Kotlin-originated HTTP framework conventions for Java. Use when writing, structuring, or reviewing Javalin — covers app setup, handlers, routing/context, middleware, validation, error handling, testing, and deployment.
---

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

```java
ctx.bodyValidator(new CreateRequest.class)
   .check(r -> r.name() != null, "name is required")
   .get();
```

- **`ctx.json(...)` for responses; `ctx.status(...)` explicit.**
- **No business logic in handlers** — handlers are HTTP adapters over services.

---

## 3. Middleware & Filters

- **`app.before()`/`app.after()` / `app.use()` for middleware layers:**

```java
app.before("/api/*", ctx -> {
    String token = ctx.header("Authorization");
    if (!valid(token)) { throw new UnauthorizedException("bad token"); }
});
```

- **Scoped by path filter** (`before("/api/*")`) — middleware applies to the security domain, not the whole app.
- **Order**: auth before business; logger/request-id outermost.
- **`after` for response shaping (headers, audit)**; keep middleware non-mutating where possible.

---

## 4. Validation & Errors

- **Validate at the handler entry, fail fast:**

```java
ctx.bodyValidator(UpdateRequest.class)
   .check(r -> r.email() != null, "email required")
   .check(r -> r.email().contains("@"), "invalid email")
   .check(r -> r.age() > 0, "age must be positive")
   .get();
```

- **`exceptionHandler` per exception class, registered once:**

```java
app.exceptionHandler(NotFoundException.class, (e, ctx) -> ctx.status(404).json(e.getMessage()));
```

- **Domain exceptions carry status intent** (`NotFoundException`, `BadRequestException`) — the mapping is config, not handler boilerplate.
- **Never fall through to an unhandled exception stack trace** — a `LogAndComplete` catch-all at the boundary.

---

## 5. Context & Request State

- **Request-scoped data via `ctx.attribute("key", value)`/`ctx.attribute("key")`** — middleware can enrich context (auth user, request-id):

```java
app.before(ctx -> ctx.attribute("request_id", UUID.randomUUID().toString()));
```

- **`ctx.subRouter()`/`app.routes` for mounting sub-apps** — a plugin/service exposes its own routes.
- **`ctx.req()`/`ctx.res()` escape hatches for stdlib objects** — rare, explicit, not the default path.

---

## 6. WebSockets (when needed)

- **`app.ws("/ws", ws -> ws.onConnect(ctx -> ...).onMessage(ctx -> ...))`** — typed WS events on the same Context model:

```java
app.ws("/chat", ws -> ws.onMessage(ctx -> {
    ctx.send("echo: " + ctx.message());
}));
```

- **Keep WS lifecycle listeners small** — connect/auth, message routing to a session registry, disconnect cleanup.

---

## 7. Testing

- **`Javalin.create()` in-memory + `HttpClient` (or `TestClient`)**:

```java
try (Javalin app = Javalin.create().routes(...).start()) {
    HttpClient http = HttpClient.newHttpClient();
    HttpResponse<String> res = http.send(
        HttpRequest.newBuilder(app.port().uri().resolve("/users/1")).GET().build(),
        HttpResponse.BodyHandlers.ofString());
    assertEquals(200, res.statusCode());
}
```

- **`app.port()` dynamic for CI; `before`-middleware swapped with fakes in tests.**
- **Contract tests**: valid, invalid ID, not-found, unauthorized, validation rejection.

---

## General Rules of Thumb

- **Everything flows through `Context`** — typed params/body, `json`, `status`, `attribute`.
- **Routes compose via controller classes; `before/after` scoped by path for middleware.**
- **Validate at the boundary; fail fast; exceptions → status via `exceptionHandler` once.**
- **Handlers are thin adapters over services — no domain logic in them.**
- **In-memory start + real HTTP client tests; contract covered.**

---

## Quick-Start Checklist

- [ ] `Javalin.create(config)` + fluent `routes` at the top; one controller per resource
- [ ] Typed access (`pathParamAsClass`, `bodyAsClass`, `queryParamAsClass`) at entry
- [ ] `bodyValidator`/`check` for validation; domain exceptions with status intent
- [ ] `exceptionHandler` per class, registered once; no stack traces to clients
- [ ] `before("/path/*")` auth scoped; `attribute` for request-id/user
- [ ] WS/middleware only where needed; handlers stay thin
- [ ] In-memory `Javalin.start()` tests + contract coverage