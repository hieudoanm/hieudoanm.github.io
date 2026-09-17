# GitLab CI/CD Best Practices: Starter Template

A reusable starting point derived from the **1. Project Structure** section of [GitLab CI/CD Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```yaml
include:
  - project: "my-group/ci-templates"
    ref: main
    file: "/templates/docker-build.yml"
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
