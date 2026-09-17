# Dart Best Practices: 1. Null Safety

## Source guidance

This example applies the **1. Null Safety** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Non-nullable is the default** — a `String` promises it isn't null; only `String?` can be null:
- **Handle null at the boundary, promote inside** — use `if (x != null)` or `?.`/`??`, and trust promotion:
- **`??` for defaults, `?.` for chains, `??=` for lazy init**:
- **`!` is a declaration, not a fix** — use it only after a verified invariant; treat `string!` on untrusted data in review as a suspect.
- **`late` for fields initialized once deterministically** (DI, lazy caches) — never `late` + nullable to fake null safety.
- **Patterns access nullable members**: `final user?.name` unboxes; use `switch`/`if-case` patterns to destructure safely.

## Example

```dart
final String name;        // never null
final String? nick;       // may be null — handle it
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for dart-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
