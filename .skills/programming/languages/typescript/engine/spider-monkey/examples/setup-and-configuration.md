# SpiderMonkey Best Practices: 3. Typed Structures & Works-with

## Scenario

A project is working on **3. typed structures & works-with** for SpiderMonkey Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Typed typed-arrays first-class (including `BigInt64Array`)— numeric tunnels native:**
- **Prefer `DataView`/typed views over bit-twiddling boxed objects for buffer IO.**
- **`ArrayBuffer` transferable across workers; structured cloning deliberate.**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Typed Structures & Works-with** section of [SKILL.md](../SKILL.md).
