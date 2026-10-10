# Overview

Focused reference for **quarkus-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
