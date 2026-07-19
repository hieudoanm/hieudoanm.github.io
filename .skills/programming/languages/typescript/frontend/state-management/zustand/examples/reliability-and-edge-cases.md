# Zustand Best Practices: 3. Actions & Async

## Source guidance

This example applies the **3. Actions & Async** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Actions as functions — synchronous mutations via `set`, async via `async/await` in the action:**
- **No rules against cross-store access via `get`** — but keep it readable; prefer separate stores per domain over one monolithic store.
- **`get()` for reads inside actions when needed** — the escape hatch is named, not hidden.

## Example

```ts
export const useUser = create<UserState>()((set) => ({
  user: null, status: "idle",
  load: async (id: string) => {
    set({ status: "loading" });
    try {
      const user = await api.fetch(id);
      set({ user, status: "ready" });
    } catch (err) {
      set({ status: "error", error: err });
    }
  },
}));
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for zustand-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
