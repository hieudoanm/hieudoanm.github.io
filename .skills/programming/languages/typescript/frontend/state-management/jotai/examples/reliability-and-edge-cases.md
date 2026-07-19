# Jotai Best Practices: 5. Selectors & Performance

## Source guidance

This example applies the **5. Selectors & Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Derived atoms ARE the selectors** — one re-render per subscribed atom value change:
- **Keep atoms small and derived-tree shallow** — hundreds of atoms are fine; nested object-blowup-atoms are not.
- **`useAtomValue` granular subscriptions** — don't read a parent atom to get one derived field.

## Example

```ts
const visibleItemsAtom = atom((get) =>
  get(itemsAtom).filter(i => i.visible)
);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for jotai-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
