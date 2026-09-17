# SWR Best Practices: Starter Template

A reusable starting point derived from the **3. Mutations** section of [SWR Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import useSWRMutation from "swr/mutation";

async function createOrder(url, { arg }) {
  const res = await fetch(url, { method: "POST", body: JSON.stringify(arg) });
  if (!res.ok) throw new Error("create failed");
  return res.json();
}

const { trigger, isMutating } = useSWRMutation("/api/orders", createOrder);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
