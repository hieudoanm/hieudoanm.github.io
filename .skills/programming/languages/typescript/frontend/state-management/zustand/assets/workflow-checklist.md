# Zustand Best Practices: Workflow Checklist

A practical run sheet for applying [Zustand Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Creating a Store: **create<T>()(...) with an explicit state type; actions live in the store:**
- [ ] 1. Creating a Store: **State = data fields; actions = functions that set** — one store per domain concern
- [ ] 2. Selectors & Re-renders: **useStore((s) => s.user) selects exactly the field; avoid whole-store reads:**
- [ ] 2. Selectors & Re-renders: **Selectors must return stable references** — derive with useShallow/custom selectors to avoid re-render on equivalent snapshots:
- [ ] 3. Actions & Async: **Actions as functions — synchronous mutations via set, async via async/await in the action:**
- [ ] 3. Actions & Async: **No rules against cross-store access via get** — but keep it readable; prefer separate stores per domain over one monolithic store
- [ ] 4. Middleware: **persist for storage-backed stores; devtools for Redux-devot checking; immer for deep updates:**
- [ ] 4. Middleware: **Persist keys namespaced; storage read validated** — shapes change across releases
- [ ] 5. Store Composition: **Small stores per domain composed at the UI boundary** — select from multiple stores in the same component:
- [ ] 5. Store Composition: **Avoid a single global mega-store** — thousands of subscriptions on one store kill granular re-renders

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
