# Memcached Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Memcached Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Only hot, recomputable data cached; correctness never depends on it
- [ ] Cache-aside pattern; idempotent fills; graceful miss handling
- [ ] Short, deterministic keys; small values; explicit TTLs
- [ ] Key explosion avoided; consistent hashing for node changes
- [ ] Invalidation best-effort; partial availability assumed
- [ ] Private network only; no secrets/PII; plaintext assumed
- [ ] Hit ratio, evictions, memory monitored; slabs tuned if needed

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
