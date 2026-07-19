# Overview

Focused reference for **gitlab-ci-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# GitLab CI/CD Best Practices

GitLab CI/CD uses `.gitlab-ci.yml` to define pipelines. Following conventions makes pipelines readable, maintainable, and reusable across projects.

---

## 1. Project Structure

Keep `.gitlab-ci.yml` at the repository root. Split complex pipelines into included YAML files using `include:` for reusability.

```yaml
include:
  - project: "my-group/ci-templates"
    ref: main
    file: "/templates/docker-build.yml"
```
