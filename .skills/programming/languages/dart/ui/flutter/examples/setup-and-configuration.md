# Flutter Best Practices: 2. State Management

## Source guidance

This example applies the **2. State Management** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pick scope by need** — local ephemeral (`setState`), shareable (`ChangeNotifier`/`Provider`/`Riverpod`), app-level (scoped providers), server state (repos + streams):
- **Own the lifecycle precisely** — `ListenableBuilder`/`context.watch<T>` subscribe; avoid leaking subscriptions with `addListener` without `removeListener`.
- **`BuildContext` reads (`Provider.of`) declared at the top of `build`**, never inside nested callbacks/builders.
- **No global/singleton mutable app state** — explicit provider scopes per feature; tests inject fakes at the boundary.

## Example

```dart
class Counter extends ChangeNotifier {
  int _value = 0;
  int get value => _value;
  void increment() { _value++; notifyListeners(); }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for flutter-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
