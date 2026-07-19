# Helidon Best Practices: Basic Usage

Best practices for building Java microservices with Helidon — the lightweight microprofile-oriented framework conventions. Use when writing, structuring, or reviewing Helidon (helidon-se/helidon-nima and helidon-mp) — covers starting points, routing, config, CDI, reactive/Nima, errors, testing, and observability.

## Scenario

Use this example as a starting point when applying **helidon-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Starting Point (Helidon SE/Nima)** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```java
WebServer.builder()
    .addRouting(Routing.builder().get("/greet", new GreetHandler()).build())
    .build()
    .start();
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
