# Nano Stores Best Practices: Starter Template

A reusable starting point derived from the **1. Stores: atom, map, and signals** section of [Nano Stores Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import { atom, map } from "nanostores";

export const count = atom(0);
export const user = map<User>({ name: "", roles: [] });
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
