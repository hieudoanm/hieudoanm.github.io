# Workflow notes

Focused reference for **snyk-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
