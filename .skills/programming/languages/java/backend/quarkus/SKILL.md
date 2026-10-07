---
name: quarkus-best-practices
description: Best practices for building Java/Kotlin services with Quarkus — the Kubernetes-native, GraalVM-friendly framework conventions. Use when writing, structuring, or reviewing Quarkus — covers platform/profile setup, CDI, REST/RESTeasy, reactive/imperative URIs, config, Panache/data, testing, and native binary builds.
---

# Quarkus Best Practices

Quarkus is a Kubernetes-native Java framework optimized for **GraalVM native images and fast startup**, with **JAX-RS/CDI-like standards under a reactive core** (`Mutiny`, `Vert.x`). Practical Quarkus leans on **`@QuarkusTest` for testing, `@ApplicationScoped` CDI beans, `REST` resources with `Panache`/Hibernate for data**, and **clean config via `application.properties` + env mapping**. Dev-first: `quarkus dev` restarts instantly, and native builds are the deployment contract.

---

## 1. Project & Platform Setup

- **`quarkus create app` with the parent `quarkus-bom` pinned**; extensions from the platform catalog, not ad-hoc deps:

```xml
<dependencyManagement>
  <dependencies> <dependency> <groupId>io.quarkus</groupId> <artifactId>quarkus-bom</artifactId> <version>3.x</version> </dependency> </dependencies>
</dependencyManagement>
```

- **Pick extensions deliberately** (`quarkus-hibernate-orm-panache`, `quarkus-resteasy-reactive`, `quarkus-smallrye-health`) — the extension catalog IS the architecture.
- **Profiles** (`-Dquarkus.profile=dev`/`prod`) via `%dev.`/`%prod.` properties — test/config bounding, not code forks.
- **`quarkus dev` is the day-to-day** — Hot reload, REST responses; CI runs `quarkus build` (JVM) + `quarkus build -Dnative`.

---

## 2. Dependency Injection (ArC)

- **CDI beans with `@ApplicationScoped`/`@Singleton` chosen by state; constructor injection:**

```java
@ApplicationScoped
public class GreetService { ... }
```

- **`@Inject` on fields is allowed but constructor injection reads better** for beans that need them:

```java
@Path("/greet")
public class GreetResource {
    private final GreetService service;
    GreetResource(GreetService service) { this.service = service; }
    @GET public String greet(@QueryParam("name") String name) { return service.greet(name); }
}
```

- **No servlet-style lifecycle coupling** — beans are plain CDI; resources are plain resources.
- **Mocking in tests uses `@InjectMock`/`Mockito`; `@Startup` for eager init beans only.**

---

## 3. REST Resources

- **JAX-RS-ish `@Path`/`@GET`/`@POST` on `resteasy-reactive` — small controllers, one route family each:**

```java
@Path("/users")
public class UserResource {
    @GET
    @Path("/{id}")
    public User get(@PathParam("id") long id) {
        return service.find(id);
    }
    @POST
    public User create(@Valid CreateUser body) { ... }
}
```

- **Reactive `Uni<T>`/`Multi<T>` or imperative returns** — pick per endpoint; a REST boundary with blocking I/O under a reactive stack declares it (`@Blocking` when needed):

```java
@GET @Blocking public Uni<User> heavy() { ... }
```

- **`@Valid`/Bean Validation at the boundary** — fail-fast before services.
- **JSON via Jackson/JSON-B configured once** — no per-route serializer ceremonies.

---

## 4. Configuration & Secrets

- **`application.properties` is the tree; env maps the same keys** (`OME_DB_URL` → `quarkus.datasource.jdbc.url` style):

```properties
%dev.quarkus.datasource.jdbc.url=jdbc:postgresql://localhost/db
quarkus.datasource.jdbc.url=${OME_DB_URL}
```

- **Typed config via `@ConfigProperty`/`@ConfigMapping`** — `@ConfigMapping` for grouped, immutable settings:

```java
@ConfigMapping(prefix = "app")
interface AppConfig { String dbUrl(); int retries(); }
```

- **Secrets via env/`Helidon`-style layer, never constants**; native builds bake config — env overrides still apply.

---

## 5. Data Access (Panache)

- **Panache entity/repository = minimal boilerplate; the mapping layer stays thin:**

```java
@Entity
public class User extends PanacheEntity {
    public String email;
    public boolean active;
}

var users = User.list("active", true);
```

- **Repository form for imperfectly-shaped data** (`@ApplicationScoped class UserRepository implements PanacheRepository<User>`).
- **Queries with `Order`/`firstResult`/`range` pagination** — never load-all + slice.
- **N+1 avoided** (`@Query` fetch joins); `@Transaction` only for the true multi-write invariants.
- **`Fluent`/HQL typed queries for the complex cases** — Panache is not a reason to write stringly SQL.

---

## 6. Reactive & Messaging

- **Mutiny `Uni`/`Multi` for genuinely non-blocking paths; Vert.x clients for I/O:**
- Prefer the imperative layers until a measured queue/event source demands reactive — reactive has a real cognitive cost.
- **`smallrye-reactive-messaging` for Kafka/MQTT/AMQP** — the connector config is the contract; dead-letter/retry policy configured, not guessed.
- **Async correctness** — VM concurrency pitfalls noted; futures/callbacks bound, no silent thread-leak.

---

## 7. Observability

- **`smallrye-health` (`/q/health`), metrics (`/q/metrics`), tracing (`/q/trace`) come from extensions** — the `/q/` base path is the ops contract:

```yaml
quarkus:
  smallrye-health:
    root-path: "health"
```

- **Structured logging** (`quarkus.log.category`) with correlation IDs where feasible; no `System.out`.

---

## 8. Testing & Native

- **`@QuarkusTest` boots the app in-process — real HTTP, real config:**

```java
@QuarkusTest
class UserResourceTest {
    @Test void find_by_id() {
        given().when().get("/users/1").then().statusCode(200);
    }
}
```

- **`@TestHTTPResource`/test HTTP client; `@InjectMock` for seams; `panache test` with a test database.**
- **Native-image contract**: `quarkus build -Dnative` produces a binary the CI actually runs — tests against the native artifact, not just the JVM:
  - GraalVM reachability (reflection) surprises surface only in native — assert the native profile in CI.
- **Contract cases** at HTTP + service boundaries: valid, invalid, not-found, validation-failure.

---

## General Rules of Thumb

- **Extensions = architecture; the platform is the dependency policy.**
- **Constructor-injected CDI beans; small resource classes; validation at the boundary.**
- **Config via `application.properties` + env; `@ConfigMapping` for typed grouped settings; secrets never in code.**
- **Panache for CRUD; complex queries explicit `@Query`; pagination in SQL.**
- **`QuarkusTest`-driven development; native build is the deployable contract.**
- **Health/metrics/tracing wired once; reactive only where the profile demands it.**

---

## Quick-Start Checklist

- [ ] Parent `quarkus-bom`; extensions only; profiles (`%dev.`/`%prod.`) for config
- [ ] CDI beans by state; constructor injection; `@Startup` only for eager init
- [ ] JAX-RS resource classes; `@Valid` at the boundary; block/reactive deliberate
- [ ] `application.properties` + env; `@ConfigMapping` typed; secrets via env
- [ ] Panache list/find with SQL pagination; `@Query` for the complex cases
- [ ] `smallrye-health`/metrics/tracing wired; structured logging
- [ ] `@QuarkusTest` suites; native artifact tested in CI; contract coverage