# GitLab CI/CD Best Practices: Workflow Checklist

A practical run sheet for applying [GitLab CI/CD Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 2. Pipeline Stages: **Define clear stages** — build, test, deploy are the standard; add security, review as needed
- [ ] 2. Pipeline Stages: **Stage ordering** — jobs in earlier stages must complete before later stages start
- [ ] 3. Job Templates & Reuse: **Job drafts** — define reusable job definitions with : key and <<: anchor/alias patterns
- [ ] 3. Job Templates & Reuse: **Template projects** — store common pipeline configurations in a separate project and reference them via include:
- [ ] 4. Environment & Artifacts: **Environment variables** — use CI/CD variables UI for secrets; define runtime env via variables: block for non-sensitive config
- [ ] 4. Environment & Artifacts: **Artifacts** — share build outputs between jobs; use expire_in to auto-cleanup

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
