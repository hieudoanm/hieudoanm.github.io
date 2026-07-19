---
name: swr-best-practices
description: Best practices for data fetching with SWR — the React hooks data-revalidation conventions for Vercel-style apps. Use when writing, structuring, or reviewing SWR — covers keys, fetcher, revalidation, mutations, fallback, and caching.
---

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

## 4. Fallback & Hydration

- **SSR/CSR fallback — `fallback` map pre-seeds SWR cache:**

```tsx
<SWRConfig value={{ fallback: { "/api/orders": seededOrders } }}>
  <App />
</SWRConfig>
```

- **`SWRConfig` global defaults (fetcher, interval, keySerializer) centralized.**
- **Preload via `preload(key, fetcher)` for the fast path.**

---

## 5. Loading & Errors

- **`{ data, error, isLoading, isValidating }` named — states rendered distinctly:**

```tsx
const { data, error, isLoading, isValidating } = useOrders();
if (isLoading) return <Spinner />;
if (error) return <ErrorDetail status={error.status} />;
```

- **`isValidating` signals background refetch — never block UI on it.**
- **Error shape normalized in the fetcher (`HTTP n`) for consistent UI.**

---

## 6. Performance & Tuning

- **Deduping is automatic; `keepPreviousData` minimal flicker via key pattern.**
- **Massive lists: paginate/infinite (`useSWRInfinite`); cap response sizes.**
- **Devtools (`@swr-devtools`) inspect the cache; test with `mutate` in RTL.**

---

## General Rules of Thumb

- **Key = cache identity; fetcher the typed seam.**
- **Revalidation strategy explicit (focus/interval/offline).**
- **`useSWRMutation`/optimistic for writes; rollback on error.**
- **`SWRConfig` fallback + defaults; distinct loading/error/validating states.**
- **Infinite/pagination via `useSWRInfinite`; dedupe default on.**

---

## Quick-Start Checklist

- [ ] Module-scope typed `fetcher`; stable keys per resource
- [ ] `refreshInterval`/`revalidateOnFocus` deliberate per data type
- [ ] `useSWRMutation` + optimistic updates with rollback
- [ ] `SWRConfig` fallback/fetcher centralized; `preload` fast path
- [ ] `isLoading`/`error`/`isValidating` rendered distinctly
- [ ] `useSWRInfinite` for lists; dedupe interval tuned