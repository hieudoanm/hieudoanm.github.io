# Review checklist

Focused reference for **java-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **JUnit 5 (`@Test`) + AssertJ for fluent assertions** — `assertThat(result).isEqualTo(expected)` reads like a sentence; use `assertEquals`/`assertThrows` where you prefer the JDK API.
- **Table-driven tests with `@ParameterizedTest` + `@CsvSource`/`@MethodSource`** — data and expectation in one place:

```java
@ParameterizedTest
@CsvSource({"row1,Mermaid", "row2,Hacker"})
void titleRows(String initial, String expected) { ... }
```

- **Name tests as specifications** — `throwsNotFoundForMissingId`, `returnsActiveUsersOnly` style; long descriptive names are fine and better than numbers.
- **`@DisplayName` for readable, human labels** where the method name stays terse.
- **Mock the boundaries, not internals** — Mockito/heavy mocking at the seams (HTTP client, clock, DB); test behaviour and outcomes on real logic.
- **Test isolation** — each test builds its own fixtures; no shared mutable static state to reset. Use `@BeforeEach` over `@BeforeAll` for per-test setup.

---

## 9. Tooling (Non-negotiable)

- **Maven or Gradle as the build** — a single wrapper (`mvnw`/`gradlew`) committed so environments build identically.
- **Formatting & static analysis in CI**: `spotless`/`checkstyle` for formatting, `PMD`/`spotbugs`/`errorprone` for static analysis — deny warnings, not report them.
- **`mvn test`/`gradle test` gate the pipeline**; run `test` with `--fail-fast`-ish settings locally and treat CI failures as release blockers.
- **JaCoCo for coverage** on domain/application logic — meaningful coverage over line-count vanity on wiring.
- **Pin the toolchain** (`.tool-versions`/CI matrix on a JDK LTS) and compile with `-Werror`-style strictness where supported (`(parameter|rawtypes|unused...)` warnings fatal in CI).

---

## 10. General Rules of Thumb

- **Modern constructs over ceremony** — `record` over getter-POJO, `switch` pattern matching over `if instanceof`, text blocks over escaped strings.
- **Explicit over over-engineered** — a plain `record` + small class beats a framework-annotated one for most code; add abstraction only when it removes real duplication.
- **Dependency injection via constructors, explicit lifecycles** — no `ServiceLocator`, no static singletons hidden by `static` holders.
- **Fail fast, fail loudly** — requireNonNull and validation at boundaries, logs with causes at the top, never silent suppression.
- **Keep functions/classes small and single-purpose** — if a method needs a paragraph, split it; if a class needs "real" inheritance, prefer composition.
- **Consistent style**: `spotless` removes style debates entirely — the formatter is the style guide.

---

## Quick-Start Checklist

- [ ] `record` for data carriers; `sealed interface` + exhaustive `switch` for hierarchies
- [ ] Immutable `final` fields, unmodifiable collections exposed from getters
- [ ] `Optional` only for absent-may-be-valid return values; `Objects.requireNonNull` at boundaries
- [ ] Narrow `try/catch`; `try-with-resources` for `AutoCloseable`; no silent `catch {}`
- [ ] Executors/virtual threads over raw `Thread`; no `synchronized` over I/O
- [ ] Structured task scopes for fan-out concurrency
- [ ] Constructor injection — no static singletons or mutable static state
- [ ] Interfaces + composition over class inheritance; no raw types
- [ ] JUnit 5 + AssertJ; `@ParameterizedTest` tables; tests named as specifications
- [ ] Spotless/checkstyle/Bug warnings-denied in CI
- [ ] JDK toolchain pinned to a supported LTS
