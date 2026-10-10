# Badger: 5. Operations and Pitfalls

## Scenario

A project is working on **5. operations and pitfalls** for Badger. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **No network server** — it is a library embedded in your Go process.
- Back up by copying the data directory only when the DB is closed, or use `db.Backup()` for a consistent snapshot.
- Monitor with `db.Tables()` and `db.Size()` for LSM health.
- Badger GC runs in background; optionally call `db.RunValueLogGC(0.5)` periodically.
- Path locking: only open a `badger.DB` from one process at a time.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Operations and Pitfalls** section of [SKILL.md](../SKILL.md).
