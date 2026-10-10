# Workflow notes

Focused reference for **helidon-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
