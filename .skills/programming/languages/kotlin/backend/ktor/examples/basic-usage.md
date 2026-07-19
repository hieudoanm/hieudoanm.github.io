# Ktor Backend Best Practices: Basic Usage

Best practices for building HTTP APIs with Ktor (Kotlin). Use when creating, structuring, or reviewing a Ktor app — covers routing, plugins, coroutines, serialization, error handling, authentication, and testing.

## Scenario

Use this example as a starting point when applying **ktor-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```kotlin
// build plugin
implementation("io.ktor:ktor-server-core-jvm")
implementation("io.ktor:ktor-server-netty-jvm")
implementation("io.ktor:ktor-serialization-kotlinx-json-jvm")
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
