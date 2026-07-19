# IntelliJ IDEA: Starter Template

A reusable starting point derived from the **2. Gradle Project Model** section of [IntelliJ IDEA](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```kotlin
// gradle/libs.versions.toml
[versions]
kotlin = "2.2"
springBoot = "3.5"
[libraries]
spring-web = { module = "org.springframework:spring-web", version.ref = "springBoot" }
kotlin-stdlib = { module = "org.jetbrains.kotlin:kotlin-stdlib", version.ref = "kotlin" }
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
