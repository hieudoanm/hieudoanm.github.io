# 1. Core Concepts

Focused reference for **badger**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- Key-value pairs with **ordered byte keys**; supports prefix scans and range iterations.
- LSM tree for keys + metadata; separate **value log (vLog)** for large values to reduce write amplification.
- Transactions are optimistic and ACID; use `NewTransaction` + `Set`/`Delete` + `Discard`.
- TTL and expiration per key: set via `entry.ExpiresAt`.
- Supports streaming (ordered bulk reads) and batch writes for bulk operations.
