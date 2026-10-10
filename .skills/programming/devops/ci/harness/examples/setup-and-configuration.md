# CI/CD Harness Best Practices: 1. Harness Structure

## Scenario

A project is working on **1. harness structure** for CI/CD Harness Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Modular job definitions** — define reusable jobs in separate files or orbs, compose them in the main pipeline.
- **Parameterized pipelines** — use pipeline parameters and context variables to customize behavior per project or branch.
- **Default stages** — establish common stages: `build`, `test`, `security`, `deploy` — override per project as needed.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Harness Structure** section of [SKILL.md](../SKILL.md).
