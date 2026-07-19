# Workflow notes

Focused reference for **mongodb**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Data Modeling & Architecture

- Model data around **query patterns**, not entities
- **Prefer embedding for one-to-few** relationships; **referencing for many-to-many or large fan-outs**
- Keep documents **self-contained** when possible; avoid `$lookup` unless justified
- Design for **read performance first**
- **Version document schemas explicitly**; use soft deletes intentionally
- Avoid **polymorphic documents** unless well-documented

---

## 3. Security & Data Integrity

- **Never expose MongoDB directly to the public internet**
- Enable **authentication + role-based access control**; least-privilege users
- **Validate data at the application layer**; consider **schema validation (`$jsonSchema`)**
- Encrypt sensitive fields if required
- Be explicit about **consistency and durability expectations** (write concern, read concern)
