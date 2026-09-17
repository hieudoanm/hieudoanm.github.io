# leveldb: Workflow Checklist

A practical run sheet for applying [leveldb](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: String keys and string values; keys are stored in sorted order
- [ ] 1. Core Concepts: LSM tree: writes go to an in-memory **memtable**, flush to immutable **SSTable files**, and compacted asynchronously
- [ ] 2. Usage in Go (syndtr/goleveldb): Open: db, err := leveldb.OpenFile(path, &opt)
- [ ] 2. Usage in Go (syndtr/goleveldb): Reads: data, err := db.Get(key, nil); check for errors.Is(err, leveldb.ErrNotFound)
- [ ] 3. Tuning Options: BlockCacheCapacity: size of the block cache in bytes (default 8 MB); set to ~1/3 of available RAM
- [ ] 3. Tuning Options: CompactionTableSize: SSTable size target; tune to balance read amplification vs write amplification
- [ ] 4. Iterators and Scans: db.NewIterator(nil, nil) iterates all keys; use Seek(key) for prefix or range start
- [ ] 4. Iterators and Scans: iter.Release() must be called after use to close internal resources
- [ ] 5. Operations and Pitfalls: LevelDB is a **single-process, embedded-only** library — no network protocol
- [ ] 5. Operations and Pitfalls: Back up by copying the data directory while the DB is closed

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
