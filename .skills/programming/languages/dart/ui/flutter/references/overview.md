# Overview

Focused reference for **flutter-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Flutter Best Practices

Flutter builds UI from **widgets**, and state is the texture of every screen. Practical Flutter leans on **small stateless leaves, predictable state ownership** (`StatefulWidget` + inherited/`Provider`/`Riverpod` scopes), and **`BuildContext`-bounded async** so errors close the UI instead of crash it. The `flutter analyze` gate plus a `flutter test` suite round out the review ritual.

---

## 1. Widget Composition

- **Compose small widgets over big ones** — extract `const`-capable leaves; a `build()` under ~40 lines with a single responsibility:

```dart
class UserAvatar extends StatelessWidget {
  const UserAvatar({super.key, required this.user});
  final User user;
  @override
  Widget build(BuildContext context) => CircleAvatar(child: Text(user.initials));
}
```

- **Prefer `StatelessWidget` default; `StatefulWidget` only when state truly lives in the view** — hoist domain state out.
- **`const` constructors everywhere statically possible** — cheap rebuilds, `identical`-favored comparisons.
- **Extract behaviors into shared widgets** (`Card`, `EmptyState`, `ErrorView`) rather than repeating stacks of primitives.
- **Name widgets by their contract** (`UserCard`, `LoadingState`, `ErrorView`) so the tree reads as a screen map.

---

## 2. State Management

- **Pick scope by need** — local ephemeral (`setState`), shareable (`ChangeNotifier`/`Provider`/`Riverpod`), app-level (scoped providers), server state (repos + streams):

```dart
class Counter extends ChangeNotifier {
  int _value = 0;
  int get value => _value;
  void increment() { _value++; notifyListeners(); }
}
```

- **Own the lifecycle precisely** — `ListenableBuilder`/`context.watch<T>` subscribe; avoid leaking subscriptions with `addListener` without `removeListener`.
- **`BuildContext` reads (`Provider.of`) declared at the top of `build`**, never inside nested callbacks/builders.
- **No global/singleton mutable app state** — explicit provider scopes per feature; tests inject fakes at the boundary.
- **Keep views dumb** — a widget renders state and forwards intent to a controller/repo; business logic lives in services.

---

## 3. Layout
