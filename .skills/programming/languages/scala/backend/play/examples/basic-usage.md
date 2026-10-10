# Play Framework Backend Best Practices: Basic Usage

Best practices for building HTTP APIs with the Play Framework (Scala). Use when creating, structuring, or reviewing a Play app — covers controllers, services, async boundaries, JSON, dependency injection, and testing.

## Scenario

Use this example as a starting point when applying **play-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```scala
// build.sbt
libraryDependencies ++= Seq(
  ws,
  "com.typesafe.play" %% "play-json" % playVersion,
  "com.typesafe.slick" %% "slick" % slickVersion
)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
