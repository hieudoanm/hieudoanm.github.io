# Workflow notes

Focused reference for **redis**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Architecture & Design

- **One responsibility per keyspace**; model data around **access patterns**
- **Prefer Hashes over many small keys** (`HMSET user:42 {name,email,level}`)
- Use **Sets/ZSets for membership and ranking**; **Streams for event-like workloads**
- Use **Lua scripts** for atomic multi-step logic
- **Design idempotent writes** where possible
- Document **eviction behavior and failure modes**
- **Separate cache, queue, and coordination concerns** into distinct keyspaces/instances

---

## 3. Security & Data Safety

- **Never expose Redis to the public internet**
- Use **authentication** (`requirepass` / **ACLs**); **limit commands via ACLs** where possible
- **Do not store sensitive data unless encrypted**
- Be **explicit about persistence guarantees**; assume data can be lost unless configured (RDB snapshots, AOF)
