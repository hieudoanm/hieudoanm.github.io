# C# Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **xUnit (or NUnit) + `flut asserts`-style equality on records**; arrange/act/assert with a blank line per phase.
- **`[Theory]`/`[InlineData]`/`[MemberData]` for contract tables** — validation cases, status-code maps, string-parsing tables:
- **Async tests are async** (`Task`/`ValueTask` returning), names read as `Method_WhenCondition_ThenResult`.
- **Isolate** — fake the seams (interfaces over mocks); in-memory/test DBs per suite; no wall-clock sleeps (virtual time).
- **Cover the contract** — success, validation failure, not-found, cancellation — at the service boundary, not branch-by-branch internals.

## Example

```csharp
[Theory]
[InlineData("ada@x.io", true)]
[InlineData("nope", false)]
public void Email_IsValidated(string candidate, bool expected) => ...
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for csharp-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
