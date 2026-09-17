# Review checklist

Focused reference for **csharp-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
