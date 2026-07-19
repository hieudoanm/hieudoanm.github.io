# Memcached Best Practices: Validation Plan

Use this plan to verify work guided by [Memcached Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Monitor: **hit/miss ratio, eviction count, memory utilization**
- [ ] **Tune slab sizes** if needed; avoid oversized values wasting slabs
- [ ] **Batch gets** where supported
- [ ] **Plan for cold-cache events** (restart, deployment, node loss) — thundering herd: stagger/recompute
- [ ] **Prefer Memcached when:** ultra-low latency matters, data is simple, operational simplicity is required
- [ ] **Never expose Memcached to the public internet**; bind to **private networks only**
- [ ] **Assume data is plaintext** — do not store **secrets or PII**
- [ ] Rely on **network-level security** (firewalls, VPC); Memcached has no auth
- [ ] **Accept that cached data can disappear at any time** — by design

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
