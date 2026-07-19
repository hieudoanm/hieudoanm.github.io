# C# Best Practices: Workflow Checklist

A practical run sheet for applying [C# Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Type Design & Immutability: **record for immutable data carriers** (public record CreateUserDto(...)); record struct for small value DTOs, readonly struct for plain immutable values:
- [ ] 1. Type Design & Immutability: **Prefer init-accessors and required over mutable setters** — an object that can't mutate after construction is cheaper to reason about and trivially thread-safe to share:
- [ ] 2. Null Safety: **Enable nullable reference types** (<Nullable>enable</Nullable>) — every non-nullable reference is a compile-time guarantee:
- [ ] 2. Null Safety: **Prefer the null-conditional/c coalescing operators** (?., ??, ??=) over if (x == null) branches where intent is "give me a value"
- [ ] 3. Error Handling: **Exceptions for genuine failures** (I/O, invariants, programming errors); **Result types for expected domain outcomes** where "no user", "already exists" are business cases — and keep the choice explicit and consistent per assembly
- [ ] 3. Error Handling: **Throw the specific type**: NotFoundException, InvalidOperationException, ArgumentOutOfRangeException — matching exception type to meaning beats a generic Exception with a different message
- [ ] 4. Async Discipline: **async/await down not up** — I/O is async end-to-end; never .Result/.Wait() (deadlock + thread-pool starvation), never fire-and-forget async void except event handlers
- [ ] 4. Async Discipline: **Flow the CancellationToken through every async call** (especially DB/HTTP) — a dropped token is an un-cancelable request; accept it as a parameter and pass it
- [ ] 5. Collections & LINQ: **Expose IReadOnlyList<T>/IReadOnlyCollection<T> (never raw List<T>) at boundaries** — the consumer can read, the producer keeps the mutation right
- [ ] 5. Collections & LINQ: **Defensive copies at API edges** — ToImmutableArray()/ToImmutableDictionary() when handing data out of a class that mutates internally

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
