# Renovate: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Renovate. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Config in the repo (`renovate.json5`), extending `config:recommended`
- [ ] Schema validated after every edit
- [ ] Dependency Dashboard enabled
- [ ] `patch`/`digest` grouped and automerged on green status checks
- [ ] `major` never automerged, grouped only when required for that major
- [ ] `minimumReleaseAge` set (a few days)
- [ ] `prHourlyLimit` / `prConcurrentLimit` set

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
