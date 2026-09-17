# Quarkus Best Practices: Basic Usage

Best practices for building Java/Kotlin services with Quarkus — the Kubernetes-native, GraalVM-friendly framework conventions. Use when writing, structuring, or reviewing Quarkus — covers platform/profile setup, CDI, REST/RESTeasy, reactive/imperative URIs, config, Panache/data, testing, and native binary builds.

## Scenario

Use this example as a starting point when applying **quarkus-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Project & Platform Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```xml
<dependencyManagement>
  <dependencies> <dependency> <groupId>io.quarkus</groupId> <artifactId>quarkus-bom</artifactId> <version>3.x</version> </dependency> </dependencies>
</dependencyManagement>
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
