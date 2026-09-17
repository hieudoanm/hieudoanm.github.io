# C# Best Practices: 3. Error Handling

## Source guidance

This example applies the **3. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Exceptions for genuine failures** (I/O, invariants, programming errors); **Result types for expected domain outcomes** where "no user", "already exists" are business cases — and keep the choice explicit and consistent per assembly.
- **Throw the specific type**: `NotFoundException`, `InvalidOperationException`, `ArgumentOutOfRangeException` — matching exception type to meaning beats a generic `Exception` with a different message.
- **Catch narrowly and rethrow correctly** — `catch (SqlException ex)` around the DB call, `catch { throw; }` (never `throw ex;`, which resets the stack) for wrapper layers.

## Example

```csharp
public sealed record Exists(bool Ok, User? Value, string? Reason);

public async Task<Exists> FindAsync(Guid id) => /* expected-miss path, no throw */
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for csharp-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
