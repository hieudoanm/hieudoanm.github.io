# Axios Best Practices: Workflow Checklist

A practical run sheet for applying [Axios Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Instances: **One configured instance per backend/API contract:**
- [ ] 1. Instances: **baseURL, timeout, credentials deliberate; never hardcode URLs in calls.**
- [ ] 2. Interceptors: **Request interceptor: attach auth from a store/session; response: normalize errors:**
- [ ] 2. Interceptors: **Interceptors for cross-cutting only — no logic that belongs in handlers.**
- [ ] 3. Requests & Typing: **Typed generics per call; validate the shape you trust:**
- [ ] 3. Requests & Typing: **{ data } destructuring standard; params/data/method explicit.**
- [ ] 4. Error Handling: **Catch and translate at the boundary — typed failures for callers:**
- [ ] 4. Error Handling: **axios.isAxiosError narrows; distinguish network vs HTTP errors (err.code/err.request/err.response).**
- [ ] 5. Abort & Cancellation: **AbortController signal for requests tied to component lifecycles (no setState-after-unmount):**
- [ ] 5. Abort & Cancellation: **The signal passed in request; on unmount abort.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
