# Jotai Best Practices: 3. Async Atoms

## Source guidance

This example applies the **3. Async Atoms** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Async atoms `atom(async (get) => ...)` for data outside React — the value resolves, errors surface via `useAtomValue`:**
- **Suspense + async atoms pair; handle loading/error states with the component boundary** (ErrorBoundary/`ErrorBoundary`-ish, `useAtomValue` throws on pending until resolved).
- **Async atoms keep dependencies atomic — trigger refetch by setting a linked atom (query/params).**
- **Cancellation managed by the atom layer (keys/invalidation); never unbounded concurrent fetches in render.**

## Example

```ts
const userAtom = atom<User>(async () => {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("fail");
  return res.json();
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for jotai-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
