# Apache Server Best Practices: Workflow Checklist

A practical run sheet for applying [Apache Server Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Module Loading: **Load only necessary modules** — LoadModule only what you use; avoid mod_status, mod_info on production servers
- [ ] 1. Module Loading: **Use mod_identify sparingly** — only for intranet access logging
- [ ] 2. VirtualHost Structure: **Listen on port 80 (HTTP) and 443 (HTTPS)** — standard ports; avoid custom ports unless required
- [ ] 2. VirtualHost Structure: **Use ServerName** in each VirtualHost to suppress startup warnings
- [ ] 3. Performance tuning: **KeepAlive On** with KeepAliveTimeout 5 — enable persistent connections; tune timeout for your workload
- [ ] 3. Performance tuning: **MaxRequestWorkers** — set based on available memory; default 150 may be too high for low-RAM servers
- [ ] 4. Security hardening: **ServerTokens Prod** — expose only Apache in server header, not version or modules
- [ ] 4. Security hardening: **ServerSignature Off** — suppress trailing footer on error pages

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
