# Java Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **JUnit 5 (`@Test`) + AssertJ for fluent assertions** — `assertThat(result).isEqualTo(expected)` reads like a sentence; use `assertEquals`/`assertThrows` where you prefer the JDK API.
- **Table-driven tests with `@ParameterizedTest` + `@CsvSource`/`@MethodSource`** — data and expectation in one place:
- **Name tests as specifications** — `throwsNotFoundForMissingId`, `returnsActiveUsersOnly` style; long descriptive names are fine and better than numbers.
- **`@DisplayName` for readable, human labels** where the method name stays terse.

## Example

```java
@ParameterizedTest
@CsvSource({"row1,Mermaid", "row2,Hacker"})
void titleRows(String initial, String expected) { ... }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for java-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
