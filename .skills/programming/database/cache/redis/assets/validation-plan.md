# Redis Best Practices: Validation Plan

Use this plan to verify work guided by [Redis Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] **Choose eviction policies deliberately** (noeviction, allkeys-lru, volatile-lru)
- [ ] Monitor **memory usage and hit ratios**
- [ ] **Avoid hot keys** (single-key contention); distribute where needed
- [ ] **Use pipelining for batch operations** (or Lua) to cut round-trips
- [ ] Understand **O(N) vs O(1) command costs** (SORT, SMEMBERS, big LRANGE)
- [ ] **Plan for restart, failover (Sentinel/Cluster), and cold-cache storms**
- [ ] Be explicit about trade-offs when durability is required
- [ ] **Never expose Redis to the public internet**
- [ ] Use **authentication** (requirepass / **ACLs**); **limit commands via ACLs** where possible
- [ ] **Do not store sensitive data unless encrypted**

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
