# Hermes Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Hermes Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Precompiled bytecode in builds; lazy-required hot paths
- [ ] No-JIT cost model discipline (allocations, closures, graphs)
- [ ] GC: releases scheduled; snapshots reviewed for retention
- [ ] `enableHermes` consistent across app builds; tested on-engine
- [ ] Engine deltas (Intl/BigInt/shim) documented; polyfilled seams
- [ ] `hermes-engine` version pinned; runtime self-diagnosis available

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
