# Implementation notes

Focused reference for **quickjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
