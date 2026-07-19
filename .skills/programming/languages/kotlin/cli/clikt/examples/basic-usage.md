# Clikt Best Practices: Basic Usage

Best practices for building command-line interfaces in Kotlin with Clikt. Use when writing, structuring, validating, or testing a Clikt CLI — covers Gradle setup, command hierarchies, options/flags/arguments, typed conversion, validation and exit codes, mutually exclusive and grouped options, prompting, testable command construction, help output, and testing, with suggested values.

## Scenario

Use this example as a starting point when applying **clikt-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Gradle Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    application
}

kotlin { jvmToolchain(21) }

dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    testImplementation(kotlin("test"))
}

application { mainClass.set("io.example.cli.MainKt") }
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
