# V8 Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for V8 Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Object construction stable (fixed shape per hot path); no shape churn
- [ ] Typed arrays for buffers; preallocated sizes
- [ ] Hot loops deopt-free (no mixed-type accumulators; eval/try out)
- [ ] `--prof`/CPU profiles guide any optimization; no cargo-cult flags
- [ ] Workers + `SharedArrayBuffer` + `Atomics`; transfer zero-copy
- [ ] Heap snapshots reviewed for old-space retention

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
