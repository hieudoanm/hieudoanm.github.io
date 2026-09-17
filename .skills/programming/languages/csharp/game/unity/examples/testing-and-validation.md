# Unity Best Practices: 9. Testing & Code Quality

## Source guidance

This example applies the **9. Testing & Code Quality** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pure logic in `Core/` unit-tested (NUnit)** — state machines, math, save+schema, wave configs:
- **Testable seams**: components take injected services via `[SerializeField]` references or a service locator, never `FindObjectOfType`.
- **PlayMode tests for the flow glue** (spawns, events, scene transitions) — a couple, not a zoo.
- **Deterministic seeds for RNG-driven content; saves versioned and forward-compatible.**

## Example

```csharp
[Test]
public void AddScore_GreaterThanBest_RaisesBest() { /* Core.GameState */ }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for unity-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
