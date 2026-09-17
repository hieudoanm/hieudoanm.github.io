# JavaScriptCore Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for JavaScriptCore Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Stable constructor shapes; normalized polymorphic dispatch
- [ ] Benchmark warm-up; tier-stable hot loops (no deopt)
- [ ] Typed arrays/BigInt for exact numeric work
- [ ] GC awareness; heap snapshots via Safari/Instruments
- [ ] `jsc`/Safari profiling for actual hotspots only
- [ ] Workers + Atomics discipline; transfers not copies

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
