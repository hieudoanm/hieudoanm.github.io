# Review checklist

Focused reference for **micronaut-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 8. Testing

- **`@MicronautTest` spins the full context; inject mocks/real beans:**

```java
@MicronautTest
class UserControllerTest {
    @Inject
    ObjectMapper mapper;

    @MockBean(UserService.class)
    UserService svc() { return mock(UserService.class); }
}
```

- **Service/repository tests against a real container Postgres for the mapping layer; fakes elsewhere.**
- **Contract cases**: valid, invalid, not-found, validation-failure — at the HTTP boundary and the service boundary.

---

## General Rules of Thumb

- **Constructor injection; compile-time bean resolution is the Micronaut superpower.**
- **Routes via `@Controller`; typed params with validation at the boundary.**
- **`@ConfigurationProperties` typed config; config validated at startup.**
- **Validation + exception-mapping once; fail fast before side effects.**
- **Micronaut Data derived queries; RBAC expected, N+1 avoided.**
- **Health/metrics/logging wired early; `@MicronautTest` + seam fakes.**

---

## Quick-Start Checklist

- [ ] `@Singleton`/`@RequestScope` chosen by state; constructor injection everywhere
- [ ] `@Controller` per resource; typed `@PathVariable`/`@Body` params
- [ ] `@Validation` at the request boundary; `@ExceptionHandler` mapping
- [ ] `@ConfigurationProperties` typed config; env overrides; secrets from env
- [ ] `@MicronautData` repository interfaces; `@Query` only for the complex SQL
- [ ] `@Timed`/health/metrics/trace wired; structured logging
- [ ] `@MicronautTest` + `@MockBean`; container-Postgres integration tests; contract cases
