# Workflow notes

Focused reference for **swr-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Focus/interval/offline revalidation configured deliberately:**

```ts
useSWR("/api/status", fetcher, {
  refreshInterval: 30_000,     // real-time polling where needed
  revalidateOnFocus: true,
  dedupingInterval: 5_000,     // dedupe bursts
});
```

- **Default revalidation keeps freshness; disable where the data is static (`revalidateIfStale: false`).**
- **`focused`/`disconnected` policies per data temperament — don't blanket-disable.**

---

## 3. Mutations

- **`useSWRMutation`/`mutate` for post-data changes — optimistic UI + rollback:**

```ts
import useSWRMutation from "swr/mutation";

async function createOrder(url, { arg }) {
  const res = await fetch(url, { method: "POST", body: JSON.stringify(arg) });
  if (!res.ok) throw new Error("create failed");
  return res.json();
}

const { trigger, isMutating } = useSWRMutation("/api/orders", createOrder);
```

- **Optimistic: `mutate(local, { optimisticData, rollbackOnError })` (SWR v2 syntax for the exact hook).**
- **Cross-key cache updates via `mutate` bound keys — no manual cache poking beyond the API.**

---
