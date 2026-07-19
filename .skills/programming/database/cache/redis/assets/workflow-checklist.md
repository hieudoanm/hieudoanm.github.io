# Redis Best Practices: Workflow Checklist

A practical run sheet for applying [Redis Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Redis **7+**
- [ ] 1. Core Stack & Constraints: Keys must be **namespaced** (user:{id}:profile) with **clear ownership**
- [ ] 2. Architecture & Design: **One responsibility per keyspace**; model data around **access patterns**
- [ ] 2. Architecture & Design: **Prefer Hashes over many small keys** (HMSET user:42 {name,email,level})
- [ ] 3. Security & Data Safety: **Never expose Redis to the public internet**
- [ ] 3. Security & Data Safety: Use **authentication** (requirepass / **ACLs**); **limit commands via ACLs** where possible
- [ ] 4. Reliability & Performance: **Choose eviction policies deliberately** (noeviction, allkeys-lru, volatile-lru)
- [ ] 4. Reliability & Performance: Monitor **memory usage and hit ratios**
- [ ] 5. General Rules of Thumb: **Use the right structure for the pattern** — Hash over many keys, ZSet for ranks, Stream for events
- [ ] 5. General Rules of Thumb: **Ephemeral by default** — treat every read as a miss and design cache fills to be safe

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
