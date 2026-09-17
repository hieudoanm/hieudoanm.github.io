# PostgreSQL Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Parameterized queries; no `SELECT *`; explicit joins
- [ ] Proper types (`uuid`, `timestamptz`, `numeric`); constraints (`NOT NULL`, `UNIQUE`, `CHECK`)
- [ ] FKs + DB-enforced integrity over app-only checks
- [ ] Normalized by default; denormalized only with justification
- [ ] Additive, versioned migrations; destructive changes warned + backed up
- [ ] Indexes validated with `EXPLAIN (ANALYZE, BUFFERS)` against query patterns
- [ ] Explicit transactions; isolation understood; no long-running transactions

## Example

A team applying **Quick-Start Checklist** to a PostgreSQL Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Parameterized queries; no `SELECT *`; explicit joins**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for postgresql.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
