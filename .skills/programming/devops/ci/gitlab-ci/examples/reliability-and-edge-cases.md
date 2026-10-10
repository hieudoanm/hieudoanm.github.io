# GitLab CI/CD Best Practices: 3. Job Templates & Reuse

## Source guidance

This example applies the **3. Job Templates & Reuse** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Job drafts** — define reusable job definitions with `:` key and `<<:` anchor/alias patterns.
- **Template projects** — store common pipeline configurations in a separate project and reference them via `include:`.
- **Default job attributes** — set default `image`, `tags`, and `script` at the top level to avoid repetition.

## Example

```yaml
default_jobs: &default_jobs
  image: node:20
  services:
    - docker:20.10.17-dind

job1:
  <<: *default_jobs
  script:
    - echo "Job 1"

job2:
  <<: *default_jobs
  script:
    - echo "Job 2"
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for gitlab-ci-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
