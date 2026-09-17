# Workflow notes

Focused reference for **postgresql**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Data Modeling & Architecture

- **Normalize by default; denormalize intentionally**
- Choose correct types: `uuid`, `timestamptz`, `numeric` — not oversized text
- Use constraints: `NOT NULL`, `UNIQUE`, `CHECK`
- **Database-enforced integrity over app-only checks** (FKs, constraints)
- Design schemas around **query patterns**, not entities alone
- **Avoid premature partitioning** — partition when row counts and retention demand it
- Version migrations explicitly; treat schema changes as **operational events**

```sql
CREATE TABLE orders (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id),
  total       numeric(12,2) NOT NULL CHECK (total >= 0),
  status      text NOT NULL CHECK (status IN ('pending','paid','refunded')),
  created_at  timestamptz NOT NULL DEFAULT now()
);
```

---

## 3. Integrity & Safety

- Use **transactions** for multi-step operations
- Understand **isolation levels** and locking (`READ COMMITTED` default; `SERIALIZABLE` when needed)
- **Avoid long-running transactions** — they grow MVCC bloat and hold locks
- Be explicit about `ON DELETE` behavior (cascade/restrict/set null)
- **Back up before risky operations**; prefer logical safety over clever SQL tricks
- Warn loudly before `DELETE`/`UPDATE` without `WHERE`, `DROP`, or `TRUNCATE`

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = $1;
UPDATE accounts SET balance = balance + 100 WHERE id = $2;
COMMIT;
```
