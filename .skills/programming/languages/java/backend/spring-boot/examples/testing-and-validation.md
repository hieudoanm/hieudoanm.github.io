# Spring Boot Backend Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Slice tests for focus** — `@WebMvcTest(controllers = ...)` with mocked services for controller behavior:
- **`@SpringBootTest` for integration** — repository/transaction behavior with a test DB (H2/Testcontainers).
- **Test the contract** — success status/body, `400` on invalid body, `404`/`409` mappings, auth `401`/`403`.
- **Deterministic tests** — test profiles, reset DB state per suite; no live network.

## Example

```java
@WebMvcTest(UserController.class)
class UserControllerTest {
    @MockBean UserService userService;
    // mock service, assert HTTP status/body via MockMvc
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for spring-boot-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
