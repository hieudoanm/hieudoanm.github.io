# QuickJS Best Practices: Starter Template

A reusable starting point derived from the **1. Embedding Model** section of [QuickJS Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```c
JSRuntime *rt = JS_NewRuntime();
JSContext *ctx = JS_NewContext(rt);
JSValue r = JS_Eval(ctx, "1+2", 4, "<input>", 0);
JS_FreeValue(ctx, r);
JS_FreeContext(ctx);
JS_FreeRuntime(rt);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
