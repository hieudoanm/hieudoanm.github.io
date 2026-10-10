# V8 Best Practices: 2. Typed Arrays & Numeric Work

## Source guidance

This example applies the **2. Typed Arrays & Numeric Work** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Float64Array`/`Int32Array` for numeric buffers — flat, unboxed, SIMD-able:**
- **Heavy loops in typed-array land (not boxed Number objects); preallocate sizes.**
- **`ArrayBuffer` transfer via `structuredClone`/transferable for worker messages (zero-copy).**
- **Bitwise/Perf: integer-only math on integer-only code stays in Smi range; mixed types force deopt boxes.**

## Example

```js
const buf = new Float64Array(1024);
for (let i = 0; i < buf.length; i++) buf[i] = i * 0.5;
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for v8-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
