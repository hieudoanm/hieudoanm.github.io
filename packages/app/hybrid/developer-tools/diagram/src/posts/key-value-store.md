---
title: Distributed Key-Value Store
difficulty: medium
category: storage
author: Hieu Doan
tags: database, distributed, key-value
---

# Distributed Key-Value Store

Consistent hashing, replication, quorum, durability, hash tables.

## Interview Questions

- Design a distributed key-value store
- How do you partition data with consistent hashing?
- How do you replicate and ensure quorum reads/writes?
- How do you handle node failures and rebalancing?
- How do you guarantee durability (WAL, snapshotting)?

## Answers

### Q1. Design a distributed key-value store

A distributed key-value store exposes a tiny API — `get(key)` and
`put(key, value)` — but hides a cluster of storage nodes arranged on a
consistent hash ring.

- A coordinator or gateway routes each request: hash the key, walk the ring to
  find the responsible node(s), forward the operation, and return the result.
- Clients never talk to individual nodes, so the cluster can grow, shrink, and
  heal underneath them without changing the client contract.

Each storage node runs an in-memory hash table with a disk-backed engine.

- The common engine is an LSM tree: writes land in an in-memory memtable and are
  flushed to immutable sorted SSTables, which are compacted in the background;
  reads check the memtable, then the SSTable index and bloom filters to avoid
  disk I/O.
- The write-ahead log sits in front of all of it — every write is appended there
  before the memtable is updated, so a crash loses nothing acknowledged.
- This design makes sequential appends fast and random reads only as slow as the
  filters let them be.

Key design decisions:

- Partitioning (consistent hashing with virtual nodes), replication factor
  (typically 3), quorum sizes `W + R > N`, and a per-request consistency level —
  `ONE`, `QUORUM`, or `ALL` — so callers can trade consistency for latency.
- The governing trade-off is CAP: strict linearizability costs availability,
  because a network partition forces you to either serve stale reads or reject
  writes, so most production stores are Dynamo-style — eventually consistent
  with tunable quorums, versioned values, and conflict resolution via vector
  clocks or last-write-wins.
- Observability is part of the design too: per-node latency, compaction backlog,
  and replication lag are monitored to catch hotspots and lagging replicas
  before users do.

### Q2. How do you partition data with consistent hashing?

Consistent hashing maps both keys and nodes onto a circular space, e.g.
`[0, 2^32)`.

- The owner of a key is the first node encountered clockwise from `hash(key)`;
  `put` and `get` route there.
- The property that makes it practical for dynamic clusters: when a node joins
  or leaves, only the keys in the arcs the node owned move — a naive `key % N`
  scheme would rehash the entire dataset.
- Because random node placement creates imbalance, each physical node registers
  several virtual nodes spread around the ring, so load approaches uniform and a
  node removal shifts only its many small arcs.

Implementation is straightforward.

- The coordinator or client library keeps a copy of the ring and the
  vnode-to-node mapping, maintained by a metadata store or gossip.
- On a request, hash the key and walk clockwise to the first node; ownership is
  computed, not stored per key, so there's no lookup table to keep consistent.
- Replication follows the same geometry: with replication factor N, a key is
  stored on its primary plus the next N-1 nodes clockwise, so a node failure is
  covered by the nodes that naturally inherit its arc.

Trade-offs:

- The ring balances key counts, not key sizes or hotness — a few very large or
  very popular keys still skew one node, so you pair the ring with sub-keys and
  hot-key fan-out.
- The clockwise walk must stay fast: bound the number of vnodes (thousands, not
  millions) and cache per-key ownership for the hottest keys.
- Membership changes are cheap but not free — the arcs that move re-replicate
  their data, so background rebalancing is throttled to avoid saturating the
  network.
- Ring updates must be atomic per change: install the new mapping, complete the
  data transfer, then switch reads over, so clients never observe a
  half-migrated key.

### Q3. How do you replicate and ensure quorum reads/writes?

With replication factor N, every key is stored on N nodes — the primary plus the
next N-1 around the ring.

- Writes go to the primary, which appends to its WAL and propagates to replicas;
  reads may go to any of the N.
- Quorum semantics: a write is acknowledged when W replicas confirm, a read
  returns when R replicas respond, and choosing `W + R > N` guarantees the read
  and write sets overlap, so a reader always sees the latest acknowledged write.
- `(W, R) = (quorum, quorum)` with N=3 gives the standard 2+2; you can tune per
  request — `(1, N)` for read-heavy, `(N, 1)` for write-heavy — as long as the
  overlap constraint holds.

