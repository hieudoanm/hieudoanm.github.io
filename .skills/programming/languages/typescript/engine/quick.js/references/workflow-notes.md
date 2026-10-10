# Workflow notes

Focused reference for **quickjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Set memory + stack + interrupt handler before untrusted input:**

```c
JS_SetMemoryLimit(rt, 64 * 1024 * 1024);
JS_SetMaxStackSize(rt, 256 * 1024);
JS_SetInterruptHandler(rt, my_interrupt, NULL);
```

- **Interrupt handler returns nonzero to stop runaway loops — essential for untrusted scripts.**
- **Memory limits tied to per-app budgets; never embed untrusted code without them.**

---

## 3. Values & Objects

- **`JSValue` ownership: you own what you allocate — free everything:**

```c
JSValue v = JS_NewString(ctx, "hello");
// use v
JS_FreeValue(ctx, v);
```

- **`JS_NewObject`/`JS_NewFunction` freed deliberately (they're rooted by reference count — use `JS_DupValue` for persistent handles).**
- **Persistent references via `JS_DupValue`/`JS_FreeValue` pairs — leak on omission.**

---
