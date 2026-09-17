# IntelliJ IDEA: Basic Usage

Best practices for IntelliJ IDEA — the unified free and paid tiers, Gradle as the project model, the Kotlin/Java tooling chain, AI Assistant and Junie, code cleanup, and JetBrains shared conventions. Use when setting up, debugging, or refactoring a JVM project in IntelliJ IDEA.

## Scenario

Use this example as a starting point when applying **intellij-idea-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Gradle Project Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```kotlin
// gradle/libs.versions.toml
[versions]
kotlin = "2.2"
springBoot = "3.5"
[libraries]
spring-web = { module = "org.springframework:spring-web", version.ref = "springBoot" }
kotlin-stdlib = { module = "org.jetbrains.kotlin:kotlin-stdlib", version.ref = "kotlin" }
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
