# Workflow notes

Focused reference for **java-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
