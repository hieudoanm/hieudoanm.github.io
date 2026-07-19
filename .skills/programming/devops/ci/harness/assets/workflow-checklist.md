# CI/CD Harness Best Practices: Workflow Checklist

A practical run sheet for applying [CI/CD Harness Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Harness Structure: **Modular job definitions** — define reusable jobs in separate files or orbs, compose them in the main pipeline
- [ ] 1. Harness Structure: **Parameterized pipelines** — use pipeline parameters and context variables to customize behavior per project or branch
- [ ] 2. Orchestration Patterns: **Branch filtering** — run full pipelines on main/master, lighter checks on PRs
- [ ] 2. Orchestration Patterns: **Parallel job execution** — split test suites, lint, and build across containers to reduce pipeline time
- [ ] 3. Security & Compliance: **Secret masking** — never log secrets; use CircleCI's secure environment variables
- [ ] 3. Security & Compliance: **Pipeline approvals** — require manual approval before production deployments

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
