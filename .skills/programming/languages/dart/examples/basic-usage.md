# Dart Best Practices: Basic Usage

Best practices for writing Dart — the language conventions for client and server Dart code. Use when writing, structuring, or reviewing Dart — covers null safety, sound types, immutability, collections, async, classes, records/patterns, and tooling.

## Scenario

Use this example as a starting point when applying **dart-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Null Safety** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```dart
final maybe = await repo.find(id);
if (maybe == null) throw NotFoundException('user $id');
return maybe;                              // promoted to non-null
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
