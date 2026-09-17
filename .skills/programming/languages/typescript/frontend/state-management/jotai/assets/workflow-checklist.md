# Jotai Best Practices: Workflow Checklist

A practical run sheet for applying [Jotai Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Atoms & Basic Usage: **Atoms are defined outside components; read/write via hooks:**
- [ ] 1. Atoms & Basic Usage: **useAtomValue for reads, useSetAtom for writes, useAtom for both** — reading an atom subscribes; writes notify exactly the subscribers
- [ ] 2. Derived Atoms: **Derived atoms compute state with no manual syncing — the source of truth is atomic:**
- [ ] 2. Derived Atoms: **Read-derived atoms are pure functions of their inputs** — no side effects in the getter
- [ ] 3. Async Atoms: **Async atoms atom(async (get) => ...) for data outside React — the value resolves, errors surface via useAtomValue:**
- [ ] 3. Async Atoms: **Suspense + async atoms pair; handle loading/error states with the component boundary** (ErrorBoundary/ErrorBoundary-ish, useAtomValue throws on pending until resolved)
- [ ] 4. Persistence: **Persist via atomWithStorage/JSON storage adapters:**
- [ ] 4. Persistence: **Storage keys stable + namespaced (app:theme) — a persisted atom is a schema; version it.**
- [ ] 5. Selectors & Performance: **Derived atoms ARE the selectors** — one re-render per subscribed atom value change:
- [ ] 5. Selectors & Performance: **Keep atoms small and derived-tree shallow** — hundreds of atoms are fine; nested object-blowup-atoms are not

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
