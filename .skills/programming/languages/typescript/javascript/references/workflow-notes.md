# Workflow notes

Focused reference for **javascript-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

- **JSDoc for the public contract; default parameters + nullish coalescing over truthy traps:**

```js
/** @param {{ email: string, role?: string }} opts */
export function createUser({ email, role = "user" }) {
  return { email, role: role ?? "user" };
}
```

- **`??`/`?.` for null-ish; avoid `!x` swallowing `0`/`""`/`false` semantics.**
- **`Object.freeze` for constant config; `Map`/`Set` over ad-hoc objects for collections.**
- **Destructuring + spread for immutable-style updates; no hidden shared mutation.**

---

## 3. Async

- **async/await with `try/finally`, typed-ish promises; avoid unhandled rejections:**

```js
export async function load(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

- **Promise.all for parallel independent work; `finally` for cleanup (release handles, close sockets).**
- **Set `process.on("unhandledRejection")` (Node) or catch at the boundary; never silent `catch {}`.**
- **Prefer `for await...of` over `reduce`-with-promises for sequential async.**

---
