# 1. Core Concepts

Focused reference for **rocksdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **LSM tree**: memtable(s) → immutable memtables → SSTable files in increasing levels (L0→Ln), compacted in background.
- **Write path**: writes go into the write-ahead log (WAL) and memtable for crash safety + performance.
- **Read path**: check memtable, then SSTables via **Bloom filters** and **block cache**.
- Pluggable **compression** (Snappy, LZ4, Zstd), **checksums**, and **prefix extractors**.
- Column families group related key-value pairs; multiple CFs share the same DB metadata but separate memtables/SSTables.
