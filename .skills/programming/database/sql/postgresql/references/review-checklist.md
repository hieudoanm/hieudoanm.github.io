# Review checklist

Focused reference for **postgresql**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. General Rules of Thumb

- **Integrity lives in the database** — constraints > app-only checks
- **Deliberate indexes over guessing** — validate with `EXPLAIN (ANALYZE, BUFFERS)`
- **Additive, versioned migrations** — avoid destructive changes; warn before them
- **Row counts and workload drive design** — toy examples hide real problems
- **Explicit beats implicit** — explicit joins, explicit types, explicit transactions

---

## Quick-Start Checklist

- [ ] Parameterized queries; no `SELECT *`; explicit joins
- [ ] Proper types (`uuid`, `timestamptz`, `numeric`); constraints (`NOT NULL`, `UNIQUE`, `CHECK`)
- [ ] FKs + DB-enforced integrity over app-only checks
- [ ] Normalized by default; denormalized only with justification
- [ ] Additive, versioned migrations; destructive changes warned + backed up
- [ ] Indexes validated with `EXPLAIN (ANALYZE, BUFFERS)` against query patterns
- [ ] Explicit transactions; isolation understood; no long-running transactions
- [ ] Bounded/keyset pagination; no unbounded result sets
- [ ] Least-privilege roles; parameterized everywhere; no plaintext secrets
- [ ] Test with production-like data and row counts
