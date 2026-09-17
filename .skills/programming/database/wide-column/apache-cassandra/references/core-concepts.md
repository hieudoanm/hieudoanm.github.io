# 1. Core Concepts

Focused reference for **apache-cassandra**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **Keyspaces** are top-level namespaces; **tables** hold rows of columns within them.
- **Primary key** = partition key + clustering columns: partitions distribute data via a token ring, clustering orders rows within a partition.
- **Peer-to-peer ring**: every node is equal; data is replicated across nodes per **replication factor**.
- **Tunable consistency**: `QUORUM`, `ONE`, `LOCAL_QUORUM`, `LOCAL_ONE`, `ALL` per read/write.
- **CQL** is the query language — SQL-like but with **no joins, no update-triggered set ops, no multi-row transactions** in general.
