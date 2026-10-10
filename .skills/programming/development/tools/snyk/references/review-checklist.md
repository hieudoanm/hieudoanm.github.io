# Review checklist

Focused reference for **snyk-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
