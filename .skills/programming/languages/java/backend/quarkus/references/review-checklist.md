# Review checklist

Focused reference for **quarkus-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
