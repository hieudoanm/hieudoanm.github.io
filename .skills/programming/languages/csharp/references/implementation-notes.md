# Implementation notes

Focused reference for **csharp-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```csharp
private readonly object _gate = new();
private Dictionary<string, int> _cache = new();

public int GetOrAdd(string key, int value)
{
    lock (_gate)
    {
        if (_cache.TryGetValue(key, out var hit)) return hit;
        _cache[key] = value;
        return value;
    }
}
```

- **`ConcurrentDictionary`/`Interlocked`/`Channel<T>` before hand-rolled locking or exotics** — for read-heavy caches, producer/consumer pipelines.
- **Never lock across `await`** — holding a lock during I/O serializes the process; break work into small sync critical sections or use `SemaphoreSlim`.
- **Tasks shouldn't die silently** — attach continuation for observation or use `Task.Run` with a try/catch inside; an unobserved exception is a latent bug.

---

## 7. Strings & Culture

- **Ordinal comparisons by default**; culture-aware only explicitly:

```csharp
if (name.Equals("admin", StringComparison.OrdinalIgnoreCase)) ...
```

- **Interpolated strings over `string.Format`** — `$"{a} {b}"` — and **`FormattableString.Invariant(...)`** when the value must be culture-stable (APIs, keys).
- **`string.Join`/`StringBuilder` over `+` in loops**; avoid per-iteration allocation in hot paths (see `Span`).
- **`int.TryParse`/`Guid.TryParse` for untrusted input** — parse methods don't throw on bad data.

---

## 8. Modern C# Patterns

- **File-scoped namespaces** (`namespace Api.Users;`) — one brace less, one convention.
- **Primary constructors on records and classes** — parameters that flow to properties/DI; keep constructor params exclusively for initialization.
- **Pattern matching as the default dispatch** — `switch` expressions, property/list patterns, type patterns over stringly if-chains:

```csharp
public string Describe(Payment p) => p switch
{
    { Kind: PaymentKind.Card, Verified: true } when p.Amount > 0 => "valid card",
    { Kind: PaymentKind.Card } => "card requires verification",
    _ => "unknown",
};
```

- **Target-typed `new` (`Point p = new(1, 2)`), collection expressions (`[1, 2, 3]`)** for allocation-light readable construction.
- **Prefer `DateTimeOffset` over `DateTime`** for instants — the offset is business data; use UTC for storage.

---

## 9. Classes & Dependency Injection

- **Constructor injection for all collaborators**; register in the composition root (see `dotnet.md` DI):

```csharp
public sealed class UsersService(IUserRepository repo)
{
    // repo used across methods — no new Xxx(), no static ServiceLocator
}
```
