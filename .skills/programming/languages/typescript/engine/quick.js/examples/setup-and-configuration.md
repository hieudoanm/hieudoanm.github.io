# QuickJS Best Practices: 1. Embedding Model

## Source guidance

This example applies the **1. Embedding Model** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Runtime → context → values; keep one context per isolate/task:**
- **Lifetime: create/frame per unit of work; free values you hold; free contexts it flows through.**
- **`JS_Eval` with explicit filename for readable errors; catch via `JS_IsException` + `JS_GetException`.**

## Example

This excerpt is from the cited **1. Embedding Model** section.

```c
JSRuntime *rt = JS_NewRuntime();
JSContext *ctx = JS_NewContext(rt);
JSValue r = JS_Eval(ctx, "1+2", 4, "<input>", 0);
JS_FreeValue(ctx, r);
JS_FreeContext(ctx);
JS_FreeRuntime(rt);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for quickjs-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
