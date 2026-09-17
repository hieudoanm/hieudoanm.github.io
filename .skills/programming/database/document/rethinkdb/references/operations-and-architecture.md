# 5. Operations and Architecture

Focused reference for **rethinkdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Operations and Architecture

- Clustered deployment with **shard per table**, optionally replicated (`replicas: 2`).
- Table metadata on the cluster; use the web admin or driver for reconfigurations.
- **Memory & disk**: RethinkDB stores all data/working set in RAM; provision memory for the working set and tune `cache-size`.
- Unscheduled reads return backpressure to the client (`RethinkDBTimeoutError`) — design queries with limits (`limit()`, `maxBatchRows`) and use `no_reply` for fire-and-forget writes.
- Avoid blocking CPU-heavy reduce functions; prefer aggregation at the DB level.
