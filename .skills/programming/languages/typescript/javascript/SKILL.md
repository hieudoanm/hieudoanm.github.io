---
name: javascript-best-practices
description: Best practices for writing JavaScript (as distinct from TypeScript) — the plain-JS conventions for scripts, tooling, and running code. Use when writing, structuring, or reviewing JavaScript — covers types, modules, async, errors, DOM, and project conventions.
---

# JavaScript Best Practices

JavaScript is the **runtime language of the web and Node** — dynamically typed, prototype-based, with promises/async at the core. Practical "ours is JS, not TS" leans on **strict mode (`"use strict"`/ESM instead of sloppy), explicit typing discipline (JSDoc for API contracts), modules (`import`/`export`) over globals, async/await with explicit error handling, and default-parameter/nullish-cqality over truthy-traps.** JS prefers clarity: types are conventions you enforce, so encode them.

---

## 1. Modules & Strictness

- **ESM over CJS/globals; strict mode implicitly for modules:**

```js
// logger.js
export function log(msg) { console.log(new Date().toISOString(), msg); }

// main.js
import { log } from "./logger.js";
```

- **One export name per module (default for the main API); named for the rest.**
- **`"use strict"` explicitly for scripts (CJS); implicit for ESM.**

---

## 2. Types & Data (without TS)

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

## 4. Errors

- **Throw descriptive Errors; subclass for domain errors (`class RateLimitError extends Error`).**
- **Catch and rethrow with context (cause chains) — don't swallow types.**
- **Validate inputs at boundaries (functions/APIs); assert invariants early with clear messages.**

---

## 5. DOM & Browser JS

- **Query once, use listeners; never append inline handlers:**

```js
const btn = document.querySelector("[data-action='save']");
btn?.addEventListener("click", onSave);   // defer work off micro-task storms
```

- **`event.preventDefault()` intentionally; extend APIs with `export`, not globals.**
- **Use `requestAnimationFrame`/`setTimeout` for heavy work; profile listeners (`performance.now`).**
- **Never set `innerHTML` from untrusted data — `textContent`/sanitization for dynamic strings.**

---

## 6. Project & Tooling

- **`package.json` with `"type": "module"`; pinned deps (`package-lock.json` committed).**
- **Lint (`eslint`) enforces the style; a formatter (`prettier`) removes bikeshedding.**
- **Tests default (`node:test`/vitest/jest) with the harness matching Node's runtime.**
- **Node versions engine-pinned (`engines`); CI builds + tests single-job first, faster later.**

---

## General Rules of Thumb

- **ESM + strict; JSDoc types where TS isn't used.**
- **`??`/`?.` over truthy traps; `Map`/`Set` for collections.**
- **async/await + explicit errors; `finally` cleanup; no silent catches.**
- **DOM: addEventListener, query once, avoid injected HTML.**
- **Lint + format + test; engine-pinned, lockfile committed.**

---

## Quick-Start Checklist

- [ ] ESM modules; strict mode; `"type": "module"` in package.json
- [ ] JSDoc public contracts; defaults/`??`; no `!x` truth traps
- [ ] async/await with `try/finally`; `.catch` handled at boundaries
- [ ] Domain error subclasses; validated inputs
- [ ] `addEventListener`; `textContent` over innerHTML for untrusted data
- [ ] ESLint + prettier; tests wired; engine pinned; lockfile committed