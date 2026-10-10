# Overview

Focused reference for **csharp-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# C# Best Practices

C# is the language of the .NET platform; modern C# (12+) is concise and expressively typed (records, pattern matching, span, target-typed new). Practical C# leans on **immutability by default, null-safety enforced at compile time, exceptions for genuine failures, and async through a cancellation token that never gets dropped**. The discipline matters more than any single feature: every API boundary is a typed contract, and analyzers (`.editorconfig` + `dotnet build` warnings) are treated as part of the contract.

---

## 1. Type Design & Immutability

- **`record` for immutable data carriers** (`public record CreateUserDto(...)`); `record struct` for small value DTOs, `readonly struct` for plain immutable values:

```csharp
public readonly record struct Point(int X, int Y);
```

- **Prefer `init`-accessors and `required` over mutable setters** — an object that can't mutate after construction is cheaper to reason about and trivially thread-safe to share:

```csharp
public sealed class User
{
    public required string Email { get; init; }
    public required string Name { get; init; }
}
```

- **Choose by meaning, not habit**: `record`/`record struct` = data with value equality; `readonly struct` = tiny hot-path values (avoid boxing/structure copying); `class` = behaviour/identity with state.
- **Seal what won't be extended** (`sealed` on working classes) — inheritance is a public API decision, not a default.
- **`readonly` fields over mutable internal state**; freeze configuration and domain objects once built.

---

## 2. Null Safety

- **Enable nullable reference types** (`<Nullable>enable</Nullable>`) — every non-nullable reference is a compile-time guarantee:

```csharp
User? maybe = await repo.FindAsync(id);      // null could come back
var u = maybe ?? throw new NotFoundException($"user {id} not found");
```

- **Prefer the null-conditional/c coalescing operators** (`?.`, `??`, `??=`) over `if (x == null)` branches where intent is "give me a value".
- **The `!` operator is a declaration, not a fix** — use it only after a verified non-null invariant; treat unchecked `string!` casts in review as suspects.
- **`ArgumentNullException.ThrowIfNull(arg)`** for public parameter validation instead of hand-rolled throws; `ArgumentException.ThrowIfNullOrWhiteSpace(value)` on modern TFMs.
- **DTOs/xml/DB boundary fields still need runtime validation** — annotated types promise shape; the adaptation layer (`System.Text.Json` null handling, DB rows) must enforce it.

---

## 3. Error Handling
