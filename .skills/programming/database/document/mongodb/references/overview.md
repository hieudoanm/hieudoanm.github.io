# Overview

Focused reference for **mongodb**, excerpted from SKILL.md. The skill file remains the canonical guide.

# MongoDB Best Practices

MongoDB is a document database whose performance hinges on **schema design**, not SQL-style normalization. Best practice is designing documents around **query patterns**: embed for one-to-few, reference for fan-outs, index deliberately, never scan collections, and plan shard keys before scaling.

---

## 1. Core Stack & Constraints

- MongoDB **6+**
- **Design schema before writing queries**
- **Avoid unbounded document growth** and deeply nested arrays
- Avoid documents approaching the **16MB size limit**
- **Always define indexes intentionally**; no collection scans in production
- Avoid **dynamic field names** unless required; avoid `$where`/server-side JS
- Use **transactions only when truly needed** (single-document ops are atomic)
- Treat **ObjectId usage deliberately** (id-sortable but reveals timing)

```js
// Embed for one-to-few; reference for many-to-many / large fan-outs
{
  _id: ObjectId("..."),
  user: "alice",
  addresses: [{ type: "home", street: "..." }], // embedded
  orderIds: [ObjectId("...")]                   // referenced
}
```
