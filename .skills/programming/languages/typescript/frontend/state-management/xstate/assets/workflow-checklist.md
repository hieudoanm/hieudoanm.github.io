# XState Best Practices: Workflow Checklist

A practical run sheet for applying [XState Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Defining a Machine: **createMachine with typed context + events; states + transitions:**
- [ ] 1. Defining a Machine: **State names are the domain vocabulary** (idle, loading, ready, error) — not step1/step2
- [ ] 2. Guards: **Guards are named decision boundaries — pure predicates over (context, event, params):**
- [ ] 2. Guards: **No side effects in guards** — they must be deterministic; decision vs action separation is the whole point
- [ ] 3. Actions & Effects: **Actions are pure or actor-mediated side effects — named, testable:**
- [ ] 3. Actions & Effects: **invoke for async workers** — actor spawns; onDone/onError transitions (no raw promise handling in transitions)
- [ ] 4. Actors & Orchestration: **Machines become actors; spawn createActor(machine).start(); subscribe to snapshots:**
- [ ] 4. Actors & Orchestration: **spawn/fromPromise for children** — orchestration through the actor graph, not raw callbacks
- [ ] 5. Persistence & Interop: **State persistence** — serialize machine value + context (restore via createMachine snapshot; inspect()/restore hooks). Schema it; storage is untrusted
- [ ] 5. Persistence & Interop: **UI binding** — @xstate/react useMachine/useActor; actions side effects via assign guards, and the view renders snap.value state-conditioned

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
