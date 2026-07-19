# Micronaut Best Practices: Basic Usage

Best practices for building Java microservices with Micronaut — the compile-time AOT-oriented framework conventions. Use when writing, structuring, or reviewing Micronaut — covers annotations/wiring, routing, DI, configuration, validation, data, testing, and observability.

## Scenario

Use this example as a starting point when applying **micronaut-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Application & Bootstrapping** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```java
@Singleton
public class GreetService {
    public String greet(String name) { return "Hello, " + name; }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
