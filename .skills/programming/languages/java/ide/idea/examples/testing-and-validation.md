# IntelliJ IDEA: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for IntelliJ IDEA. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Build delegated to Gradle or Maven in Settings
- [ ] `gradle/libs.versions.toml` (or equivalent) committed as the single source of dependency versions
- [ ] `.idea/` ignored with `run/`, `codeStyles/`, `inspectionProfiles/` re-included
- [ ] Wrapper used for every build (`./gradlew`)
- [ ] Inspection profile set to Project and committed
- [ ] Formatter matched to the repo's `spotless`/`ktlint` config
- [ ] Annotation processors declared in the build script, not only in the IDE

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
