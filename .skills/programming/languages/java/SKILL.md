---
name: java-best-practices
description: Idiomatic modern Java (17+) best practices covering project structure, records and sealed types, immutability, null handling, error handling, concurrency and virtual threads, composition, testing and tooling. Use when writing, structuring, or reviewing Java code.
---

# Java Best Practices

Modern Java (17, 21, and beyond) has moved decisively toward a more concise, data-focused style: `records`, sealed hierarchies, pattern matching, and virtual threads replace much of the boilerplate that defined the language for decades. "Best practice" here is about using those newer constructs to make code that is small, explicit, and honest about what can be null, what can fail, and what can change — instead of the defensive, getter-heavy Java of the past.

---

## 1. Project Structure

Build with Maven or Gradle (Kotlin DSL preferred):

```txt
myapp/
├── pom.xml                    # or build.gradle.kts
├── src/
│   ├── main/
│   │   └── java/com/example/myapp/
│   │       ├── Application.java     # thin main
│   │       ├── domain/
│   │       ├── application/
│   │       └── infrastructure/
│   └── test/
│       └── java/com/example/myapp/
└── .editorconfig
```

- **Package names: lowercase reverse-domain** (`com.example.myapp`); no `java`/`javax`/`sun` segments.
- **Layering by package**: `domain` (pure business logic, no frameworks) → `application` (use cases, services) → `infrastructure` (persistence, HTTP, config). Dependencies point inward; domain never imports infrastructure.
- **A thin `main`** — parse config/args, wire dependencies, start; business logic lives in testable classes.
- One top-level class per file (public class name = file name); keep `package-private` types for file-internal helpers.
- **Dependency injection at construction** (`new ServiceImpl(repo)` or a DI container) — dependencies visible in the constructor, no `ServiceLocator`/singleton lookups.

---

## 2. Records, Sealed Types & Pattern Matching

- **`record` for data carriers** — immutable, `equals`/`hashCode`/`toString` for free:

```java
public record User(long id, String name, Email email) {}
```

- **Compact constructors + validation in records** — validate in the compact form, keep fields `final`:

```java
public record Email(String value) {
    public Email {
        Objects.requireNonNull(value);
        if (!value.contains("@")) throw new IllegalArgumentException("invalid email: " + value);
    }
}
```

- **`sealed interface`/`sealed class` for bounded hierarchies** — the compiler enforces who may implement, and enabling exhaustive `switch`:

```java
public sealed interface HttpResult permits Ok, Err {}
public record Ok(String body) implements HttpResult {}
public record Err(int code) implements HttpResult {}
```

- **`switch` expressions + pattern matching (`instanceof` patterns) over `if/else` chains** — exhaustive, expression-valued, no fall-through:

```java
return switch (result) {
    case Ok ok -> ok.body();
    case Err err -> "error " + err.code();
};
```

- **`String`/`TextBlock` for text-heavy strings** — off-by-one quoting and whitespace are handled by the lexer.

---

## 3. Immutability & Values First

- **Prefer `final` fields and constructor initialization** — treat every mutable field as a smell that needs justification.
- **`record`/immutable value objects over mutable POJOs** — return copies or new records instead of mutating shared state.
- **Prefer `final` locals eby default** — `final` on variables and parameters makes intent explicit and data flow obvious.
- **Unmodifiable collections over mutable ones** — `List.copyOf(list)`, `Set.of(...)`, `Map.entry` builders; expose `Collections.unmodifiableList` (or `List.copyOf`) from getters instead of leaking the backing list.
- **Defensive copies at trust boundaries** — copy collections entering/leaving callers you don't control, then use immutables internally.

---

## 4. Null Handling

- **Design "non-null by default"** — JDK annotations (`@NotNull`/`@Nullable` via JSpecify/`org.jetbrains.annotations`) plus tooling (NullAway, checker-framework) give compile-time null checking without a null-checking dependency in the language.
- **`Optional` for _return values that may sensibly be absent_** — never for parameters (a null or absent param is a caller bug → fail fast), never as a field type, never as a container to run streams through.
- **`Objects.requireNonNull(value, "message")`** at boundaries where a value contract demands non-null — fails fast with a readable message.
- **Explicit null handling beats silent NPEs** — `value == null ? defaultValue : value` (`Optional.ofNullable(value).orElse(default)`) at the edge, not culture of "maybe null" in the middle.

---

## 5. Error Handling

- **Checked exceptions for recoverable, caller-must-handle conditions; unchecked for programming bugs** — don't wrap every failure in `RuntimeException` and don't throw checked exceptions just to be symmetrical.
- **Custom exception types when callers need to distinguish** — a few domain exceptions (`ConfigException`, `RetryableException`) with clear messages, not a dump of the JDK catalog.
- **`try/catch` narrowly; never `catch (Exception) {}`** — swallow nothing silently. At the top boundary, catch-and-convert to a user-visible response + log with the original cause.

```java
try {
    return parse(spec);
} catch (ParseException e) {
    throw new ConfigException("invalid spec at " + path, e);
}
```

- **`try-with-resources` for anything `AutoCloseable`** — guaranteed close, no `finally` boilerplate:

```java
try (var reader = Files.newBufferedReader(path)) { ... }
```

- **Fail fast with `Objects.requireNonNull`/`require` guards** before doing work; `assert` only for programmer invariants.

---

## 6. Concurrency & Virtual Threads

- **Prefer the executor abstraction over raw `Thread`** — submit work to an executor; never `new Thread(...).start()` in product code.
- **Virtual threads (Java 21) for IO-bound concurrency** — `Executors.newVirtualThreadPerTaskExecutor()` makes thread-per-task scale; virtual threads are cheap, so model work as _per-task_ instead of shared-pool choreography:

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> fetch(url1));
    executor.submit(() -> fetch(url2));
}
```

- **Structured Concurrency for scoped fan-out** — `StructuredTaskScope` ties subtask lifetimes to the enclosing scope and propagates cancellation like a coroutine scope:

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future<T> a = scope.fork(::loadUsers);
    Future<T> b = scope.fork(::loadPosts);
    scope.join();
    return combine(a.resultNow(), b.resultNow());
}
```

- **Share state via immutable values and proper visibility** — `volatile` for flags, `Atomic*` for counters, thread-safe collections (`ConcurrentHashMap`) — never hand-rolled `synchronized` blocks around ad-hoc state.
- **Don't hold locks across I/O or long computation** — lock granularity and ordering are the top deadlock sources; prefer per-item concurrent structures.
- **Prefer `CompletableFuture` composition over chained callbacks** (`.thenApply`/`.thenCompose`) where async pipelines are needed; watch that you handle exception paths — `.exceptionally` — explicitly.

---

## 7. Composition over Inheritance

- **`interface` over abstract class for extension points** — an interface defines a capability; a class is a single implementation:

```java
public interface Repository {
    Optional<User> findById(long id);
}
```

- **Prefer composition and delegation** — wrap a collaborator responsibly rather than subclassing to reuse; `decorator`, `adapter`, `facade` over deep class trees.
- **Prefer `final` classes by default; `instanceof` pattern matching now replaces most casts** — inheritance you don't design is inheritance you inherit for free; sealed/generics/DI cover the intended extension points.
- **Avoid mutable static state (static singletons, mutable `static` fields)** — inject via constructor polymorphism; static holders make tests order-dependent and hide dependencies.
- **Generics over raw types** — never raw `List`; `List<String>` everywhere, and `? extends T`/`? super T` only at the boundaries that need them.

---

## 8. Testing

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
