# Workflow notes

Focused reference for **gitlab-ci-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
