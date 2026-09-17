# IntelliJ IDEA: 2. Gradle Project Model

## Scenario

A project is working on **2. gradle project model** for IntelliJ IDEA. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **The IDE must delegate the build to Gradle** (Settings → Build Tools → Gradle → Build and run using: Gradle). Delegating to IntelliJ's own builder is the most common cause of "works in IDEA, fails in CI".
- **Never commit `.idea/` wholesale.** Commit `codeStyles/`, `inspectionProfiles/`, and `.run/`; ignore the rest. The gitignore must re-include those paths explicitly, because git will not descend into an ignored directory.
- **Use `gradle/libs.versions.toml` (version catalog) for dependencies** and commit it. It is the one place to change a version, and it is what CI reads.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Gradle Project Model** section of [SKILL.md](../SKILL.md).
