# Workflow notes

Focused reference for **nano-stores-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`store.listen` for passive listeners; `subscribe` fires immediately with current value — know which you need.**
- **Unsubscribe in teardown** (the bindings handle it; manual subscribers must not leak).

---

## 3. Derived & Computed Stores

- **`computed` maps sources to derived values — memoized, dependency-tracked:**

```ts
export const total = computed([count, price], (c, p) => c * p);
```

- **No manual sync** — computed stores derive purely from their sources.
- **`computed` accepts async sources (`computed([p], async (p) => ...)`)** but stay pure: the value resolves externally.

---

## 4. Actions & Mutations

- **`action(store, name, fn)` wraps mutations — validation + intended writes in one place:**

```ts
export const addToCart = action(cart, "addToCart", (store, item: Item) => {
  if (!item.available) return;
  store.set([...store.get(), item]);
});
```

- **Mutations go through `action`s** — readable event-shaped updates; validation at the store boundary.
- **`map.setKey`/`map.update` for structured mutations — keep granular, avoid whole-store ripples.**
