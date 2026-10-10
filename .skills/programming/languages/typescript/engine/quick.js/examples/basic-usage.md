# QuickJS Best Practices: Basic Usage

Best practices for embedding JavaScript with QuickJS — the small, embeddable JS engine conventions. Use when writing, structuring, or reviewing QuickJS deployments — covers embedding, context, isolation, memory limits, and integration with FFI/Rust bindings.

## Scenario

Use this example as a starting point when applying **quickjs-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Embedding Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```c
JSRuntime *rt = JS_NewRuntime();
JSContext *ctx = JS_NewContext(rt);
JSValue r = JS_Eval(ctx, "1+2", 4, "<input>", 0);
JS_FreeValue(ctx, r);
JS_FreeContext(ctx);
JS_FreeRuntime(rt);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
