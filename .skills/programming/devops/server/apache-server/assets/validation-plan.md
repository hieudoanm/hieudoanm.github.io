# Apache Server Best Practices: Validation Plan

Use this plan to verify work guided by [Apache Server Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Skill-specific review

- [ ] **KeepAlive On** with KeepAliveTimeout 5 — enable persistent connections; tune timeout for your workload
- [ ] **MaxRequestWorkers** — set based on available memory; default 150 may be too high for low-RAM servers
- [ ] **EnableSendfile on** — improve static file delivery on Linux (disable on some virtualized environments)
- [ ] **ServerTokens Prod** — expose only Apache in server header, not version or modules
- [ ] **ServerSignature Off** — suppress trailing footer on error pages
- [ ] **Directory restrictions** — use Require all denied for .htaccess, .git, and other sensitive directories
- [ ] **mod_security** — deploy rule set for WAF protection

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
