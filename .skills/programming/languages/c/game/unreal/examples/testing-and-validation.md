# Unreal Engine Best Practices: 9. Testing & Debugging

## Source guidance

This example applies the **9. Testing & Debugging** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Automation tests via `IMPLEMENT_SIMPLE_AUTOMATION_TEST`** for pure logic/components:
- **`ensure`/`check` for invariant violations; `verify` with runtime branches** — assertions are part of the shipped posture decision.

## Example

```cpp
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FHealthTest, "Gameplay.Health.ApplyDamage", EAutomationTestFlags_GameContextFilter)
bool FHealthTest::RunTest(UTestContext* Context) { /* ... */ }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for unreal-engine-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
