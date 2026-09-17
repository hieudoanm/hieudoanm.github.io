# JavaScriptCore Best Practices: 1. Shapes & Caching

## Source guidance

This example applies the **1. Shapes & Caching** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Stable property layout per constructor — JSC caches on shapes; same discipline as V8:**
- **Precreate objects fully; adding keys later in hot code forces re-transition.**
- **Same-type slots (`number` stays number); polymorphic-dispatch sites slow — normalize at the call seam.**

## Example

```js
function Vec(x, y) { this.x = x; this.y = y; }   // same shape every new Vec
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for javascript-core-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
