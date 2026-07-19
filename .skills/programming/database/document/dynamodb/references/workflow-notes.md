# Workflow notes

Focused reference for **dynamodb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Data Modeling & Access Patterns

- **Start with access patterns first**; encode entity type and relationships in keys
- Use **composite keys deliberately** (PK + SK)
- Prefer **sparse GSIs** (only items having the attribute) over wide indexes
- **Limit item size and attribute sprawl**
- Use **prefix-based sort keys** for range queries
- **Design pagination into access patterns** (exclusiveStartKey)
- Model **one-to-many and many-to-many explicitly**
- **Document all supported queries per table**; avoid joins — precompute or duplicate when needed

```
PK            SK                    Type        Data
USER#alice    PROFILE               profile     {name, email}
USER#alice    ORDER#2024-01-01#id   order       {total, status}
ORDER#id      GSI1PK  = "STATUS#paid"  -> GSI for status queries
```

---

## 3. Security, Consistency & Data Safety

- Use **IAM roles with least privilege**; prefer **fine-grained access (condition keys)**
- Decide **consistency per operation** — eventual (default) vs strong
- Use **conditional writes** to prevent lost updates
- Use **transactions sparingly and intentionally** (2 items max, expensive)
- Encrypt sensitive attributes when required; understand **regional/global table implications**
