# GitHub Actions Best Practices: Workflow Checklist

A practical run sheet for applying [GitHub Actions Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Workflows** — automated processes defined in YAML
- [ ] 1. Core Concepts: **Jobs** — sets of steps that run on the same runner
- [ ] 4. Job Configuration: **Configure jobs with appropriate runners:**
- [ ] 4. Job Configuration: **Use appropriate runners (ubuntu-latest, windows-latest, macos-latest).**
- [ ] 5. Caching: **Use caching for dependencies:**
- [ ] 5. Caching: **Cache dependencies to speed up workflows.**
- [ ] 6. Matrix Strategy: **Use matrix for multiple configurations:**
- [ ] 6. Matrix Strategy: **Use matrix for testing across multiple configurations.**
- [ ] 7. Secrets Management: **Use GitHub Secrets for sensitive data:**
- [ ] 7. Secrets Management: **Never hardcode secrets in workflows.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
