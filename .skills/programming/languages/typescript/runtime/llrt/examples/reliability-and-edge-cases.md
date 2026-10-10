# LLRT Best Practices: 2. Surface & Compatibility

## Source guidance

This example applies the **2. Surface & Compatibility** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **LLRT supports a subset: no full Node DOM/node_modules surface — `node:` built-ins are minimized:**
- **Static-only require/import lives fine; dynamic-plugin ecosystems (fastify-style init) may not fit.**
- **Feature-detect (`typeof process !== "undefined"`, `typeof body` reach) at the seams:**
- **Standard web globals (`fetch`, `URL`, `TextEncoder`) available — but CONFIRM at the pinned version.**

## Example

```js
if (typeof BinaryDecoder !== "undefined") { /* … */ }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for llrt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
