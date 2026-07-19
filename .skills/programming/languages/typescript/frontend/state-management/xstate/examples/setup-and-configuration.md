# XState Best Practices: 3. Actions & Effects

## Source guidance

This example applies the **3. Actions & Effects** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Actions are pure or `actor`-mediated side effects — named, testable:**
- **`invoke` for async workers** — `actor` spawns; `onDone`/`onError` transitions (no raw promise handling in transitions).
- **Actions that perform I/O belong in invoked actors, not the transitions themselves.**

## Example

```ts
actions: {
  assignData: assign({ data: (_, e) => e.data }),
  logError:  () => console.error("fail"),   // external side effect: keep it small
},
loading: { invoke: { src: "fetchItems", onDone: { target: "ready", actions: "assignData" }, onError: { target: "error", actions: "assignError" } } },
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for xstate-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
