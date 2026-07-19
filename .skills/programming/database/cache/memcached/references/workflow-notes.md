# Workflow notes

Focused reference for **memcached**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Architecture & Design

- Use Memcached only for **hot, recomputable data**
- Prefer the **cache-aside** pattern: read cache → on miss, load DB, populate cache
- **Design idempotent cache fills** and **handle cache misses gracefully**
- **Avoid key explosion** (caches of caches, per-request variants)
- Use **consistent hashing** so node changes cause minimal invalidation
- Treat **cache invalidation as best-effort**; assume **partial cache availability**
- **Document cache keys and TTL rationale**

```

function getUserProfile(id) {
  const key = `user:${id}:profile`;               // short, deterministic
  const hit = memcached.get(key);
  if (hit) return hit;                             // cache hit
  const profile = db.loadUserProfile(id);          // miss -> source of truth
  memcached.set(key, profile, 300);                // idempotent fill, explicit TTL
  return profile;
}
```

---

## 3. Security & Data Safety
