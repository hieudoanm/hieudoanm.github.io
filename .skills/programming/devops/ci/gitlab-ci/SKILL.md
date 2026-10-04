---
name: gitlab-ci-best-practices
description: Best practices for GitLab CI/CD configuration. Use when creating, structuring, or reviewing GitLab pipeline definitions for CI/CD workflows.
---

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

---

## 2. Pipeline Stages

- **Define clear stages** — `build`, `test`, `deploy` are the standard; add `security`, `review` as needed.
- **Stage ordering** — jobs in earlier stages must complete before later stages start.
- **Parallel jobs** — use `parallel:` to run multiple jobs simultaneously within a stage.

```yaml
stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    - echo "Building..."
  tags:
    - docker

test_job:
  stage: test
  script:
    - echo "Testing..."
  parallel: 4
```

---

## 3. Job Templates & Reuse

- **Job drafts** — define reusable job definitions with `:` key and `<<:` anchor/alias patterns.
- **Template projects** — store common pipeline configurations in a separate project and reference them via `include:`.
- **Default job attributes** — set default `image`, `tags`, and `script` at the top level to avoid repetition.

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

---

## 4. Environment & Artifacts

- **Environment variables** — use CI/CD variables UI for secrets; define runtime env via `variables:` block for non-sensitive config.
- **Artifacts** — share build outputs between jobs; use `expire_in` to auto-cleanup.
- **Artifact paths** — be explicit about what's persisted; use `paths:` keyword.

```yaml
artifacts:
  paths:
    - build/
  expire_in: 1 week
```

---

## 5. Quick-Start Checklist

- [ ] Stages defined in logical order
- [ ] Jobs use `image` and `tags` consistently
- [ ] Secrets stored in CI/CD Variables, not in YAML
- [ ] Artifacts configured with `expire_in`
- [ ] Include templates for reuse where applicable