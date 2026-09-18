---
name: apache-cassandra
description: Apache Cassandra — open-source NoSQL wide-column distributed database designed for high availability and horizontal scale across many commodity servers.
---

Apache Cassandra is a **distributed wide-column NoSQL database** built for **horizontal scalability, high availability, and tunable consistency** across many commodity servers, using a **peer-to-peer ring** architecture.

## 1. Core Concepts

- **Keyspaces** are top-level namespaces; **tables** hold rows of columns within them.
- **Primary key** = partition key + clustering columns: partitions distribute data via a token ring, clustering orders rows within a partition.
- **Peer-to-peer ring**: every node is equal; data is replicated across nodes per **replication factor**.
- **Tunable consistency**: `QUORUM`, `ONE`, `LOCAL_QUORUM`, `LOCAL_ONE`, `ALL` per read/write.
- **CQL** is the query language — SQL-like but with **no joins, no update-triggered set ops, no multi-row transactions** in general.

## 2. Data Modeling

- **Query-first**: design tables around the exact queries you will run; denormalize freely.
- Partition by the entity's natural grouping (e.g., user ID); cluster by time or attribute for ordered scans within a partition.
- Avoid unbounded partitions (a single partition key holding millions of rows) — they cause hot spots and latency spikes.
- Use **materialized views** (with care) or **secondary indexes** sparingly for lookups that do not start with the partition key.
- **Time-series**: cluster by timestamp; bucket high-write streams by hour/day to spread load.

## 3. Indexing and Queries

- The **primary partition key determines distribution**; `WHERE` clauses must typically start with the partition key (or a secondary index/MV).
- **Secondary indexes** (SASI/legacy) are best for low-cardinality filters on small data; avoid for hot paths.
- **Batches**: `BEGIN BATCH ... APPLY BATCH` for atomic multi-partition writes — not for bulk loading.
- **Lightweight transactions (LWT)**: `INSERT ... IF NOT EXISTS` for compare-and-swap semantics (heavier cost).

## 4. Consistency and Availability

- Choose consistency based on the access pattern: `LOCAL_QUORUM` for most production reads/writes; `ONE` for last-write-wins caches.
- Understand the **consistency vs availability** trade-off — Cassandra favors availability; `ALL` with a down replica means failed requests.
- Use `CL` per requirement: e.g., `QUORUM` writes + `LOCAL_QUORUM` reads for balance.
- Repair (`nodetool repair`) keeps replicas consistent over time — schedule it!

## 5. Operations and Capacity Planning

- Deploy in an odd number of nodes per DC; enable **rack awareness**.
- Right-size **`replication_factor`** (`RF=3` typical) and use **NetworkTopologyStrategy**.
- **`Nodetool`**: `status`, `info`, `repair`, `compaction`, `snapshot`, `tpstats`.
- **Compaction strategies**: SizeTiered (default), Leveled (for reads), TimeWindow (for time-series); tune per workload.
- Capacity: plan around disk, GC pauses, and heap; monitor `nodetool tpstats` (timeouts, dropped) and latency percentiles.

## 6. Common Pitfalls

- Missing a partition key → full-partition scans that overwhelm nodes.
- `ALLOW FILTERING` on large tables → full cluster scan.
- Unbounded partitions and hot partition keys.
- Ignoring repair → silent diverging replicas.
- Assuming Cassandra provides ACID transactions like relational DBs.

## General Rules of Thumb

- Model tables per query, not per entity — denormalization is expected.
- Keep partitions bounded (A few hundred MB), spread writes, and use bucket keys for hot paths.
- Prefer `LOCAL_QUORUM` as a default; escalate consistency only where needed.
- Schedule regular `nodetool repair` and monitor compaction backlog.

## Quick-Start Checklist

- [ ] Design keyspace with `NetworkTopologyStrategy` and RF per DC.
- [ ] Design query-shaped tables with primary key + clustering key.
- [ ] Bound partition sizes; add time-bucket keys for high-write data.
- [ ] Prefer full partition-key queries; avoid `ALLOW FILTERING`.
- [ ] Configure read/write consistency (`LOCAL_QUORUM` default).
- [ ] Use LWT only where conditional writes are mandatory (higher cost).
- [ ] Schedule repairs; monitor `nodetool tpstats`, latency, and GC.
- [ ] Plan backups via snapshot + sstableloader restore path.