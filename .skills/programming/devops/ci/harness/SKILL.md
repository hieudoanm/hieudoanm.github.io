---
name: "ci-harness-best-practices"
description: "Best practices for CI/CD harness configuration. Use when designing shared CI pipelines, orchestration, or multi-stage workflows across projects."
tags:
  - "programming"
  - "devops"
  - "ci"
  - "harness"
when_to_use: "Use when designing shared CI pipelines, orchestration, or multi-stage workflows across projects."
prerequisites:
  - "Familiarity with the application and its deployment environment."
  - "Access to the relevant pipeline, infrastructure, or runtime configuration."
related_skills:
  - "../circle-ci/SKILL.md"
  - "../gitlab-ci/SKILL.md"
  - "../github-actions/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# CI/CD Harness Best Practices

A CI/CD harness provides shared pipeline logic, conventions, and abstractions used across multiple projects. It centralizes configuration, reduces duplication, and ensures consistency across teams.

---

## 1. Harness Structure

- **Modular job definitions** — define reusable jobs in separate files or orbs, compose them in the main pipeline.
- **Parameterized pipelines** — use pipeline parameters and context variables to customize behavior per project or branch.
- **Default stages** — establish common stages: `build`, `test`, `security`, `deploy` — override per project as needed.

```yaml
# Example harness job template
parameters:
  job-name:
    type: string
  image:
    type: string
    default: "circleci/node:20"
  steps-list:
    type: string  # inline YAML or reference

jobs:
  build-test-deploy:
    docker:
      - image: <<parameters.image>>
    steps:
      - <<parameters.steps-list>>
```

---

## 2. Orchestration Patterns

- **Branch filtering** — run full pipelines on `main`/`master`, lighter checks on PRs.
- **Parallel job execution** — split test suites, lint, and build across containers to reduce pipeline time.
- **Artifact passing** — share build outputs between jobs using `artifacts` without committing to version control.

---

## 3. Security & Compliance

- **Secret masking** — never log secrets; use CircleCI's secure environment variables.
- **Pipeline approvals** — require manual approval before production deployments.
- **Dependency scanning** — run `npm audit`, `pip-audit`, or `trivy` as pipeline steps.

---

## 4. Quick-Start Checklist

- [ ] Modular, reusable job definitions
- [ ] Branch filtering (full on main, lightweight on PRs)
- [ ] Secret management via platform, not in YAML
- [ ] Artifact handling for build outputs
- [ ] Security scanning steps integrated