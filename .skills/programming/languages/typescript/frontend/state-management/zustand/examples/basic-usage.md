# Zustand Best Practices: Basic Usage

Best practices for state management with Zustand — the minimal hook-store conventions for React. Use when writing, structuring, or reviewing Zustand — covers stores, selectors, actions, middleware (persist/devtools/immer), and testing.

## Scenario

Use this example as a starting point when applying **zustand-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Creating a Store** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { create } from "zustand";

interface SessionState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useSession = create<SessionState>()((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
