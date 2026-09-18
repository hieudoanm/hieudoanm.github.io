---
name: couchbase
description: Couchbase — distributed JSON document database with N1QL, key-value access, and built-in caching by the Memcached protocol.
---

Couchbase combines **document storage, key-value access, N1QL querying, full-text search, and built-in caching** in one distributed database designed for low-latency, high-throughput workloads.

## 1. Core Concepts

- **Buckets** are the top-level containers (like databases) that hold documents.
- **Scopes and collections** (Couchbase Server 7+) provide hierarchical organization within a bucket, analogous to schemas/tables.
- **Documents** are JSON payloads with a unique key per collection.
- **N1QL** is the SQL-like query language for JSON, supporting joins, indexes, and subqueries.
- **Indexes** are required for N1QL queries other than primary-key lookups; build them explicitly.

## 2. Access Patterns

- **Key-value** operations (get/set/upsert) for single-document access: the lowest latency path, consistent with the memory-first design.
- **N1QL queries** for analytical or ad-hoc lookups; require a primary or secondary index to be efficient.
- **Full-text search (FTL)** via index/query (built on FTS) for fuzzy, language-aware search.
- **Subdocument operations** to mutate parts of a document without fetching the whole JSON.
- **Durability**: wait for persistence or replication with `MutationResult.durability` in SDKs.

## 3. Indexing Strategy

- Create **secondary indexes** on the fields you filter/order by.
- **Defer the primary index** on large buckets — it is only needed as a fallback for full scans.
- Use **covering indexes** with `USING GSI` and `INDEX_ADVISOR` `EXPLAIN` to verify index usage.
- Name indexes meaningfully and drop unused ones; index memory costs real RAM.

## 4. Operational Model

- **Replication**: each bucket is distributed across servers by `vBucket` (default 1024). Set replica count (1–3) per bucket.
- **Rebalance** redistributes data when nodes join/leave; avoid it during heavy traffic spikes.
- **Memory**: Couchbase is a memory-first database. Use **data-bucket quotas** to size cache per server and monitor eviction/`ep_bgm_fetched`.
- **Swap-low-watermark / high-watermark** govern eviction; keep host memory allocation sane for the OS.
- Use **XDCR** (cross-datacenter replication) for disaster recovery and active-active topologies.

## 5. Working with the SDKs

- Use the official SDKs (`couchbase` npm / `couchbase` PyPI / Java / Go / .NET).
- Connect once and reuse the cluster handle; handle `AmbiguousTimeoutError`, `DocumentNotFoundException`, and `CasMismatchException` in application logic.
- Use **CAS (compare-and-swap)** for optimistic concurrency on document updates.
- Acquire **locks** only briefly; prefer CAS over blocking document locks.

## 6. Common Pitfalls

- Querying N1QL without indexes → full bucket scans and timeouts.
- Treating buckets like SQL schemas and over-normalizing JSON.
- Ignoring **replica/durability** settings in environments that require durability guarantees.
- Using a bucket per tenant at high scale — prefer a shared bucket with scope/collection partitioning.
- Not planning for **garbage collection of tombstones** and expired documents (`TTL`).

## General Rules of Thumb

- Use key-value access when you have a known document key; use N1QL when you need to query many documents.
- Always build indexes before going to production, and test with `EXPLAIN`.
- Budget bucket quotas from peak working-set size, not total data volume.
- Design documents to be **append-tolerant for MVCC** — prefer subtopology over destructive rewrites where possible.

## Quick-Start Checklist

- [ ] Design buckets, scopes, collections, and granular permissions (`RBAC`).
- [ ] Model the access patterns: decide which flows are KV vs N1QL vs FTS.
- [ ] Create indexes for all filter/order fields; verify with `EXPLAIN`.
- [ ] Set replicas, durability requirements, and TTLs.
- [ ] Configure bucket memory quotas sized to the working set.
- [ ] Wire the SDK with connection pooling, retries, and CAS-based updates.
- [ ] Add XDCR for disaster recovery where required.
- [ ] Add monitoring for eviction rate, latency percentiles, and rebalance health.