---
name: quickjs-best-practices
description: Best practices for embedding JavaScript with QuickJS — the small, embeddable JS engine conventions. Use when writing, structuring, or reviewing QuickJS deployments — covers embedding, context, isolation, memory limits, and integration with FFI/Rust bindings.
---

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

## 4. Property & C Interop

- **Define APIs via `JS_NewCFunction`/`JS_SetPropertyStr` — narrow surface, typed args:**

```c
JS_SetPropertyStr(ctx, global, "myFunc",
  JS_NewCFunction(ctx, my_c_func, "myFunc", 1));
```

- **Validate args (`JS_ToInt32`/`JS_ToCString` with is_tail checks) before trusting; return `JS_EXCEPTION` for errors.**

---

## 5. Async & Workers

- **QuickJS supports async via `JS_NewPromiseCapability` + internal event loop (SJRS):**
- **Workers (`JS_NewWorker`) with `SharedArrayBuffer` + `Atomics`; message passing structured-cloned.**
- **Keep the event-loop pump: `JS_ExecutePendingJob` for promise resolution ticks where supported.**

---

## 6. Rust & Bindings

- **Rust bindings (`quick-js`, `rquickjs`): rely on the safe wrapper's lifetime discipline — no manual `FreeValue`:**
- **`rquickjs` typed values/args (`TypedFunction`) reduce FFI foot-guns to near-zero.**
- **Pin the binding + engine versions; feature-gate unsupported globals (document compat).**

---

## General Rules of Thumb

- **One context per isolate; explicit `Free` discipline.**
- **Limits + interrupt for untrusted scripts — always.**
- **Narrow C-function surface; typed, validated args.**
- **Values you allocate you own and free.**
- **Rust: use safe bindings; pin versions.**

---

## Quick-Start Checklist

- [ ] `JS_NewRuntime`/`JS_NewContext` per isolate; freed on exit
- [ ] `JS_SetMemoryLimit`/`JS_SetMaxStackSize`/interrupt-set for untrusted
- [ ] Value ownership tagged; every alloc has a pair (`Free`/`Dup`)
- [ ] C functions narrow + arg-validated; `JS_EXCEPTION` on error
- [ ] Async/workers modeled; `rquickjs`/safe bindings in Rust
- [ ] Versions pinned; compatibility documented