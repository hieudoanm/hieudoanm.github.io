# Snyk

Snyk is a security scanner across four surfaces — application code, dependencies, infrastructure as code, and container images — and its weakness is the same as every scanner's: **it reports what matches a signature, not what is exploitable in your code**. A critical finding in a dev-only dependency that never ships and is never imported is a false positive in everything but the letter of the rule. Practical Snyk work is...

## When to use

Use when setting up, triaging, or acting on dependency vulnerabilities.

## Core topics

- 1. What Each Scanner Actually Sees
- 2. Triage: Reachability First
- 3. Fixing
- 4. Infrastructure as Code
- 5. CI Integration

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Snyk: Basic Usage](./examples/basic-usage.md)
- [Snyk: Overview](./examples/reliability-and-edge-cases.md)
- [Snyk: 4. Infrastructure as Code](./examples/setup-and-configuration.md)
- [Snyk: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Snyk: Decision Record](./assets/decision-record.md)
- [Snyk: Starter Template](./assets/starter-template.md)
- [Snyk: Validation Plan](./assets/validation-plan.md)
- [Snyk: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
