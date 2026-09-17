# React Best Practices: Workflow Checklist

A practical run sheet for applying [React Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: React **18+**
- [ ] 1. Core Stack: TypeScript **strict mode**
- [ ] 2. Component Design: **Functional components** — use functional components with hooks, not class components:
- [ ] 2. Component Design: **Single responsibility** — each component should do one thing well
- [ ] 3. Hooks Best Practices: **Custom hooks for reusable logic** — extract repeated logic into custom hooks:
- [ ] 3. Hooks Best Practices: **Hook rules** — only call hooks at the top level, never inside loops or conditions
- [ ] 4. State Management: **Local state for component-specific data** — use useState for component-local state:
- [ ] 4. State Management: **Context for global state** — use React Context for app-wide state:
- [ ] 5. Performance Optimization: **React.memo for expensive components** — memoize components that re-render unnecessarily:
- [ ] 5. Performance Optimization: **Code splitting** — use React.lazy and Suspense for code splitting:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
