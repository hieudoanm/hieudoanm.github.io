# Redux Best Practices: Basic Usage

Best practices for state management with Redux and Redux Toolkit — the predictable-state conventions for React. Use when writing, structuring, or reviewing Redux — covers slices, actions, reducers, selectors, async thunks, middleware, and testing.

## Scenario

Use this example as a starting point when applying **redux-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Slices & Reducers** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
const sessionSlice = createSlice({
  name: "session",
  initialState: { user: null as User | null, status: "idle" },
  reducers: {
    loginStarted(state)   { state.status = "loading"; },
    loginFulfilled(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "idle";
    },
  },
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
