---
name: snyk-best-practices
description: Best practices for Snyk — Code, IaC, and container scanning, the difference between a finding and a reachable one, severity policy, and fix workflow ownership. Use when setting up, triaging, or acting on dependency vulnerabilities.
---

# Snyk

Snyk is a security scanner across four surfaces — application code, dependencies, infrastructure as code, and container images — and its weakness is the same as every scanner's: **it reports what matches a signature, not what is exploitable in your code**. A critical finding in a dev-only dependency that never ships and is never imported is a false positive in everything but the letter of the rule. Practical Snyk work is about **triage by reachability and exposure, not by severity number, and fixing the cause rather than the finding**. Routine update automation is a different job; see [renovate.md](./renovate.md).

_Verified against Snyk's 2026 products. Plan names, the free tier's limits, and CLI behaviour change frequently; the triage discipline below does not._

---

## 1. What Each Scanner Actually Sees

- **Four distinct products, one workflow.** `snyk code` (your source), `snyk dep audit` (the dependency tree), `snyk iac` (Terraform/K8s/etc.), `snyk container` (an image). They overlap and disagree; understanding which one produced a finding explains most of the inconsistency.
- **Snyk Code analyses your source for vulnerable patterns** — SQL injection, path traversal, insecure deserialisation. It reasons about dataflow within a function and is weakest where data crosses a boundary it cannot see (serialised payloads, reflection through a queue, native calls).
- **`snyk dep audit` walks the dependency tree** and matches versions against advisory data. This is the one most likely to report something you have never imported.
- **`Snyk IaC` catches misconfiguration**, which is the highest-yield scan in most cloud repos: a public bucket, an over-permissive IAM policy, and an unencrypted database are found here and nowhere else.
- **`snyk container` analyses the image you actually ship,** which is more accurate than the dependency tree because it sees what the build removed — or failed to remove.
- **Severity is a property of the vulnerability, not of your exposure.** A "High" in a test fixture and a "High" on a request handler are the same finding to the scanner and not remotely the same risk to you.

---

## 2. Triage: Reachability First

- **A finding is a lead, not a defect.** Triage questions, in order: is this code reachable from untrusted input? is it in production? is the vulnerable path actually exercised? Then, and only then, how bad is it?
- **`snyk test` and the IDE plugin are for the developer loop** — fast, noisy, and not authoritative. `snyk monitor` on the default branch is the record of what is actually deployed.
- **Add `.snyk` policy to the repository, not a dashboard setting.** Severity thresholds, ignored findings with a stated reason, and the expiry on an ignore are all reviewable in a PR. A dashboard-level ignore is invisible to the team and permanent.
- **Every ignore needs a reason and an expiry.** An unexpiring ignore is a silently accepted vulnerability, and a future scan will not re-litigate it. Set an expiry so the decision is revisited.
- **`snyk test --severity-threshold=high` in CI is a gate, not a full report.** Keep the full scan scheduled and human-reviewed; a gate that blocks on every informational finding is a gate people will disable.

```json
{
  "ignore": [
    {
      "id": "SNYK-JS-1234",
      "paths": ["tests/**", "**/*.test.ts"],
      "reason": "Test-only dependency, not shipped; pinned until the suite is migrated",
      "expires": "2027-01-15"
    }
  ]
}
```

- **Triage by reachable surface, not by CVE number.** Prioritise what an attacker can reach over what has the highest CVSS.
- **Watch for the two failure modes:** a permanently red scan that gets ignored, and a green scan because everything is ignored. Both are worse than a scan nobody configured.

---

## 3. Fixing

- **Prefer the upgrade; the workaround is the exception.** A dependency bump resolves the finding and the class. A code workaround leaves the vulnerable code in the tree for the next person to use.
- **Bump the version Renovate would have chosen, in the same PR.** A Snyk alert and a Renovate PR for the same package are the same fix arriving twice; suppress one.
- **Where a version is not yet available, isolate:** drop the vulnerable optional feature, add a WAF rule as a stopgap with an expiry, or vendor a patched fork — and record which, with a date.
- **Do not silence a scanner to make a pipeline green** without a `.snyk` entry explaining why. A `--severity-threshold=critical` added under deadline pressure is how a repo ends up with no scanner at all.
- **A fix that regresses behaviour is a real trade-off** — record it in the PR, because the next person seeing the ignore will wonder.

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

## General Rules of Thumb

- A finding is a lead; triage by reachability and exposure before severity.
- `.snyk` in the repo with a reason and an expiry on every ignore.
- `snyk test` in the PR loop, `snyk monitor` on the default branch as the production record.
- Prefer the upgrade; a workaround is the exception with a date.
- Deduplicate against Renovate — same package, same fix.
- Fix IaC findings in the template, not the console; check for state drift.
- CI gates on new high/critical only; never silence a scanner to go green.

---

## Quick-Start Checklist

- [ ] `.snyk` committed; every ignore has a reason and an expiry
- [ ] `snyk test` on PRs, `snyk monitor` on the default branch
- [ ] CI fails only on new high/critical findings
- [ ] Token in CI secrets, scoped minimally
- [ ] Snyk CLI used in CI so the scan is reproducible locally
- [ ] IaC scanning enabled and findings fixed in the template
- [ ] Manual console changes checked for state drift
- [ ] Alert deduplication against Renovate configured
- [ ] Remediation preference set to upgrade over workaround
- [ ] Intentional exceptions recorded as template comments and `.snyk` entries
- [ ] Public/documented process for re-triaging on a schedule
