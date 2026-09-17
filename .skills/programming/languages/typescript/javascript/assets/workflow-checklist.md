# JavaScript Best Practices: Workflow Checklist

A practical run sheet for applying [JavaScript Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Modules & Strictness: **ESM over CJS/globals; strict mode implicitly for modules:**
- [ ] 1. Modules & Strictness: **One export name per module (default for the main API); named for the rest.**
- [ ] 2. Types & Data (without TS): **JSDoc for the public contract; default parameters + nullish coalescing over truthy traps:**
- [ ] 2. Types & Data (without TS): **??/?. for null-ish; avoid !x swallowing 0/""/false semantics.**
- [ ] 3. Async: **async/await with try/finally, typed-ish promises; avoid unhandled rejections:**
- [ ] 3. Async: **Promise.all for parallel independent work; finally for cleanup (release handles, close sockets).**
- [ ] 4. Errors: **Throw descriptive Errors; subclass for domain errors (class RateLimitError extends Error).**
- [ ] 4. Errors: **Catch and rethrow with context (cause chains) — don't swallow types.**
- [ ] 5. DOM & Browser JS: **Query once, use listeners; never append inline handlers:**
- [ ] 5. DOM & Browser JS: **event.preventDefault() intentionally; extend APIs with export, not globals.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
