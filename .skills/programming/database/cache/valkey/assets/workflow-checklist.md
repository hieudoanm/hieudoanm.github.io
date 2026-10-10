# string with TTL — cache entry, expires on its own: Workflow Checklist

A practical run sheet for applying [string with TTL — cache entry, expires on its own](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: Keys are byte strings; values are data structures: strings, hashes, lists, sets, sorted sets, streams, Geohash, and more
- [ ] 1. Core Concepts: Commands are atomic; many accept N keys (e.g., MSET, EVAL/Lua, transactions, pipelines)
- [ ] 2. Data Structure Usage: **Strings**: caching, counters (INCR), bit operations (SETBIT/GETBIT/BITCOUNT), raw-paced
- [ ] 2. Data Structure Usage: **Hashes**: objects/records; pre-size and use HINCRBY
- [ ] 3. Key Design: Name keys with a **namespace + ID** convention, e.g., user:123, order:456
- [ ] 3. Key Design: Use **hash** for a single entity's fields rather than separate string keys per field
- [ ] 4. Performance and Operations: Single-threaded command loop: **avoid blocking O(N) commands** (KEYS, SMEMBERS on huge sets, HGETALL on huge hashes)
- [ ] 4. Performance and Operations: Use **pipelines** and **MULTI/EXEC** to batch round-trips; Redis protocol is TCP + RESP2/RESP3
- [ ] 5. Persistence Considerations: **RDB** (default): periodic snapshots; trade-durability for write throughput
- [ ] 5. Persistence Considerations: **AOF**: append fsync every write (always→slowest) with everysec as the common compromise

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
