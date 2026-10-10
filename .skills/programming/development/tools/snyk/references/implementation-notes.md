# Implementation notes

Focused reference for **snyk-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Infrastructure as Code

- **`snyk iac` on Terraform/Kubernetes/CloudFormation is high-yield and low-noise,** because a misconfiguration is a fact about the file, not a judgement call. Fix it in the template, not in the console.
- **State files drift from templates** — a manual console change is invisible to IaC scanning and survives until the next apply. Treat a finding in IaC as possibly "the template says one thing and reality says another."
- **A policy exception for an intentional public resource** belongs in the template as a comment and in `.snyk` as an ignore, so the next scan and the next reviewer both see it.

---

## 5. CI Integration

- **Fail the build on new high/critical findings; report everything else.** The gate should stop a regression, not enumerate the backlog.
- **Scan the default branch in `monitor` mode continuously** — that is the record of production state. A per-PR `test` scan is a different and much smaller question.
- **Use the CLI in CI, not only the GitHub app,** so the same command runs locally and the result is reproducible.
- **Keep the token in CI secrets, never in the repository,** and scope it to what the scan needs.
- **The `.snyk` file is the shared policy** — commit it, review changes to it, and treat an ignore removal as a real change.

---
