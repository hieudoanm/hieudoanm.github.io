# Implementation notes

Focused reference for **ci-harness-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Branch filtering** — run full pipelines on `main`/`master`, lighter checks on PRs.
- **Parallel job execution** — split test suites, lint, and build across containers to reduce pipeline time.
- **Artifact passing** — share build outputs between jobs using `artifacts` without committing to version control.

---

## 3. Security & Compliance

- **Secret masking** — never log secrets; use CircleCI's secure environment variables.
- **Pipeline approvals** — require manual approval before production deployments.
- **Dependency scanning** — run `npm audit`, `pip-audit`, or `trivy` as pipeline steps.
