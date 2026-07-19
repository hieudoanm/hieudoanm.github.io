# Workflow notes

Focused reference for **csharp-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
