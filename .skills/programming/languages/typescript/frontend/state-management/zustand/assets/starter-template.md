# Zustand Best Practices: Starter Template

A reusable starting point derived from the **3. Actions & Async** section of [Zustand Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
