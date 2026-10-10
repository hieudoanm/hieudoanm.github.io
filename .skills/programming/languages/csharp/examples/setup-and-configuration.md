# C# Best Practices: 1. Type Design & Immutability

## Source guidance

This example applies the **1. Type Design & Immutability** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`record` for immutable data carriers** (`public record CreateUserDto(...)`); `record struct` for small value DTOs, `readonly struct` for plain immutable values:
- **Prefer `init`-accessors and `required` over mutable setters** — an object that can't mutate after construction is cheaper to reason about and trivially thread-safe to share:
- **Choose by meaning, not habit**: `record`/`record struct` = data with value equality; `readonly struct` = tiny hot-path values (avoid boxing/structure copying); `class` = behaviour/identity with state.

## Example

```csharp
public readonly record struct Point(int X, int Y);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for csharp-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
