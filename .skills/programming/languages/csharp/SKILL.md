---
name: csharp-best-practices
description: Best practices for writing C# — the language conventions for .NET code. Use when writing, structuring, or reviewing C# code — covers type design, null safety, error handling, async discipline, collections, concurrency, diagnostics, and tooling.
---

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

- **Exceptions for genuine failures** (I/O, invariants, programming errors); **Result types for expected domain outcomes** where "no user", "already exists" are business cases — and keep the choice explicit and consistent per assembly.

```csharp
public sealed record Exists(bool Ok, User? Value, string? Reason);

public async Task<Exists> FindAsync(Guid id) => /* expected-miss path, no throw */
```

- **Throw the specific type**: `NotFoundException`, `InvalidOperationException`, `ArgumentOutOfRangeException` — matching exception type to meaning beats a generic `Exception` with a different message.
- **Catch narrowly and rethrow correctly** — `catch (SqlException ex)` around the DB call, `catch { throw; }` (never `throw ex;`, which resets the stack) for wrapper layers.
- **Never swallow** — an empty `catch` that hides the cause is the #1 production bug; log and rethrow or convert with cause attached.
- **Validate first (fail fast), mutate after** — put every `ArgumentNull`/range/state check at the top of a method before touching anything.

---

## 4. Async Discipline

- **`async/await` down not up** — I/O is async end-to-end; never `.Result`/`.Wait()` (deadlock + thread-pool starvation), never fire-and-forget `async void` except event handlers.

```csharp
public async Task<User> GetAsync(Guid id, CancellationToken ct)
{
    await using var db = _factory.CreateDbContext();
    return await db.Users.AsNoTracking().FirstAsync(x => x.Id == id, ct);
}
```

- **Flow the `CancellationToken` through every async call** (especially DB/HTTP) — a dropped token is an un-cancelable request; accept it as a parameter and pass it.
- **`Task.WhenAll`/`WhenAny` for parallelism**; batch independent I/O instead of awaiting sequentially.
- **`IAsyncEnumerable<T>`** for paginated/streaming reads (`await foreach`) — don't buffer unbounded sequences into `List<T>`.
- **`ValueTask` for hot paths (≥100k ops/sec)** where the result is usually synchronous; `Task` everywhere else — ValueTask's single-await constraint is the tax.
- **`ConfigureAwait(false)`** on library code so continuations don't needlessly capture the ambient context (Blazor/UI-dependent code omitted).

---

## 5. Collections & LINQ

- **Expose `IReadOnlyList<T>`/`IReadOnlyCollection<T>` (never raw `List<T>`) at boundaries** — the consumer can read, the producer keeps the mutation right.
- **Defensive copies at API edges** — `ToImmutableArray()`/`ToImmutableDictionary()` when handing data out of a class that mutates internally.
- **LINQ is lazy — materialize deliberately** (`ToList`, `ToArray`, `ToDictionary`):

```csharp
var list = query.ToList();        // now it's a snapshot, safe to cache
```

- **Method-chain LINQ over query syntax** for readability; use composable pipeline style (`Where`→`Select`→`OrderBy`) consistent with the codebase.
- **Prefer `Span<T>`/`Memory<T>` for hot parsing/serialization paths** (avoid allocations); every string concat in a loop is a `StringBuilder` (or `string.Join` first).
- **Name collection locals in plural** and avoid `var` where it hides the sequence type (`IEnumerable` vs list materially changes behaviour).

---

## 6. Concurrency

- **Start with async, not threads** — most "concurrency" is I/O; async/await scales it. `lock` only guards short critical sections that mutate shared state.

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

- **Program to interfaces at seams** (`IUserRepository`, `IHttpClientFactory`) so tests can substitute fakes.
- **No mutable static state** for configuration/caches — it's test-hostile and threading-hostile.
- **`IDisposable`/`IAsyncDisposable` for resource ownership** — hold resources short, dispose deterministically (`using`/`await using`), not rely on finalizers.

---

## 10. Testing

- **xUnit (or NUnit) + `flut asserts`-style equality on records**; arrange/act/assert with a blank line per phase.
- **`[Theory]`/`[InlineData]`/`[MemberData]` for contract tables** — validation cases, status-code maps, string-parsing tables:

```csharp
[Theory]
[InlineData("ada@x.io", true)]
[InlineData("nope", false)]
public void Email_IsValidated(string candidate, bool expected) => ...
```

- **Async tests are async** (`Task`/`ValueTask` returning), names read as `Method_WhenCondition_ThenResult`.
- **Isolate** — fake the seams (interfaces over mocks); in-memory/test DBs per suite; no wall-clock sleeps (virtual time).
- **Cover the contract** — success, validation failure, not-found, cancellation — at the service boundary, not branch-by-branch internals.

---

## 11. Tooling & Diagnostics

- **Analyzers as CI gate** — `<AnalysisLevel>latest</AnalysisLevel>`, `TreatWarningsAsErrors` (or at least nullable warnings) — see `dotnet.md` §1.
- **`dotnet format --verify-no-changes`** in CI; a consistent `.editorconfig` in the repo root is the style contract.
- **`global.json` pins the SDK** — reproducible builds across machines; the pipeline matches what devs run.
- **Run `dotnet build` + `dotnet test` before finishing work**; the compiler and analyzers are the cheapest reviewers you have.

---

## General Rules of Thumb

- **Make invalid states unrepresentable** — `record struct`s, discriminated unions and pattern matching beat "0 means unset" oro-checkboxstringly booleans.
- **Compile-time guarantees over runtime checks** — nullable annotations, readonly collection types, sealed.
- **Immutable by default, mutate explicitly** — the happy path is a valueless value you assemble once.
- **Async end-to-end with a token that flows** — cancellation is part of the signature, not an afterthought.
- **Exceptions for failures, Results for expected outcomes** — pick once, consistently.
- **Analyzers + `dotnet test` are part of "done"** — not a lint step to run before merge.

---

## Quick-Start Checklist

- [ ] `record`/`readonly record struct` for DTOs; `init`/`required` over mutable setters; classes sealed by default
- [ ] Nullable reference types enabled; `?.`/`??` over null `if`s; `!` only on verified invariants
- [ ] Specific exception types; domain `Result`/`Exists` for expected misses; no swallowed catches
- [ ] Async end-to-end; `CancellationToken` flows through every async signature
- [ ] `IReadOnly*` at boundaries; LINQ materialized deliberately; `async IAsyncEnumerable` for streams
- [ ] `lock` only short sync critical sections; `ConcurrentDictionary`/`Interlocked`/`Channel` first
- [ ] Ordinal string comparisons; `DateTimeOffset` over `DateTime`; try-parse for untrusted input
- [ ] File-scoped namespaces, primary constructors, switch expressions, target-typed `new`
- [ ] Constructor DI at seams; no static mutable config; `using`/`await using` for resources
- [ ] xUnit `[Theory]` contract tests; `dotnet build` analyzers as a CI gate
