# Review checklist

Focused reference for **quickjs-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
