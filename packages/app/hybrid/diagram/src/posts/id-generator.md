---
title: Distributed ID Generator
difficulty: medium
category: infrastructure
author: Hieu Doan
tags: distributed
---

# Distributed ID Generator

Snowflake IDs, uniqueness at scale, ordering, allocation.

## Interview Questions

- Design a distributed unique ID generator
- Why are database auto-increment IDs not enough?
- How does a Snowflake-style ID work?
- How do you allocate ID ranges without a central bottleneck?
- How do you ensure IDs are k-ordered by time?

## Answers

### Q1. Design a distributed unique ID generator

An ID generator hands out globally unique identifiers to many clients at high
throughput. The main approaches are Snowflake-style (timestamp + worker +
sequence packed into a 64-bit integer), database sequences with batch
allocation, and UUIDs. For 64-bit, roughly time-ordered IDs, the design is a
fleet of allocator/Snowflake workers behind an API gateway: a client calls
`next id`, a worker composes its timestamp, worker ID, and per-millisecond
sequence, and returns the value — the hot path is pure local arithmetic, no
coordination.

Data model: the ID is the only output; internally the system keeps worker
identity (registered in the ID DB or a config store), per-worker sequence state,
and metadata rows for allocated ranges. A monitor collects per-worker stats —
generation rate, sequence overflow, clock drift — and alerts on anomalies.
Failure handling: a worker crash loses at most an in-memory sequence value, and
because worker IDs are disjoint, uniqueness holds across restarts and across the
fleet; a worker that comes back with the same ID resumes safely as long as
clocks are correct. Scaling is horizontal and linear: add workers, each with its
own ID space, no shared counter to contend for.

The core trade-off is coordination versus guarantees. Coordination-free
Snowflake is fast (millions of IDs/sec) but assumes clock sanity and unique
worker IDs; duplicate risk appears only when those invariants break. Batch
allocation against a database is simpler and safer but pays a DB round trip per
range, and a crash skips leftover IDs (gaps are fine). UUIDs (v4) need no
coordination at all but are 128 bits, unorderable, and index-hostile, which
matters for clustered indexes. The choice depends on whether you need
sortability, compactness, or simplicity — most systems end up with a Snowflake
variant plus a batch-allocated fallback for correctness-critical ranges.

### Q2. Why are database auto-increment IDs not enough?

A single auto-increment column is a single writer: every insert serializes on
the sequence, taking a lock and updating the counter, so throughput is capped at
what one database node can sustain — and it's the same counter for every table
and every caller, so it becomes a hard bottleneck during spikes. Worse, it's a
hot spot you cannot shard: split your write load across databases and either
they share one sequence (defeating the point) or they each get their own, which
collides.

Second, auto-increment carries no temporal information. An ID like `1001423`
tells you almost nothing about when the row was created, which you need for
time-ordered display, partitioning by creation time, data retention, and
debugging. Third, it leaks information: the rate of change of the counter
reveals write volume, a privacy and security concern. Fourth, sharding breaks
auto-increment outright — two shards both numbering rows `1..N` collide, forcing
awkward composite keys or cross-shard coordination. And the sequential guarantee
is weaker than it looks: rollbacks, failed inserts, and deletes leave gaps
anyway, so the ID sequence is already full of holes.

Distributed generators replace the single sequence. A Snowflake-style worker
computes IDs locally from timestamp + worker ID + sequence: no shared state, so
throughput scales with worker count, and IDs are sortable by time. Batch
allocation keeps the database but inverts the cost model: one
`UPDATE ... WHERE last_id = X` reserves a range of, say, 1000 IDs, and the
allocator serves them locally — one DB call per thousand IDs instead of one per
ID. Both approaches preserve uniqueness across many writers, which is the
property single-node auto-increment fundamentally cannot give you.

### Q3. How does a Snowflake-style ID work?

Twitter's Snowflake packs 64 bits: 1 unused sign bit, 41 bits of millisecond
timestamp (covers ~69 years from a chosen epoch, e.g. 2010), 10 bits of
worker/machine ID (1024 distinct workers), and 12 bits of a per-millisecond
sequence (4096 IDs per millisecond per worker). To generate an ID, a worker
reads the current millisecond, increments its sequence if the millisecond
matches the last one, or resets the sequence and records the new timestamp; when
the sequence saturates, it waits for the next millisecond rather than
overflowing.

