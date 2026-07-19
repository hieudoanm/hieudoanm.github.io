# CI/CD Harness Best Practices: 3. Security & Compliance

## Scenario

A project is working on **3. security & compliance** for CI/CD Harness Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Secret masking** — never log secrets; use CircleCI's secure environment variables.
- **Pipeline approvals** — require manual approval before production deployments.
- **Dependency scanning** — run `npm audit`, `pip-audit`, or `trivy` as pipeline steps.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Security & Compliance** section of [SKILL.md](../SKILL.md).
