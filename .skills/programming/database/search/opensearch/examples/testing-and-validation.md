# OpenSearch Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for OpenSearch Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Mappings before indexing; index templates explicit; aliases for versioning
- [ ] text vs keyword chosen per field; dynamic mappings controlled
- [ ] Denormalized model; no join-heavy patterns
- [ ] Security plugin enabled; least-privilege roles; read/write/admin separated
- [ ] Destructive ops audited; snapshot repositories protected
- [ ] `search_after` for deep pagination; no deep `from+size`
- [ ] Shards sized deliberately; aggregations bounded; heap/GC/circuit breakers monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
