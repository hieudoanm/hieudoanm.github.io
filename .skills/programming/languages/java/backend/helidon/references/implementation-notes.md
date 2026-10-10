# Implementation notes

Focused reference for **helidon-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Errors & Validation

- **Validate at the boundary; map to `400`/`404`** explicitly:

```java
res.status(Http.Status.BAD_REQUEST_400).send("invalid id");
```

- **`ExceptionMapper`/`ErrorHandler` for the rest** — a domain exception becomes an HTTP response in one place.
- **Log + render**: internal detail goes to logs (structured); a safe, generic message to the client.
- **Failures are not thrown from every handler layer** — a handler that returns early with a status is the readable path.

---

## 6. Observability

- **`Health.check()`/`Metrics` integrated** — wire `/health` and `/metrics` early; the operators' contract is part of the app:

```java
RegisterHealthService(Health.of(HealthCheck.create("db", () -> checkDb())));
```

- **Structured logging via `JUL`-backed Helidon logging or `slf4j`** — IDs/routing recorded, never `System.out`.
- **Request-level metrics** wired for latency/error/saturation — a service without `/metrics` is unobservable.
- **TraceId/correlation propagated** (Helidon tracing) so logs ↔ traces link.

---

## 7. Testing
