# Workflow notes

Focused reference for **ci-harness-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
