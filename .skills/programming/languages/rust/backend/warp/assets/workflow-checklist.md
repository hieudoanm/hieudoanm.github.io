# Warp Best Practices: Workflow Checklist

A practical run sheet for applying [Warp Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Filter Composition: **Filters are the unit; combine with and (tuple) / or (alternative) / map (transform) / and_then (async):**
- [ ] 1. Filter Composition: **path::param<T>/warp::query::<T>()/warp::body::json::<T>() are extractors — the and chain is the request contract.**
- [ ] 2. Routes & Handlers: **Small named handlers per route family; declarative path trees:**
- [ ] 2. Routes & Handlers: **impl Reply returns — warp::reply::json, warp::reply::html, reply::with_status.**
- [ ] 3. State & Dependencies: **warp::any().map(|| app_state.clone()) passes state into filters:**
- [ ] 3. State & Dependencies: **State is Clone + Arc-shared; one warp::any().map per dependency group — keep the filter readable.**
- [ ] 4. Errors & Rejections: **Rejection is the error channel; custom errors via warp::reject::custom**, then recover maps to responses:
- [ ] 4. Errors & Rejections: **reject::not_found() / custom rejections built at the service layer, converted once in recover.**
- [ ] 5. Middleware & Logging: **warp::log::custom/warp::Header filters attach request logging; wrap the whole routes with .with(warp::log("api")):**
- [ ] 5. Middleware & Logging: **CORS via warp::cors();** compression via a wrap — keep the pipeline explicit

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
