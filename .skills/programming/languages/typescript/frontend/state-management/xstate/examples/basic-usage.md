# XState Best Practices: Basic Usage

Best practices for modeling state machines with XState — the statechart conventions for events/actions/guards. Use when writing, structuring, or reviewing XState (v5) — covers machines, states/transitions, actions, guards, actors, and testing.

## Scenario

Use this example as a starting point when applying **xstate-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Defining a Machine** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { createMachine } from "xstate";

export const fetchMachine = createMachine({
  id: "fetch",
  initial: "idle",
  context: { data: null as Item[] | null, error: null as string | null },
  states: {
    idle: { on: { FETCH: "loading" } },
    loading: {
      on: {
        SUCCESS: { target: "ready", actions: "assignData" },
        FAILURE: { target: "error", actions: "assignError" },
      },
    },
    ready: { on: { FETCH: "loading" } },
    error: { on: { RETRY: "loading", FETCH: "loading" } },
  },
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
