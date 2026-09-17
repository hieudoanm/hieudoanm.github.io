# Overview

Focused reference for **quickjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# QuickJS Best Practices

QuickJS is **a small, embeddable JS engine (nice perf, Tiny footprint) — used by Bun, deno, and as the embedded interpreter in many products** via the C library and Rust bindings. Practical QuickJS embeds in lean on **one `JSContext` per isolate with explicit lifetimes (`JS_NewRuntime`/`JS_NewContext`), memory limits and interrupts configured (`JS_SetMemoryLimit`, `JS_SetMaxStackSize`), and a tight object-lifecycle discipline (`JS_FreeValue`)** — the engine gives you the foot-gun ammo; containment is the discipline.

---

## 1. Embedding Model

- **Runtime → context → values; keep one context per isolate/task:**

```c
JSRuntime *rt = JS_NewRuntime();
JSContext *ctx = JS_NewContext(rt);
JSValue r = JS_Eval(ctx, "1+2", 4, "<input>", 0);
JS_FreeValue(ctx, r);
JS_FreeContext(ctx);
JS_FreeRuntime(rt);
```

- **Lifetime: create/frame per unit of work; free values you hold; free contexts it flows through.**
- **`JS_Eval` with explicit filename for readable errors; catch via `JS_IsException` + `JS_GetException`.**

---

## 2. Limits & Interrupts
