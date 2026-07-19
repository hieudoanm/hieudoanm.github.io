# Overview

Focused reference for **helidon-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
