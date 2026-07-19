# Review checklist

Focused reference for **helidon-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
