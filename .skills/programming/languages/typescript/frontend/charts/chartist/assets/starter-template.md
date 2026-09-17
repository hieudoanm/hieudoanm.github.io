# Chartist Best Practices: Starter Template

A reusable starting point derived from the **1. Creating Charts** section of [Chartist Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
import Chartist from "chartist";

const chart = new Chartist.Line(".chart", {
  labels: ["Jan", "Feb", "Mar"],
  series: [[10, 20, 15]],
}, {
  fullWidth: true,
  chartPadding: { right: 20 },
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