Versioning is mandatory because replicas can diverge.

- Each value carries a version — a vector clock or a timestamp/counter — and
  when R replicas return different versions, the coordinator returns all of them
  and the client resolves, or the store reconciles with last-write-wins if
  that's acceptable for the data.
- Two supporting mechanisms: read repair, where a node detects a stale peer
  during a read and pushes the fresher version; and hinted handoff, where during
  a node outage a write is accepted by a temporary node holding a "hint", then
  delivered when the owner returns — the write succeeds even when fewer than N
  of the original owners are up.

The coordinator also decides what happens on partial failure.

- With a quorum read, if it can't reach R replicas it returns an error or a
  stale value with a version, and clients must handle both.
- The trade-off is consistency versus availability and latency: each quorum
  operation costs a fan-out and a wait for the slowest responder, and during a
  network partition quorum may be unreachable, forcing the store to pick a side
  (serve the partition it can see or refuse).
- Keep N small (3–5), pipeline replication, and treat `W + R > N` as a hard
  invariant that callers must not violate.

### Q4. How do you handle node failures and rebalancing?

Failure detection is heartbeat- or gossip-based.

- Nodes report liveness, and a node that misses its window is marked dead.
- Because every key lives on N nodes, the remaining replicas still hold copies;
  the ring reassigns the dead node's arcs to its successors, and reads/writes
  for those keys continue from the surviving replicas as long as fewer than
  `N - W` (for writes) or `N - R` (for reads) are down.
- One survivor is promoted to primary; a rebalance worker then streams the key
  range to a fresh node so replication factor N is restored.
- Clients see, at worst, higher latency during the window.

Rebalancing on a node add or remove transfers only the moved arcs — consistent
hashing's payoff.

- The rebalance worker copies range data to the new owner in chunks, verifies
  each chunk with a checksum, applies the final WAL entries, and flips the ring
  mapping over; during the flip, reads are served by both old and new owner so
  nothing is missed.
- If the move is interrupted, it resumes from the last completed chunk rather
  than restarting.
- Membership changes are applied transactionally to the ring so a client never
  observes a half-migrated key.

Operationally, background movement must be throttled so rebalancing doesn't
saturate the network and starve live traffic; you can pause it during peak
hours.

- Two failure modes to design for: a node that dies mid-move leaves an
  incomplete copy, which the receiving node detects and abandons (the surviving
  replicas are still authoritative); and metadata must be split-brain safe —
  either a quorum of coordinators or a strongly consistent metadata store
  decides the ring, otherwise two halves of the cluster could claim the same
  range.
- Monitor migration progress, replica lag, and per-node disk/CPU so a slow leak
  becomes an alert, not an incident.

### Q5. How do you guarantee durability (WAL, snapshotting)?

Durability comes from the write-ahead log.

- Before acknowledging a write, the node fsyncs the operation to the WAL
  (append-only, ideally on its own device), then applies it in memory.
- On crash, the node replays the WAL to recover the last acknowledged state.
- The trade-off: an fsync per write caps throughput, so operations are
  group-committed and fsync is often relaxed to a few milliseconds, accepting a
  small window of potential loss in exchange for far higher write rates.

The WAL grows forever, so a background snapshotter periodically dumps the
in-memory tables to a snapshot/SSTable file, then truncates the WAL to the
snapshot point.

- Recovery loads the latest snapshot and replays only the WAL entries after it —
  fast startup.
- For a replicated store, durability also means replicas stay in sync: a replica
  that lags beyond the quorum window is marked out-of-sync and cannot become
  primary until it catches up or is re-synced from a snapshot.
- Data loss is bounded by the replication window, which is why quorum writes and
  per-request consistency levels — not just local fsync — define the store's
  durability contract.

## Source

```text
title: Key-Value Store
node client: Client [round, icon=browser]
node coordinator: Coordinator [icon=server]
node ring: Hash Ring [icon=cache]
node store: Storage Nodes [icon=compute]
node wal: Write-Ahead Log [icon=file]
node replicate: Replication [icon=sync]
node quorum: Quorum [icon=compute]
node snapshot: Snapshot Store [cylinder, icon=database]
node api: API Gateway [icon=server]

edge client -> api: get / put
edge api -> coordinator: route
edge coordinator -> ring: hash
edge ring -> store: locate
edge store -> wal: append
edge store -> replicate: propagate
edge replicate -> quorum: votes
edge quorum -> coordinator: confirm
edge store -> snapshot: dump
edge coordinator -> api: response
```
