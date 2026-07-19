# Workflow notes

Focused reference for **opensearch**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Indexing & Data Modeling

- **Design mappings before indexing data**
- **Separate `text` and `keyword` intentionally**; choose analyzers per language/behavior
- **Avoid mapping explosions** from unbounded field names
- **Prefer denormalization over joins**
- **Control shard count deliberately**; use **index aliases for versioning and migrations**
- **Plan re-indexing as a normal lifecycle operation**

---

## 3. Security & Governance

- **Enable and configure the OpenSearch Security plugin**
- Use **least-privilege roles**; **separate read, write, and admin permissions**
- **Never expose cluster-admin credentials to applications**
- **Audit destructive operations**; protect **snapshot repositories**
- Treat **index deletion and close operations as dangerous**
