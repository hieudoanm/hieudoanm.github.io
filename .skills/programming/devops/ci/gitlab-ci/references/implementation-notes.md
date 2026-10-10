# Implementation notes

Focused reference for **gitlab-ci-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
