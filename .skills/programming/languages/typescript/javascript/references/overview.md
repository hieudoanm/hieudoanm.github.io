# Overview

Focused reference for **javascript-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
