# Workflow notes

Focused reference for **cockroachdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Data Modeling & Architecture

- **Avoid monotonically increasing primary keys**; prefer UUIDs / well-distributed keys
- Design schemas to **reduce contention**
- Denormalize only when justified
- **Be careful with foreign keys in high-write paths** (parent/child contention)
- Plan schema changes explicitly
- **Design indexes for distributed execution**; consider **regional tables and locality**

---

## 3. Integrity & Consistency

- **Serializable isolation is the default—embrace it**, don't downgrade casually
- **Expect transaction retries under contention** (`40001 SQLSTATE` — retry with `max_retry` backoff)
- **Write application logic to be retry-safe** (transactions must be idempotent/rebuildable)
- Use **explicit transactions for correctness**
- Understand how **constraints are enforced globally** (across ranges; no scale down of integrity)
- Treat **clock skew and retries as normal behavior**, not anomalies
