# Review checklist

Focused reference for **apache-trino-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Governance & Reproducibility

- **Version-pin server/connectors; schema versioning in catalogs (`use catalog-versioned objects`).**
- **Idempotent DDL — `IF NOT EXISTS` / `IF EXISTS`; migrations via verified SQL.**
- **Golden-query regression suite against the same snapshot; security: least-priv accounts per catalog.**

---

## General Rules of Thumb

- **`catalog.schema.table` always; set-based statements.**
- **Push down filters/joins; keep `SELECT *` rare.**
- **Hints (broadcast) + bucketing on join keys; EXPLAIN distributed first.**
- **Resource groups bound tenants; timeouts/memory set.**
- **SQL migrated idempotently; versions pinned; least-priv connectors.**

---

## Quick-Start Checklist

- [ ] Fully-qualified `catalog.schema.table`; per-catalog semantics known
- [ ] Filters/pushdown exploited; projections narrow
- [ ] Join hints + bucketing matched; `EXPLAIN DISTRIBUTED` reviewed
- [ ] Table layout: partition by filter dimension, bucket by join key
- [ ] Resource groups + timeout/memory limits configure per tenant
- [ ] Idempotent DDL + versioned catalogs; golden-query regression tests
