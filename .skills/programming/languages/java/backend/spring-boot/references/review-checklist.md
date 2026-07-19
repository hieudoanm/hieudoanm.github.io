# Review checklist

Focused reference for **spring-boot-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 9. Reliability & Maintainability

- **Small, focused methods**; clear intent-revealing naming; prefer immutability where possible.
- **Avoid side effects in entity constructors** — keep construction and behavior distinct.
- **Avoid premature optimization and overengineering** — explicit, simple code wins.
- **Configuration via `application.yml`, not hard-coded values** — profiles (`dev`, `test`, `prod`) explicitly.
- **Externalize secrets** — environment variables/secret store; never hardcode credentials.
- **Log at boundaries** — controller entry, integration points, errors; structured logging.

---

## 10. Testing

- **Slice tests for focus** — `@WebMvcTest(controllers = ...)` with mocked services for controller behavior:

```java
@WebMvcTest(UserController.class)
class UserControllerTest {
    @MockBean UserService userService;
    // mock service, assert HTTP status/body via MockMvc
}
```

- **`@SpringBootTest` for integration** — repository/transaction behavior with a test DB (H2/Testcontainers).
- **Test the contract** — success status/body, `400` on invalid body, `404`/`409` mappings, auth `401`/`403`.
- **Deterministic tests** — test profiles, reset DB state per suite; no live network.

---

## 11. General Rules of Thumb

- **Layers stay honest** — thin controllers, business services, thin repositories; domains never cross boundaries as entities.
- **Constructor injection** — dependencies explicit via constructor, testable without container magic.
- **Validation at the edge via Jakarta annotations; invariants in services** — fail fast, never trust input.
- **One `@ControllerAdvice`, explicit `@Transactional`, method-level security** — the declarative core of Spring Boot done right.
- **DTOs for the API; entities stay internal** — contracts stable, internals free to change.

---

## Quick-Start Checklist

- [ ] Java 17 + Spring Boot 3.x; controller/service/repository/domain layout
- [ ] Constructor injection only; no `@Autowired` fields, no static bean access, no Lombok by default
- [ ] DTO records at every API boundary; entities never exposed; no internal-ID leaks
- [ ] Jakarta validation with `@Valid` at controllers; invariants checked in services; fail fast
- [ ] `@ControllerAdvice` centralizes exception → status/body mapping; no leaked stack traces
- [ ] `@Transactional` boundaries on service methods; no long-running transactions; `readOnly = true` where apt
- [ ] Method-level security (`@PreAuthorize`); authN/authZ in Spring Security filter chain
- [ ] Config via `application.yml` + `dev`/`test`/`prod` profiles; secrets externalized
- [ ] `@WebMvcTest` controller slices + `@SpringBootTest` integration with test DB
- [ ] Contract tests cover 200/400/404/409/401/403
