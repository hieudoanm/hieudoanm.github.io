# Implementation notes

Focused reference for **cockroachdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

```sql
-- Retry loop in app: catch 40001, back off, re-run the transaction closure
func retryWrite(ctx, txn func(ctx) error) error { /* ... */ }
```

---

## 4. Reliability & Performance

- **Optimize queries to minimize node fan-out**
- **Batch writes inside transactions**; avoid long-running transactions
- Monitor **contention and retry rates** (`crdb_internal`, metrics)
- **Index carefully to avoid write amplification**
- Load-test with **realistic geography**; measure **tail latency, not just averages**
- Document **SLOs and consistency expectations**

---

## 5. General Rules of Thumb
