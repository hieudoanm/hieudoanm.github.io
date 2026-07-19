# Scala Best Practices: Basic Usage

Best practices for writing Scala — the language conventions for Scala 3 applications and libraries. Use when writing, structuring, or reviewing Scala — covers immutability, case classes, null safety, pattern matching, error handling, typed design, futures/concurrency, and tooling.

## Scenario

Use this example as a starting point when applying **scala-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Null Safety & Options** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```scala
for {
  user     <- repo.find(id)
  settings <- user.settings
} yield render(user, settings)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
