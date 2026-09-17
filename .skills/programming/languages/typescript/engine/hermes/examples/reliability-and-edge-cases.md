# Hermes Best Practices: 1. Bytecode & Startup

## Scenario

A project is working on **1. bytecode & startup** for Hermes Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Precompile apps: Hermes's `.hbc` bytecode ships precompiled — faster start than JIT warmup:**
- **Cold start = time-to-first-paint — trim the initial require graph** (lazy requires, defer heavy modules).
- **Owning the bytecode: RN `HermesMain`/rootless: `HermesInternal` flags are the runtime knobs — document the version's behavior.**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Bytecode & Startup** section of [SKILL.md](../SKILL.md).
