# Flutter Best Practices: Starter Template

A reusable starting point derived from the **6. Async, Data & Lifecycle** section of [Flutter Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```dart
FutureBuilder<User>(
  future: userFuture,
  builder: (context, snap) => switch (snap) {
    AsyncSnapshot(:final data?) => UserView(user: data),
    AsyncSnapshot(hasError: true) => ErrorView(error: snap.error!),
    _ => const LoadingBar(),
  },
)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
