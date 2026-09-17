# libSQL Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for libSQL Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] SQLite-compatible SQL; no non-portable features without explicit note
- [ ] Stable PKs (UUIDs); schemas tolerate replication lag
- [ ] Conflict-minimizing, merge-friendly data model
- [ ] Local reads optimized; writes batched; no tight remote write loops
- [ ] Writes idempotent where possible; write path (primary vs replica) explicit
- [ ] Transactions per logical write unit; no out-of-band file manipulation
- [ ] Offline-first and partition scenarios tested; `updated_at`/sync metadata present

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
