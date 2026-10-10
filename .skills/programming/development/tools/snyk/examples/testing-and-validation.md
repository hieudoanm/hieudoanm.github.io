# Snyk: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Snyk. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `.snyk` committed; every ignore has a reason and an expiry
- [ ] `snyk test` on PRs, `snyk monitor` on the default branch
- [ ] CI fails only on new high/critical findings
- [ ] Token in CI secrets, scoped minimally
- [ ] Snyk CLI used in CI so the scan is reproducible locally
- [ ] IaC scanning enabled and findings fixed in the template
- [ ] Manual console changes checked for state drift

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
