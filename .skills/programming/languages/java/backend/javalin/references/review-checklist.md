# Review checklist

Focused reference for **javalin-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
