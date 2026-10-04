---
name: helidon-best-practices
description: Best practices for building Java microservices with Helidon — the lightweight microprofile-oriented framework conventions. Use when writing, structuring, or reviewing Helidon (helidon-se/helidon-nima and helidon-mp) — covers starting points, routing, config, CDI, reactive/Nima, errors, testing, and observability.
---

# Helidon Best Practices

Helidon offers two flavors: **`helidon-se`** (now **`helidon-nima`/virtual-thread based**; a modern, imperative `WebServer` with `Routing` builders) and **`helidon-mp`** (MicroProfile; CDI + JAX-RS conventions). Practical Helidon leans on **a `Routing` builder assembled from small `Service`/`Handler` pieces for SE, or CDI-managed resources with typed config for MP**, **`Config`/`@ConfigProperty` as the single configuration boundary**, and **structured metrics/logging/health via the built-in `Health`/`Metrics` integrations**. Use Nima unless you specifically need the MicroProfile ecosystem.

---

## 1. Starting Point (Helidon SE/Nima)

- **The default is Nima (virtual threads)** — imperative, easy-to-reason handlers over reactive complexity:

```java
WebServer.builder()
    .addRouting(Routing.builder().get("/greet", new GreetHandler()).build())
    .build()
    .start();
```

- **Handlers as small classes** implementing `Handler`:

```java
public class GreetHandler implements Handler {
    @Override
    public void handle(ServerRequest req, ServerResponse res) {
        res.send("Hello, " + req.query().first("name").orElse("world"));
    }
}
```

- **Use `io.helidon.common.context.Context`** for request-scoped state; share services via the webserver `context()`.
- **`ServerResponse.status(...)`/`.send(...)`** explicit; no auto-inference surprises.
- **For MP**: annotate resources `@Path`/`@GET`/`@Inject` with CDI; the platform wiring is conventional, not hand-rolled.

---

## 2. Routing & Structure

- **`Routing` built from composable `Service`s, each owning a route family:**

```java
Routing.builder()
    .register("/users", new UsersService())
    .register("/health", Health.of(...))
    .build();
```

- **A `Service` implements `update(Routing.Rules rules)`** — `rules.get("/{id}", handler).post("/", createHandler)`, so each service is one self-contained route table.
- **Path params via `req.path().param("id")`** — parse/validate before use.
- **Error shape uniform** — register a `ErrorHandler`/`ExceptionMapper` once and map domain exceptions to status codes in one place.

---

## 3. Configuration

- **`Config.create()`/`@ConfigProperty` is the only configuration source** — system property, env, `application.yaml` in one unified tree:

```java
@ConfigProperty(name = "app.db.url")
String dbUrl;

// or programmatic:
Config config = Config.create();
String port = config.get("app.port").asString().orElse("8080");
```

- **Typed reads** (`config.get("x").asInt().asOptional()`) at the boundary — typed and default-aware.
- **Secrets via env/system properties, never constants in code**; `@ConfigProperty` names documented.

---

## 4. Dependencies (SE) & CDI (MP)

- **SE is composition-friendly**: wire dependencies into handlers/services via constructors in the `main` bootstrap:

```java
GreetService service = new GreetService(new GreetingRepository(...));
Routing.builder().register("/greet", new GreetHandler(service)).build();
```

- **Availability in MP** `@Inject`/`@ApplicationScoped`; MP Inject/resource conventions apply.
- **No service locator metaphors in straight SE** — constructor injection, explicit wiring at the composition root.

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

- **Unit-test handlers with fake `ServerRequest`/`ServerResponse` or the in-memory `WebServer`:**

```java
try (WebServer server = server().start()) {
    HttpClient http = HttpClient.newHttpClient();
    HttpResponse<String> res = http.send(
        HttpRequest.newBuilder(server.uri().resolve("/greet?name=Ada")).GET().build(),
        HttpResponse.BodyHandlers.ofString());
    assertEquals(200, res.statusCode());
}
```

- **Service/repository boundaries mocked** with real fakes; boundary contract tested over infrastructure.
- **MP**: `helidon-microprofile-tests` `JUnit5` support for containers.
- **Contract tests against a real dependency (DB) in a container** — the mapping layer is the integration.

---

## General Rules of Thumb

- **Nima by default** — virtual threads make handler code read imperatively; reactive only when the constraint demands it.
- **Routing composed from `Service`s; `ErrorHandler` once; request-path params validated at the boundary.**
- **Config unified (`application.yaml` + env + props); typed accessor at the edge; secrets from env.**
- **Handlers/services wired by constructor in the composition root.**
- **Health + Metrics + structured logs are app contracts, not add-ons.**
- **Handler tests spin the real `WebServer`; layer tests fake the seams.**

---

## Quick-Start Checklist

- [ ] `WebServer.builder()` with `Routing` from composable `Service`s (Nima)
- [ ] Handlers small and single-purpose; `res.status`/`send` explicit
- [ ] Path params validated; errors via one `ErrorHandler`/`ExceptionMapper`
- [ ] `@ConfigProperty`/`Config.create()` sole config source; secrets from env
- [ ] Constructor wiring at the composition root; no service locator in SE
- [ ] Health + metrics + structured logging wired in the bootstrap
- [ ] In-memory webserver tests + seam fakes; contract coverage