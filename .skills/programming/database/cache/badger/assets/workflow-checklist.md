# badger: Workflow Checklist

A practical run sheet for applying [badger](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: Key-value pairs with **ordered byte keys**; supports prefix scans and range iterations
- [ ] 1. Core Concepts: LSM tree for keys + metadata; separate **value log (vLog)** for large values to reduce write amplification
- [ ] 2. Usage in Go: Open with badger.Open(badger.DefaultOptions(path))
- [ ] 2. Usage in Go: Single *badger.DB instance per path; multiple goroutines can share it safely
- [ ] 3. Value Log and Performance Tuning: Large values stored in the vLog improve write throughput; keys stay in the LSM tree
- [ ] 3. Value Log and Performance Tuning: ValueThreshold (default 1MB) determines when values go to vLog — tune based on your read/write ratio
- [ ] 4. Transactions: ACID with optimistic concurrency; ConflictError on write conflicts — retry
- [ ] 4. Transactions: Use Discard() after Commit() to release resources; defer it to prevent leaks
- [ ] 5. Operations and Pitfalls: **No network server** — it is a library embedded in your Go process
- [ ] 5. Operations and Pitfalls: Back up by copying the data directory only when the DB is closed, or use db.Backup() for a consistent snapshot

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
