# Java Best Practices: Starter Template

A reusable starting point derived from the **2. Records, Sealed Types & Pattern Matching** section of [Java Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```java
public record Email(String value) {
    public Email {
        Objects.requireNonNull(value);
        if (!value.contains("@")) throw new IllegalArgumentException("invalid email: " + value);
    }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
