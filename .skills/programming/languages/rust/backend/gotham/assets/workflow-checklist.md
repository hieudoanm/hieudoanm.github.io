# Gotham Best Practices: Workflow Checklist

A practical run sheet for applying [Gotham Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Router & Bootstrapping: **gotham::start with a Router built from the builder DSL:**
- [ ] 1. Router & Bootstrapping: **build_simple_router gives a Get/Post/Delete tree; use it or build_tree_router** — the route table is declarative, at one place
- [ ] 2. Handlers & State: **Handlers receive State and return a response — the request contract is typed:**
- [ ] 2. Handlers & State: **extract via state.borrow::<T>()** for the Path/Query/Header extractors Gotham provides; the typed extraction is the boundary:
- [ ] 3. Extractors: **Gotham's extract trait + Path<T>/QueryString<T> on any Deserialize:**
- [ ] 3. Extractors: **Extraction failures are handled by the framework → 400**
- [ ] 4. Error Handling: **Prefer an explicit error type converted at the boundary:**
- [ ] 4. Error Handling: **Handlers return Result<_, AppError>/Gotham-friendly error and the top-level handler maps it** — no panics in signal paths
- [ ] 5. Async & Dependencies: **Handler-defined clients/Db access** — put shared repo/clients into app State once (derive StateData):
- [ ] 5. Async & Dependencies: **Async I/O inside handlers** with the tokio reactor running; spawn_blocking for compute:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
