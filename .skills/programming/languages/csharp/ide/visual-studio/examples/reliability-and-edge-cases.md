# Visual Studio: 4. Startup & Performance

## Scenario

A project is working on **4. startup & performance** for Visual Studio. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Startup cost is dominated by solution size and analyzer work**, not the IDE itself. A solution that takes minutes to load is a solution with too many projects or too many analyzers.
- **Disable unused workload components and extensions** at install time. Every installed component is loaded whether or not you use it.
- **`EnableNETAnalyzers` defaults on for modern SDKs.** Tune the rule set with an `.editorconfig` rather than suppressing warnings one at a time in the UI.
- **Turn off "Restore on build" and background IntelliSense if they are fighting you**, but understand that you are trading correctness for speed.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Startup & Performance** section of [SKILL.md](../SKILL.md).
