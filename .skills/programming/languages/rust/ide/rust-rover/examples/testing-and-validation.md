# RustRover: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for RustRover. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `rust-toolchain.toml` committed with channel, components, and targets
- [ ] `llvm-tools` component installed for profiling
- [ ] MSVC (not GNU) toolchain on Windows; debugger pairing verified
- [ ] Dependencies added via `Cargo.toml`, `Cargo.lock` committed for a binary
- [ ] `target/` ignored; `Cargo.lock` policy decided and documented
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
- [ ] Run configurations committed as `.run/*.run.xml`

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
