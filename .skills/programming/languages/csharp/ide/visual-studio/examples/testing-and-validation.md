# Visual Studio: 7. Testing

## Scenario

A project is working on **7. testing** for Visual Studio. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Use the IDE test runner for the inner loop, `dotnet test` for everything else.** The runner is genuinely better for stepping through a single failing test; it is not a substitute for a headless run.
- **`xUnit` v3 or NUnit v4 with `Microsoft.NET.Test.Sdk`;** MSTest is supported and maintained but has a smaller ecosystem in new projects.
- **Coverlet or the built-in `CollectCoverage` in the SDK** for coverage. Report coverage in CI, not in the IDE run.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **7. Testing** section of [SKILL.md](../SKILL.md).
