# Implementation notes

Focused reference for **nano-stores-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Persistence & Integration

- **`persist` from `@nanostores/persistent` or a small adapter** — namespaced keys, validated reads:

```ts
import { persist } from "@nanostores/persistent";
export const theme = persist("app:theme", "light", { encode: JSON.stringify, decode: JSON.parse });
```

- **Storage is untrusted** — validate parsed shapes before use.
- **`request`/`computed` for data fetching combinators** where the config is declarative.

---

## 6. Performance & Scaling

- **Granular stores = granular subscriptions** — a single mega-store re-renders everything on any change.
- **Derived values via `computed`, not per-render computation.**
- **Hundreds of small stores are fine; deep fragmentation of one concept is not.** Name stores by domain noun (`cartItems`, `sessionUser`), not scaffolding.

---

## 7. Testing

- **Pure model tests:**
