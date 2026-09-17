# Mordant Best Practices: Basic Usage

Best practices for building interactive terminal UIs in Kotlin with Mordant. Use when writing, structuring, or debugging a Mordant TUI — covers Gradle setup, terminal and ANSI capability detection, colors and styled output, widgets, raw mode and keyboard input, cursor and screen control, event loops, responsive layout, line endings, and testing with a terminal recorder, with suggested values.

## Scenario

Use this example as a starting point when applying **mordant-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Gradle Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    application
}

kotlin { jvmToolchain(21) }

dependencies {
    implementation("com.github.ajalt.mordant:mordant:3.1.0")
    testImplementation(kotlin("test"))
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
