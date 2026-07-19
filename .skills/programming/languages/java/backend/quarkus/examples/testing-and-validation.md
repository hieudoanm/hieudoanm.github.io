# Quarkus Best Practices: 8. Testing & Native

## Source guidance

This example applies the **8. Testing & Native** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`@QuarkusTest` boots the app in-process — real HTTP, real config:**
- **`@TestHTTPResource`/test HTTP client; `@InjectMock` for seams; `panache test` with a test database.**
- **Native-image contract**: `quarkus build -Dnative` produces a binary the CI actually runs — tests against the native artifact, not just the JVM:
- GraalVM reachability (reflection) surprises surface only in native — assert the native profile in CI.
- **Contract cases** at HTTP + service boundaries: valid, invalid, not-found, validation-failure.

## Example

```java
@QuarkusTest
class UserResourceTest {
    @Test void find_by_id() {
        given().when().get("/users/1").then().statusCode(200);
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for quarkus-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
