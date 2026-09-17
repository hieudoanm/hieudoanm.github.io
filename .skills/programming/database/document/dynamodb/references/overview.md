# Overview

Focused reference for **dynamodb**, excerpted from SKILL.md. The skill file remains the canonical guide.

# DynamoDB Best Practices

DynamoDB scales automatically but only for the **access patterns you design for**. Best practice is access-pattern-first modeling: partition key + sort key encode relationships, GSIs are sparse and deliberate (each costs money), `Scan` is avoided, and every item has a clear query purpose.

---

## 1. Core Stack & Constraints

- **Design for queries, not tables** — model access patterns first
- **Avoid `Scan` in production** — query with keys/GSIs
- **One table unless there is a strong reason otherwise**
- **Every item must have a clear access purpose**
- Avoid **unbounded item collections** and **hot partitions**
- **Use GSIs intentionally** — each GSI costs storage + write capacity
- Be explicit about **consistency requirements**; don't rely on secondary filtering for core queries
- **Assume schema evolution over time**

---
