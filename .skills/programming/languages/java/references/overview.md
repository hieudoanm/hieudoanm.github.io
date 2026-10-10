# Overview

Focused reference for **java-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
