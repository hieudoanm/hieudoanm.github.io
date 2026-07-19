# Workflow notes

Focused reference for **llrt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Surface & Compatibility

- **LLRT supports a subset: no full Node DOM/node_modules surface — `node:` built-ins are minimized:**
- **Static-only require/import lives fine; dynamic-plugin ecosystems (fastify-style init) may not fit.**
- **Feature-detect (`typeof process !== "undefined"`, `typeof body` reach) at the seams:**

```js
if (typeof BinaryDecoder !== "undefined") { /* … */ }
```

- **Standard web globals (`fetch`, `URL`, `TextEncoder`) available — but CONFIRM at the pinned version.**

---

## 3. Cold Start & Bundle

- **Cold start = billed latency — keep bundles small, code shallow:**

```js
// minimal handler, imports flattened
export async function handler(event) {
  return { statusCode: 200, body: "pong" };
}
```
