# Micronaut Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`@MicronautTest` spins the full context; inject mocks/real beans:**
- **Service/repository tests against a real container Postgres for the mapping layer; fakes elsewhere.**
- **Contract cases**: valid, invalid, not-found, validation-failure — at the HTTP boundary and the service boundary.

## Example

```java
@MicronautTest
class UserControllerTest {
    @Inject
    ObjectMapper mapper;

    @MockBean(UserService.class)
    UserService svc() { return mock(UserService.class); }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for micronaut-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
