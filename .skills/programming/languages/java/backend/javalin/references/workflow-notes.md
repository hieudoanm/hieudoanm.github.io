# Workflow notes

Focused reference for **javalin-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
