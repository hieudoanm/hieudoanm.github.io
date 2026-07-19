# Nano Stores Best Practices: Workflow Checklist

A practical run sheet for applying [Nano Stores Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Stores: atom, map, and signals: **One store per domain concept; atom for scalar, map for structured:**
- [ ] 1. Stores: atom, map, and signals: **map supports dot-paths (user.setKey("name", "ada")) — targeted updates keep subscribers precise.**
- [ ] 2. Reading & Reactivity: **Subscribe via store.subscribe(listener); components use the binding (useStore):**
- [ ] 2. Reading & Reactivity: **store.listen for passive listeners; subscribe fires immediately with current value — know which you need.**
- [ ] 3. Derived & Computed Stores: **computed maps sources to derived values — memoized, dependency-tracked:**
- [ ] 3. Derived & Computed Stores: **No manual sync** — computed stores derive purely from their sources
- [ ] 4. Actions & Mutations: **action(store, name, fn) wraps mutations — validation + intended writes in one place:**
- [ ] 4. Actions & Mutations: **Mutations go through actions** — readable event-shaped updates; validation at the store boundary
- [ ] 5. Persistence & Integration: **persist from @nanostores/persistent or a small adapter** — namespaced keys, validated reads:
- [ ] 5. Persistence & Integration: **Storage is untrusted** — validate parsed shapes before use

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
