# JavaScript Best Practices: 2. Types & Data (without TS)

## Source guidance

This example applies the **2. Types & Data (without TS)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **JSDoc for the public contract; default parameters + nullish coalescing over truthy traps:**
- **`??`/`?.` for null-ish; avoid `!x` swallowing `0`/`""`/`false` semantics.**
- **`Object.freeze` for constant config; `Map`/`Set` over ad-hoc objects for collections.**
- **Destructuring + spread for immutable-style updates; no hidden shared mutation.**

## Example

```js
/** @param {{ email: string, role?: string }} opts */
export function createUser({ email, role = "user" }) {
  return { email, role: role ?? "user" };
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for javascript-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
