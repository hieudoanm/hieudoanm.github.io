# Overview

Focused reference for **swr-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# SWR Best Practices

SWR (**stale-while-revalidate**) is a **React data-fetching hooks library** — `useSWR(key, fetcher)` with caching, revalidation, focus refetch, and dedupe. Practical SWR leans on **a single typed `fetcher` per app, `key` = cache identity, `mutate`/`optimistic` updates for mutations, and revalidation strategy deliberate (focus/interval/throttle)** — the key is the cache contract; the fetcher is the seam.

---

## 1. Keys & FETCHERS

- **Keys are the cache identity — stable strings/arrays:**

```ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
});

function useOrders() {
  return useSWR("/api/orders", fetcher);
}
```

- **Keys: serializable, unique per resource; object keys (arrays) supported — stable references critical.**
- **One `fetcher` module-scope (typed); per-route params live in the key array (`["/api/orders", id]`).**

---

## 2. Revalidation Strategy
