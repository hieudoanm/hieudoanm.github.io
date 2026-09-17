# RustRover: 2. Cargo Project Model

## Scenario

A project is working on **2. cargo project model** for RustRover. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Cargo owns the build; RustRover is a view over it.** Every run configuration corresponds to a Cargo target, and it is generated from `Cargo.toml`.
- **Never hand-edit generated build state to change a target** — change `Cargo.toml` and reload. The IDE is not the source of truth for features, dependencies, or profiles.
- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore` (git will not descend into an ignored directory).

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Cargo Project Model** section of [SKILL.md](../SKILL.md).
