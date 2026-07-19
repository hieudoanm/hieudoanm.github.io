# Implementation notes

Focused reference for **javalin-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