Uniqueness rests on three disjointness invariants: a worker never reuses an ID
within the same epoch (its sequence strictly increases), workers have unique IDs
(no two workers share a timestamp + worker field), and the timestamp only moves
forward. The weak point is the clock: if a worker's wall clock jumps backward,
it can reissue a sequence it already handed out. Mitigations: remember the last
timestamp and wait until real time catches up; if drift is severe, fail fast or
take a fresh worker ID; and refuse to start a worker whose clock is behind the
cluster's metadata.

Capacity math: 1024 workers × 4096 IDs/ms = ~4.2M IDs/sec sustained, which is
why Snowflake variants are the default for high-throughput systems. Variants
rebalance the fields — e.g., ShardingSphere's snowflake, Baidu UID-Generator, or
adding a discriminator/business-type field to the worker bits — trading worker
count or sequence width for more throughput or embeddable metadata. The
trade-off: the ID is compact, sortable, and coordination-free, but it is not
strictly monotonic across workers (IDs from the same millisecond interleave),
and its order value is only as good as the clock. For strictly ordered IDs you
need coordination; for most systems, k-ordering is enough.

### Q4. How do you allocate ID ranges without a central bottleneck?

Batch allocation removes the database from the hot path. Instead of asking for
one ID at a time, each allocator server asks the ID DB once for a range — an
atomic `UPDATE ... WHERE last_id = X` reserves, say, `[1000000, 1000500)`, and
the server then serves IDs from that range locally, from memory, until
exhausted. Because the reservation is atomic and each range is unique, disjoint
ranges guarantee uniqueness across the fleet with zero per-ID coordination. The
math: one DB round trip per 500 IDs instead of per ID is roughly a 500x
reduction in sequence contention, which is how a modest database supports
millions of IDs per second.

Each server holds its current position in a range cache. When it drains a range,
it fetches the next; the fetch is retried with backoff if the DB is down, but in
the meantime the server keeps serving from its cached range — so a DB outage
degrades, not stops, ID issuance. If a server crashes mid-range, the leftover
IDs are skipped and never reused; that's acceptable, since ID gaps don't affect
correctness (IDs just need uniqueness, not density). A monitor tracks range
drain rates and cache headroom so servers prefetch before exhausting.

Range size is the tuning knob. Large ranges (e.g., 100k) minimize DB calls and
maximize resilience, at the cost of wider gaps and more wasted IDs when servers
churn; small ranges give tight, dense IDs but more DB round trips. A common
refinement is segment/step allocation: multiple servers take non-adjacent ranges
(`+step`) so any server can serve a fresh range without waiting for a neighbor,
at the cost of interleaved (non-contiguous) ID order. Ordering note: within one
allocator, ranges are issued in increasing order, so IDs are k-ordered per
allocator; across allocators they interleave, which is fine for most consumers
and can be fixed at read time.

### Q5. How do you ensure IDs are k-ordered by time?

k-ordered means IDs created around the same time are numerically close — not
strictly monotonic, but approximately time-ordered. Snowflake achieves this
because the high-order bits are a millisecond timestamp: IDs from different
workers in the same millisecond can interleave (worker A's `...0005` versus
worker B's `...1005` at the same instant), but any ID is within k of IDs
generated in the same millisecond, where k is bounded by the worker and sequence
fields. Within a single worker, order is exact; globally it is k-ordered.

Preserve the property by never reusing worker IDs within the same epoch, keeping
the worker ID in the middle bits so the timestamp dominates the numeric value,
and detecting clock jumps so a worker cannot backdate into territory another
worker already issued. Batch allocation is k-ordered per allocator: ranges are
handed out in increasing order, so IDs from a newer range are numerically larger
than an older one, but two allocators draining overlapping time windows can
interleave. If you need strict global ordering you must reintroduce a
coordination point (and its bottleneck); otherwise accept k-ordering and sort at
the consumer.

## Source

```text
title: ID Generator
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node allocator: Allocator Service [icon=server]
node snowflake: Snowflake Worker [icon=compute]
node segment: Segment Queue [icon=queue]
node db: ID DB [cylinder, icon=database]
node cache: Range Cache [cylinder, icon=cache]
node monitor: Monitor [icon=worker]

edge client -> api: next id
edge api -> allocator: request
edge allocator -> snowflake: generate
edge allocator -> segment: batch
edge allocator -> db: reserve range
edge allocator -> cache: cached range
edge api -> client: id
edge allocator -> monitor: stats
```
