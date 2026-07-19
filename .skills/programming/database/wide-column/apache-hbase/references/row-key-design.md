# 2. Row Key Design

Focused reference for **apache-hbase**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Row Key Design

- Row keys define locality, range scans, and hotspot avoidance.
- **Pre-split tables** to avoid the initial single-region fork in the road.
- Avoid monotonically increasing keys (e.g., timestamps) creating a single hot region — use keys with **salting** (bucket prefix) or plain hashing.
- Keep keys short (tens of bytes) to save memory; consider compound keys (`userid:timestamp`) for ordered time-series.
- Use binary/encoding over textual hex for space and comparison efficiency where it matters.
