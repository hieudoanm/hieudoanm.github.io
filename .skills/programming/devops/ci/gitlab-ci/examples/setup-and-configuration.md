# GitLab CI/CD Best Practices: 1. Project Structure

## Source guidance

This example applies the **1. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Keep `.gitlab-ci.yml` at the repository root. Split complex pipelines into included YAML files using `include:` for reusability.

## Example

This excerpt is from the cited **1. Project Structure** section.

```yaml
include:
  - project: "my-group/ci-templates"
    ref: main
    file: "/templates/docker-build.yml"
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for gitlab-ci-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
