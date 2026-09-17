# Java Best Practices: Basic Usage

Idiomatic modern Java (17+) best practices covering project structure, records and sealed types, immutability, null handling, error handling, concurrency and virtual threads, composition, testing and tooling. Use when writing, structuring, or reviewing Java code.

## Scenario

Use this example as a starting point when applying **java-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Records, Sealed Types & Pattern Matching** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```java
public record Email(String value) {
    public Email {
        Objects.requireNonNull(value);
        if (!value.contains("@")) throw new IllegalArgumentException("invalid email: " + value);
    }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
