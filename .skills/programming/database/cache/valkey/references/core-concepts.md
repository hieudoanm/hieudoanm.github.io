# 1. Core Concepts

Focused reference for **valkey**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- Keys are byte strings; values are data structures: strings, hashes, lists, sets, sorted sets, streams, Geohash, and more.
- Commands are atomic; many accept N keys (e.g., `MSET`, `EVAL`/Lua, transactions, pipelines).
- **Expiration**: per-key TTL; event-driven _expired-keys_ not lazy.
- **Modules** extend capabilities (e.g., RediSearch-compatible search, JSON types).
- Persistence: `RDB` snapshot, `AOF` append-only, or both.
