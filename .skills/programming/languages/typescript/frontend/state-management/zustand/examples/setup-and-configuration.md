# Zustand Best Practices: 2. Selectors & Re-renders

## Source guidance

This example applies the **2. Selectors & Re-renders** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`useStore((s) => s.user)` selects exactly the field; avoid whole-store reads:**
- **Selectors must return stable references** — derive with `useShallow`/custom selectors to avoid re-render on equivalent snapshots:
- **Inline selectors in `useStore` are fine; module-level named selectors for reused shapes.**

## Example

```tsx
function Greeting() {
  const user = useSession((s) => s.user);
  return <div>{user?.name}</div>;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for zustand-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
