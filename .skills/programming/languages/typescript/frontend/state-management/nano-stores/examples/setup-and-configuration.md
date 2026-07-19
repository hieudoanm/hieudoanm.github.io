# Nano Stores Best Practices: 2. Reading & Reactivity

## Source guidance

This example applies the **2. Reading & Reactivity** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Subscribe via `store.subscribe(listener)`; components use the binding (`useStore`):**
- **`store.listen` for passive listeners; `subscribe` fires immediately with current value — know which you need.**
- **Unsubscribe in teardown** (the bindings handle it; manual subscribers must not leak).

## Example

```ts
// React
import { useStore } from "@nanostores/react";
const n = useStore(count);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for nano-stores-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
