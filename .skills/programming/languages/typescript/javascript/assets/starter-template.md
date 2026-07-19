# JavaScript Best Practices: Starter Template

A reusable starting point derived from the **1. Modules & Strictness** section of [JavaScript Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
// logger.js
export function log(msg) { console.log(new Date().toISOString(), msg); }

// main.js
import { log } from "./logger.js";
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
