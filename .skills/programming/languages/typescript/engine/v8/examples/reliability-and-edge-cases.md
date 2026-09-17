# V8 Best Practices: 6. Multi-Threading (Workers)

## Source guidance

This example applies the **6. Multi-Threading (Workers)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Worker`/`SharedArrayBuffer` for parallel compute; `Atomics` for synchronization:**
- **Transferables over postMessage copies for buffers — task units sized to shared allocs.**
- **Lock discipline: `Atomics.wait/notify` patterns, never busy-poll.**

## Example

```js
const sab = new SharedArrayBuffer(1024);
const a = new Int32Array(sab);
Atomics.add(a, 0, 1);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for v8-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
