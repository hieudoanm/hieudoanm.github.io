# Review checklist

Focused reference for **swr-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
