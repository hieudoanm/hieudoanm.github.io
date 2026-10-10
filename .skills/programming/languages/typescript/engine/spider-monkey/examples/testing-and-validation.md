# SpiderMonkey Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for SpiderMonkey Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Constructor-shape prefill; monomorphic call-sites
- [ ] Hot loops Ion-safe (no type drift; try/eval out)
- [ ] Typed arrays/BigInt64 where numeric; transfers zero-copy
- [ ] Embedded SM version pinned; feature checks for cross-engine
- [ ] Memory: young-heap-aware allocs; references cleared
- [ ] Gecko profiler / ion diagnostics guide changes; suites warm-run

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
