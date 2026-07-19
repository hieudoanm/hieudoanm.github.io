# Data Structure Usage

Focused reference for [Valkey](../SKILL.md) data-structure selection.

| Structure | Suitable uses |
|---|---|
| Strings | Cached values, counters, and bit operations |
| Hashes | Small records and field-level updates |
| Lists | Queues and ordered work |
| Sets | Membership, deduplication, and set operations |
| Sorted sets | Rankings, scheduling, and score-ordered lookups |
| Streams | Append-only events and consumer groups |

## Example

```bash
valkey-cli HSET user:42 name "Ada" role "admin"
valkey-cli HGET user:42 name
```

Choose the structure from access patterns, set an expiry where appropriate, and avoid treating an in-memory cache as the durable source of truth.
