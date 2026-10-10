# QuickJS Best Practices: Workflow Checklist

A practical run sheet for applying [QuickJS Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Embedding Model: **Runtime → context → values; keep one context per isolate/task:**
- [ ] 1. Embedding Model: **Lifetime: create/frame per unit of work; free values you hold; free contexts it flows through.**
- [ ] 2. Limits & Interrupts: **Set memory + stack + interrupt handler before untrusted input:**
- [ ] 2. Limits & Interrupts: **Interrupt handler returns nonzero to stop runaway loops — essential for untrusted scripts.**
- [ ] 3. Values & Objects: **JSValue ownership: you own what you allocate — free everything:**
- [ ] 3. Values & Objects: **JS_NewObject/JS_NewFunction freed deliberately (they're rooted by reference count — use JS_DupValue for persistent handles).**
- [ ] 4. Property & C Interop: **Define APIs via JS_NewCFunction/JS_SetPropertyStr — narrow surface, typed args:**
- [ ] 4. Property & C Interop: **Validate args (JS_ToInt32/JS_ToCString with is_tail checks) before trusting; return JS_EXCEPTION for errors.**
- [ ] 5. Async & Workers: **QuickJS supports async via JS_NewPromiseCapability + internal event loop (SJRS):**
- [ ] 5. Async & Workers: **Workers (JS_NewWorker) with SharedArrayBuffer + Atomics; message passing structured-cloned.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
