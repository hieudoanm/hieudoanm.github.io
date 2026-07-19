# Dart Best Practices: Starter Template

A reusable starting point derived from the **8. Records, Patterns & Modern Dart** section of [Dart Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```dart
String describe(Result r) => switch (r) {
  Ok(:final value) => 'ok: $value',
  Err(:final reason) => 'err: $reason',
};
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
