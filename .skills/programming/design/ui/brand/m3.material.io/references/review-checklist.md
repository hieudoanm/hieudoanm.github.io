# Review checklist

Focused reference for **google-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 8. When to Choose This Branch — and When to Leave

Choose it when the product is operational or enterprise, when accessibility
budget is scarce, when users arrive with habits from other apps, or when speed to
a coherent first release matters more than distinctiveness.

Leave it — deliberately, in writing — when the brand must be recognizable in a
screenshot with no logo, a required interaction has no M3 analogue, or you're
already maintaining two systems and a third is cheaper.

**Declare divergence, don't smuggle it.** A token plus a one-line comment is fine;
scattered arbitrary values are how a system dies.

```tsx
// DIVERGENCE: hardware-scanner keypad needs 64dp targets; M3 min is 48dp.
const KEYPAD_TARGET = 64;
```

---

## General Rules of Thumb

- **Use roles, never color names** — `on-surface`, not `gray-800`.
- **Ship every ground with its ink** — contrast by construction.
- **Prefer surface tokens to shadows** — shadow means "floating".
- **Express interaction as opacity, not new colors** — one token, many states.
- **Bundle type metrics into named roles** — size alone drifts.
- **Check both themes, every time** — they fail independently.
- **Divergence is fine; drift is not** — declare it.

---

## Quick-Start Checklist

- [ ] Inherit-vs-derive decision recorded with reasons
- [ ] Role palette defined per theme, each ground paired with its ink
- [ ] Contrast verified ≥ 4.5:1 body, ≥ 3:1 large/non-text, per theme
- [ ] Type scale defined as named roles with line-height and tracking
- [ ] Radius and elevation scales set; shadow reserved for floating surfaces
- [ ] Interaction states expressed as opacity layers on existing tokens
- [ ] Touch targets ≥ 48×48dp; focus ring visible on every interactive element
- [ ] Motion tokenized, transform/opacity only, reduced-motion honored
- [ ] Token values live in one theme file; no raw colors or magic numbers in components
- [ ] Every out-of-spec decision carries a `DIVERGENCE` comment
