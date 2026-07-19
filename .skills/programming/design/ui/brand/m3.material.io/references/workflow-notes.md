# Workflow notes

Focused reference for **google-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Wire Roles Into Tokens

Define once as CSS variables; Tailwind v4 `@theme` promotes them to utilities.
Themes swap variables, never classes.

```css
@theme {
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
}

[data-theme='exibit-light'] {
  --surface: oklch(99% 0.004 264);
  --on-surface: oklch(21% 0.012 264);
  --surface-variant: oklch(95% 0.006 264);
  --on-surface-variant: oklch(45% 0.014 264);
  --primary: oklch(48% 0.15 264);
  --on-primary: oklch(99% 0.004 264);
  --outline: oklch(72% 0.01 264);
  --error: oklch(52% 0.19 27);
}

/* dark: same role names, different values */
[data-theme='exibit-dark'] {
  --surface: oklch(21% 0.012 264);
  --on-surface: oklch(95% 0.006 264);
  --surface-variant: oklch(28% 0.014 264);
  --on-surface-variant: oklch(74% 0.012 264);
  --primary: oklch(80% 0.11 264);
  --on-primary: oklch(24% 0.06 264);
  --outline: oklch(48% 0.01 264);
  --error: oklch(70% 0.16 27);
}
```

```tsx
export function ReceiptTotal({ total }: { total: Money }) {
  return (
    <p className="bg-surface text-on-surface font-title tabular-nums">
      {total.format()}
    </p>
  );
}
```

- **`oklch`, not hex** — perceptual lightness makes tonal ramps and contrast
  checks meaningful; hex lightness does not.
- **Never redefine a role per component.** If a screen needs a look the roles
  can't express, that's a missing role — add it to the theme, don't patch the
  component.
- **DaisyUI 5 is M3-shaped** (`--color-primary`, `--radius-box`, `--size-field`),
  so map roles onto DaisyUI variables instead of fighting its defaults.
- Set `data-theme` on `<html>` and persist it; never branch on
  `prefers-color-scheme` in component code.

---

## 4. Type Is Roles With Bundled Metrics

Ship a _named_ scale — each role fixes size, line-height, weight, and tracking
together, so line breaks stay stable across components. Roles run
`display-*`, `headline-*`, `title-*`, `body-*`, `label-*`, each at
`small|medium|large`.

```css
@theme {
  --text-body-medium: 0.875rem;
  --text-body-medium--line-height: 1.45;
  --text-title-medium: 1rem;
  --text-title-medium--line-height: 1.4;
  --text-headline-medium: 1.5rem;
  --text-headline-medium--line-height: 1.3;
}
```

- **Use `body-medium` for product chrome**, not `body-large` — dense operational
  UIs lose information density at `body-large`.
- **Monospace only for aligned numeric data** — prices, quantities, timestamps —
  and opt-in per instance, never a font-family default.

---
