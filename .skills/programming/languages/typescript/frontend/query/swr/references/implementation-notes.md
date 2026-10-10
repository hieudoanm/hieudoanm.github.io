# Implementation notes

Focused reference for **swr-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
