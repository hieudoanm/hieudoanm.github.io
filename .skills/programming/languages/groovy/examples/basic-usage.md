# Groovy Best Practices: Basic Usage

Best practices for scripting and JVM automation with Groovy — the dynamic-JVM conventions for build scripts, pipelines, and DSLs. Use when writing, structuring, or reviewing Groovy — covers typing, closures, GDK, builders, Gradle/Jenkins scripts, and integration with Java.

## Scenario

Use this example as a starting point when applying **groovy-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Typing & Style** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```groovy
String greeting(String name) {
  "Hello, ${name}!"
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
