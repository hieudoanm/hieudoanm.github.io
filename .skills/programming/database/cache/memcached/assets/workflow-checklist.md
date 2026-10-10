# Memcached Best Practices: Workflow Checklist

A practical run sheet for applying [Memcached Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: **Non-persistent** — data can vanish at any time; **never rely on Memcached for correctness**
- [ ] 1. Core Stack & Constraints: **No complex data structures** — values are opaque blobs
- [ ] 2. Architecture & Design: Use Memcached only for **hot, recomputable data**
- [ ] 2. Architecture & Design: Prefer the **cache-aside** pattern: read cache → on miss, load DB, populate cache
- [ ] 3. Security & Data Safety: **Never expose Memcached to the public internet**; bind to **private networks only**
- [ ] 3. Security & Data Safety: **Assume data is plaintext** — do not store **secrets or PII**
- [ ] 4. Reliability & Performance: Monitor: **hit/miss ratio, eviction count, memory utilization**
- [ ] 4. Reliability & Performance: **Tune slab sizes** if needed; avoid oversized values wasting slabs
- [ ] 5. General Rules of Thumb: **Meme is a cache, not a store** — correctness never depends on it
- [ ] 5. General Rules of Thumb: **Simple and boring wins** — short keys, small values, explicit TTL, cache-aside

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
