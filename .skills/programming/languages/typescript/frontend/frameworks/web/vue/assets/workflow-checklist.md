# Vue.js Best Practices: Workflow Checklist

A practical run sheet for applying [Vue.js Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: Vue **3.x** (Composition API preferred)
- [ ] 1. Core Stack: TypeScript **strict mode**
- [ ] 2. Component Structure: **Single File Components (SFC)** — use .vue files with <script setup>:
- [ ] 2. Component Structure: **Composition API** — prefer Composition API over Options API
- [ ] 3. Reactivity System: **ref for primitives** — use ref for primitive values:
- [ ] 3. Reactivity System: **reactive for objects** — use reactive for objects:
- [ ] 4. Component Design: **Props with TypeScript** — define props with TypeScript:
- [ ] 4. Component Design: **Emits with TypeScript** — define emits with TypeScript:
- [ ] 5. State Management: **Pinia for global state** — use Pinia for app-wide state:
- [ ] 5. State Management: **Local state for component-specific data** — use ref/reactive for component-local state

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
