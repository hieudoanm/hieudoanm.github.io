# Rider: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Rider. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `global.json` pins the SDK; `Directory.Build.props` sets `Nullable` and `LangVersion`
- [ ] Solution opened from `.slnx` where possible
- [ ] `.idea/` ignored, with `run/`, `codeStyles/`, `inspectionProfiles/` re-included
- [ ] Inspection profile set to Project, not Solution
- [ ] `.editorconfig` carries formatting; the inspection profile carries analysis severity
- [ ] DotNetCliToolPath / SDK resolution verified against CI
- [ ] Debug configuration verified to build Debug; a release-optimised profile used for profiling

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
