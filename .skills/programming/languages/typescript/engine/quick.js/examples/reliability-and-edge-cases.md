# QuickJS Best Practices: 3. Values & Objects

## Source guidance

This example applies the **3. Values & Objects** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`JSValue` ownership: you own what you allocate — free everything:**
- **`JS_NewObject`/`JS_NewFunction` freed deliberately (they're rooted by reference count — use `JS_DupValue` for persistent handles).**
- **Persistent references via `JS_DupValue`/`JS_FreeValue` pairs — leak on omission.**

## Example

```c
JSValue v = JS_NewString(ctx, "hello");
// use v
JS_FreeValue(ctx, v);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for quickjs-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
